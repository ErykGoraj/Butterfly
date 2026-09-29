import { readdir, readFile, mkdir, writeFile, rm, cp, lstat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from '../vendor/marked.esm.js';
import { generateCourses } from './courses.mjs';

export const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const plain = text => text.replace(/<[^>]*>/g,' ').replace(/!?\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[`*_~>#|]/g,'').replace(/\s+/g,' ').trim();
export async function generateManifest(directory) {
  const notes=[];
  async function walk(dir, segments=[]) {
    let entries;try{entries=await readdir(dir,{withFileTypes:true});}catch(error){if(error.code==='ENOENT' && !segments.length)return;throw error;}
    entries.sort((a,b)=>a.name.localeCompare(b.name,'pl',{numeric:true}) || (a.name<b.name?-1:1));
    for(const entry of entries) {
      // Symlinks are intentionally excluded: they could expose files outside /notes.
      const parts=[...segments,entry.name], absolute=path.join(dir,entry.name);
      if(entry.isDirectory())await walk(absolute,parts);
      else if(entry.isFile() && /\.md$/i.test(entry.name)) {
        const markdown=(await readFile(absolute,'utf8')).replace(/^\uFEFF/,'');
        const tokens=marked.lexer(markdown), heading=tokens.find(t=>t.type==='heading' && t.depth===1);
        const title=plain(heading?.text || entry.name.replace(/\.md$/i,'').replace(/[-_]/g,' ')) || entry.name;
        const text=plain(markdown),paragraph=tokens.find(t=>t.type==='paragraph');
        const summary=plain(paragraph?.text || text);
        notes.push({path:parts.join('/'),title,excerpt:summary.length>155?summary.slice(0,152)+'…':summary,text,minutes:Math.max(1,Math.ceil(text.split(/\s+/).filter(Boolean).length/200)),markdown});
      }
    }
  }
  await walk(directory);
  return {version:1,notes};
}
export async function build(projectRoot=root) {
  const manifest=await generateManifest(path.join(projectRoot,'notes'));
  manifest.courses=await generateCourses(path.join(projectRoot,'courses.json'),manifest.notes);
  await writeFile(path.join(projectRoot,'notes-manifest.json'),JSON.stringify(manifest,null,2)+'\n');
  const out=path.join(projectRoot,'dist');
  // Fixed output directory under the explicitly supplied project root.
  await rm(out,{recursive:true,force:true});await mkdir(out,{recursive:true});
  for(const name of ['index.html','styles.css','script.js','theme.js','courses.js','quiz.js','learning.js','vendor','notes-manifest.json'])await cp(path.join(projectRoot,name),path.join(out,name),{recursive:true});
  try{await cp(path.join(projectRoot,'notes'),path.join(out,'notes'),{recursive:true,filter:async src=>!(await lstat(src)).isSymbolicLink()});}catch(error){if(error.code!=='ENOENT')throw error;}
  await writeFile(path.join(out,'.nojekyll'),'');
  console.log(`Gotowe: ${manifest.notes.length} notatek → dist/`);
  return manifest;
}
if(process.argv[1] && path.resolve(process.argv[1])===fileURLToPath(import.meta.url))await build();
