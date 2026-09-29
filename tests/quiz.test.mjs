import {test} from 'node:test';
import assert from 'node:assert/strict';
import {validateQuiz} from '../scripts/courses.mjs';
test('quiz accepts one-based answers and explanations, rejects authoring mistakes',()=>{
  const question={question:'Pytanie?',options:['A','B'],answer:2,explanation:'Dlatego B.'};
  assert.deepEqual(validateQuiz([question],'Test'),[question]);
  assert.deepEqual(validateQuiz(undefined,'Test'),[]);
  for(const invalid of [{answer:0},{answer:3},{answer:1.5},{answer:'2'},{options:['A']},{options:['A','A']},{explanation:''},{question:''}]){
    assert.throws(()=>validateQuiz([{...question,...invalid}],'Test'),/pytanie 1/);
  }
  assert.throws(()=>validateQuiz({},'Test'),/tablicą/);
});
