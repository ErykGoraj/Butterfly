import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, writeFile, rm } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { generateCourses } from '../scripts/courses.mjs';
test('course order, missing lessons, empty courses and optional configuration', async () => {
  const temp = await mkdtemp(path.join(os.tmpdir(), 'butterfly-course-'));
  try {
    const file = path.join(temp,'courses.json');
    assert.deepEqual(await generateCourses(file,[]),[]);
    const config = {courses:[{id:'example',title:'Example',description:'Description',modules:[{title:'First',lessons:['b.md','a.md','removed.md']},{title:'Empty',lessons:['gone.md']}]},{id:'empty',title:'Empty',description:'Description',modules:[]}]};
    await writeFile(file,JSON.stringify(config));const warnings=[];
    const result=await generateCourses(file,[{path:'a.md'},{path:'b.md'}],message=>warnings.push(message));
    assert.equal(result.length,1);assert.equal(result[0].modules.length,1);
    assert.deepEqual(result[0].modules[0].lessons,['b.md','a.md']);assert.equal(warnings.length,2);
    config.courses[0].modules[0].lessons.push('a.md');await writeFile(file,JSON.stringify(config));
    await assert.rejects(generateCourses(file,[{path:'a.md'},{path:'b.md'}],()=>{}),/powtórzona/);
    config.courses[0].modules=[];config.courses[1].id='example';await writeFile(file,JSON.stringify(config));
    await assert.rejects(generateCourses(file,[]),/unikalne/);
    await writeFile(file,'broken json');await assert.rejects(generateCourses(file,[]),/courses.json/);
  } finally { await rm(temp,{recursive:true,force:true}); }
});
