import species from './species.json';
export const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/♀/g,' female ').replace(/♂/g,' male ').replace(/[^a-z0-9]+/g,' ').trim();
const aliases:Record<string,string[]>={'nidoran-f':['nidoran female'],'nidoran-m':['nidoran male'],'mr-mime':['mr mime'],'mime-jr':['mime jr'],'farfetchd':["farfetch'd"],'sirfetchd':["sirfetch'd"],'type-null':['type null']};
export function matchNames(text:string){
 const t=' '+normalize(text)+' ';
 return species.filter(p=>[p.name,...aliases[p.name]||[]].some(n=>t.includes(' '+normalize(n)+' '))).sort((a,b)=>b.name.length-a.name.length);
}
export function validateSave(input:unknown):number[]{
 if(!input||typeof input!=='object'||!('ids' in input)||!Array.isArray(input.ids)||input.ids.some((i:unknown)=>typeof i!=='number'||!Number.isInteger(i)||i<1||i>1025)) throw Error('Copia no válida. Selecciona un archivo exportado por esta Pokédex.');
 return [...new Set(input.ids as number[])];
}
