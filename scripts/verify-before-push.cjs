const {spawnSync}=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
if(process.argv.includes('--help')) { console.log('Uso: node scripts/verify-before-push.cjs\nPare a API antes de executar. Valida Prisma, testa backend e executa lint/build do frontend.');process.exit(0); }
if(process.env.RUN_DATABASE_TESTS) {console.error('Remova RUN_DATABASE_TESTS desta rotina local. Testes de banco são executados na CI isolada.');process.exit(1);}
const stages=[['server','prisma:validate'],['server','test'],['client-mantine','lint'],['client-mantine','build']];
for(const [directory,script] of stages){
 console.log('\nVerificando '+directory+': npm run '+script);
 const win=process.platform==='win32';
 const result=spawnSync(win?'npm.cmd':'npm',['run',script],{cwd:path.join(root,directory),stdio:'inherit',shell:win,env:process.env});
 if(result.error||result.status!==0){console.error('Verificação interrompida em '+directory+'/'+script+'. Corrija antes do push. No Windows, pare a API se houver bloqueio da DLL Prisma.');process.exit(1);}
}
console.log('\nTodas as verificações locais passaram.');
