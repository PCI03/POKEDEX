import {test} from 'node:test';
import assert from 'node:assert/strict';
import {matchNames,validateSave} from './match';
import species from './species.json';
test('catálogo nacional completo y sin duplicados',()=>{assert.equal(species.length,1025);assert.deepEqual(species.map(p=>p.id),Array.from({length:1025},(_,i)=>i+1));});
test('no confunde Mew con Mewtwo ni nombres parciales',()=>{assert.deepEqual(matchNames('Mewtwo ex HP 230').map(p=>p.id),[150]);assert.equal(matchNames('Pikachux').length,0);});
test('acepta variantes tipográficas',()=>assert.equal(matchNames('Mr. Mime')[0].id,122));
test('valida importaciones',()=>{assert.deepEqual(validateSave({ids:[1,1,1025]}),[1,1025]);for(const ids of [[0],[1026],['25'],[1.5]])assert.throws(()=>validateSave({ids}));});
