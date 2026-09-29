import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { generateManifest } from '../scripts/build.mjs';
test('nested folders, Unicode, only Markdown, additions and removals',async()=>{
  const temp=await mkdtemp(path.join(os.tmpdir(),'butterfly-test-'));
  try {
    await mkdir(path.join(temp,'C++','Zażółć #1'),{recursive:true});
    await writeFile(path.join(temp,'C++','Zażółć #1','01 pamięć.MD'),'# Pamięć\n\nTreść do wyszukiwania.');
    await writeFile(path.join(temp,'ignore.txt'),'Not a note');
    await writeFile(path.join(temp,'02.md'),'```md\n# False heading\n```\n\n# True heading');
    let result=await generateManifest(temp);
    assert.equal(result.notes.length,2);
    assert.equal(result.notes.find(n=>n.path==='02.md').title,'True heading');
    assert.equal(result.notes.find(n=>n.title==='Pamięć').path,'C++/Zażółć #1/01 pamięć.MD');
    assert.ok(result.notes.find(n=>n.title==='Pamięć').text.includes('wyszukiwania'));
    await rm(path.join(temp,'02.md'));await writeFile(path.join(temp,'new.md'),'No heading');
    result=await generateManifest(temp);
    assert.equal(result.notes.length,2);assert.ok(!result.notes.some(n=>n.path==='02.md'));assert.ok(result.notes.some(n=>n.path==='new.md'));
    assert.deepEqual(await generateManifest(temp),result);
  }finally{await rm(temp,{recursive:true,force:true});}
});
test('missing notes folder produces an empty library',async()=>{
  const temp=await mkdtemp(path.join(os.tmpdir(),'butterfly-empty-'));
  try{assert.deepEqual((await generateManifest(path.join(temp,'missing'))).notes,[]);}finally{await rm(temp,{recursive:true,force:true});}
});
