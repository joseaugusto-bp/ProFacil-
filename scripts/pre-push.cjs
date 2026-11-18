const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
const input=fs.readFileSync(0,'utf8');
const updates=input.trim().split(/\r?\n/).filter(Boolean).map(line=>line.trim().split(/\s+/));
if(updates.some(parts=>parts[2]==='refs/heads/main')){
 console.error('Push direto para main bloqueado neste clone. Envie uma branch de tarefa e abra pull request.');process.exit(1);
}
if(!updates.length)process.exit(0);
const status=spawnSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'});
if(status.status!==0){console.error('Não foi possível conferir o estado do Git.');process.exit(1);}
if(status.stdout.trim()){console.error('Há alterações locais sem commit. Revise, faça commit e repita o push para verificar exatamente o código enviado.');process.exit(1);}
const tracked=spawnSync('git',['ls-files','-z'],{cwd:root,encoding:'utf8'});
if(tracked.status!==0){console.error('Falha ao conferir arquivos versionados.');process.exit(1);}
const sensitive=tracked.stdout.split('\0').filter(name=>/(^|\/)CONTAS_TESTE[^/]*$/i.test(name)||(/(^|\/)\.env($|\.)/.test(name)&&!name.endsWith('.env.example')));
if(sensitive.length){console.error('Arquivo de credenciais versionado; revise antes de publicar.');process.exit(1);}
const result=spawnSync(process.execPath,[path.join(root,'scripts','verify-before-push.cjs')],{cwd:root,stdio:'inherit'});
process.exit(result.status===0?0:1);
