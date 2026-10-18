import { useEffect, useState, type FormEvent } from 'react';
import { Alert, Avatar, Badge, Button, Group, Loader, Modal, Pagination, Paper, PasswordInput, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { IconCheck, IconPlus, IconRefresh, IconUsers } from '@tabler/icons-react';
import { criarAluno, listarAlunos, type ListaAlunos } from '../../../services/alunos';
import { ApiError } from '../../../services/api';

export function AlunosCoordenador() {
 const [pagina, setPagina] = useState(1), [revisao, setRevisao] = useState(0);
 const [agora, setAgora] = useState(() => Date.now());
 const [lista, setLista] = useState<ListaAlunos | null>(null);
 const [carregando, setCarregando] = useState(true), [erro, setErro] = useState<string | null>(null);
 const [modal, setModal] = useState(false), [salvando, setSalvando] = useState(false);
 const [nome, setNome] = useState(''), [email, setEmail] = useState(''), [senha, setSenha] = useState('');
 const [erroCadastro, setErroCadastro] = useState<string | null>(null), [sucesso, setSucesso] = useState<string | null>(null);
 const [validacao, setValidacao] = useState<{ nome?: string; senha?: string }>({});

 useEffect(() => {
  const controller = new AbortController();
  // oxlint-disable-next-line react/set-state-in-effect -- Sincronização de consulta paginada com API.
  setCarregando(true);
  setErro(null);
  listarAlunos(pagina, controller.signal).then(result => {
   if (!controller.signal.aborted) {
    const ultima = Math.max(1, Math.ceil(result.paginacao.total / result.paginacao.limite));
    if (pagina > ultima) { setPagina(ultima); return; }
    setAgora(Date.now()); setLista(result);
   }
  }).catch(error => {
   if (!controller.signal.aborted) setErro(error instanceof ApiError ? error.message : 'Não foi possível carregar os alunos. Verifique a conexão e tente novamente.');
  }).finally(() => { if (!controller.signal.aborted) setCarregando(false); });
  return () => controller.abort();
 }, [pagina, revisao]);

 const fechar = () => { if (!salvando) { setModal(false); setSenha(''); setErroCadastro(null); setValidacao({}); } };
 const abrir = () => { setNome(''); setEmail(''); setSenha(''); setErroCadastro(null); setValidacao({}); setModal(true); };
 const cadastrar = async (event: FormEvent) => {
  event.preventDefault();
  if (salvando) return;
  const erros: {nome?: string; senha?: string} = {};
  if (nome.trim().length < 2 || nome.trim().length > 120) erros.nome = 'Informe um nome entre 2 e 120 caracteres.';
  if (senha.length < 12 || new TextEncoder().encode(senha).length > 72) erros.senha = 'Use pelo menos 12 caracteres e no máximo 72 bytes.';
  setValidacao(erros); if (Object.keys(erros).length) return;
  setSalvando(true); setErroCadastro(null);
  try {
   const result = await criarAluno({ nome: nome.trim(), email: email.trim().toLowerCase(), senha });
   setSenha(''); setModal(false);
   setSucesso(result.dados.usuario.nome + ' cadastrado(a) com sucesso. O aluno já pode entrar com o e-mail informado. O vínculo com uma turma será feito em uma próxima etapa.');
   setPagina(1); setRevisao(value => value + 1);
  } catch (error) {
   setErroCadastro(error instanceof ApiError ? error.message : 'Não foi possível confirmar o cadastro. Atualize a lista antes de tentar novamente.');
  } finally { setSalvando(false); }
 };

 return <div>
  <Group justify="space-between" align="flex-start" mb={26}><div><Text className="portal-eyebrow" mb={8}>GESTÃO ESCOLAR</Text><Title className="portal-title" order={1}>Alunos</Title><Text c="dimmed" size="sm" mt={8}>Cadastros reais da base de desenvolvimento compartilhada.</Text></div><Button leftSection={<IconPlus size={18} />} onClick={abrir}>Cadastrar aluno</Button></Group>
  {sucesso && <Alert color="teal" icon={<IconCheck size={18} />} mb="lg" role="status" withCloseButton onClose={()=>setSucesso(null)}>{sucesso}</Alert>}
  <Paper className="portal-card" withBorder p="lg" radius="lg" aria-busy={carregando}>
   <Group justify="space-between" mb="lg"><Group gap="sm"><IconUsers size={20} /><Title order={2} size="h4">Alunos cadastrados</Title>{lista && !carregando && !erro && <Badge variant="light">{lista.paginacao.total} no total</Badge>}</Group><Button variant="subtle" size="xs" leftSection={<IconRefresh size={15} />} disabled={carregando} onClick={()=>setRevisao(value=>value+1)}>Atualizar</Button></Group>
   {carregando ? <Stack align="center" py={50} role="status"><Loader size="sm" /><Text size="sm" c="dimmed">Carregando alunos…</Text></Stack>
    : erro ? <Alert color="red" role="alert" title="Não foi possível atualizar a lista">{erro}<Button display="block" mt="sm" size="xs" variant="light" color="red" onClick={()=>setRevisao(value=>value+1)}>Tentar novamente</Button></Alert>
    : lista?.dados.length ? <>
     <Table.ScrollContainer minWidth={650}><Table verticalSpacing="md" horizontalSpacing="sm" highlightOnHover><Table.Thead><Table.Tr><Table.Th>Aluno</Table.Th><Table.Th>E-mail</Table.Th><Table.Th>Turmas vigentes</Table.Th><Table.Th>Status</Table.Th></Table.Tr></Table.Thead><Table.Tbody>
      {lista.dados.map(aluno=>{

       const turmas=aluno.matriculas.filter(m=>new Date(m.inicio).getTime()<=agora&&(!m.fim||new Date(m.fim).getTime()>agora));
       return <Table.Tr key={aluno.id}><Table.Td><Group gap={10} wrap="nowrap"><Avatar color="blue" size={34} radius="xl">{aluno.usuario.nome.split(' ').slice(0,2).map(n=>n[0]).join('')}</Avatar><Text size="sm" fw={500}>{aluno.usuario.nome}</Text></Group></Table.Td><Table.Td><Text size="sm">{aluno.usuario.email}</Text></Table.Td><Table.Td><Text size="xs" c="dimmed">{turmas.length?turmas.map(m=>m.turma.nome+' · '+m.turma.anoLetivo).join(', '):'Sem vínculo'}</Text></Table.Td><Table.Td><Badge color={aluno.usuario.ativo?'teal':'gray'} variant="light">{aluno.usuario.ativo?'Ativo':'Inativo'}</Badge></Table.Td></Table.Tr>;
      })}
     </Table.Tbody></Table></Table.ScrollContainer>
     <Group justify="space-between" mt="lg"><Text size="xs" c="dimmed">Página {pagina} de {Math.max(1,Math.ceil(lista.paginacao.total/20))} · até 20 alunos por página</Text><Pagination total={Math.max(1,Math.ceil(lista.paginacao.total/20))} value={pagina} onChange={setPagina} size="sm" aria-label="Paginação de alunos" /></Group>
    </> : <Stack align="center" py={45}><IconUsers size={34} /><Text fw={600}>Nenhum aluno cadastrado</Text><Text size="sm" c="dimmed" ta="center">Cadastre o primeiro aluno para começar.</Text><Button variant="light" onClick={abrir}>Cadastrar aluno</Button></Stack>}
  </Paper>
  <Text size="xs" c="dimmed" mt="lg">Use apenas dados fictícios neste ambiente. O dashboard de indicadores continua demonstrativo.</Text>
  <Modal opened={modal} onClose={fechar} title="Cadastrar aluno" centered closeOnClickOutside={!salvando} closeOnEscape={!salvando} withCloseButton={!salvando}>
   <form onSubmit={cadastrar}><Stack>
    <Text size="sm" c="dimmed">Crie o acesso do aluno. Cadastro de turma, matrícula e vínculo com responsáveis serão tratados separadamente.</Text>
    {erroCadastro && <Alert color="red" role="alert">{erroCadastro}</Alert>}
    <TextInput label="Nome completo" required minLength={2} maxLength={120} autoComplete="name" value={nome} error={validacao.nome} disabled={salvando} onChange={e=>setNome(e.currentTarget.value)} data-autofocus />
    <TextInput label="E-mail de acesso" required type="email" maxLength={254} autoComplete="off" value={email} disabled={salvando} onChange={e=>setEmail(e.currentTarget.value)} />
    <PasswordInput label="Senha inicial" description="Pelo menos 12 caracteres; no máximo 72 bytes." required minLength={12} autoComplete="new-password" value={senha} error={validacao.senha} disabled={salvando} onChange={e=>setSenha(e.currentTarget.value)} visibilityToggleButtonProps={{'aria-label':'Mostrar ou ocultar senha'}} />
    <Text size="xs" c="dimmed">Compartilhe a senha diretamente com o aluno por um canal privado. Ela não será exibida novamente.</Text>
    <Group justify="flex-end"><Button variant="default" disabled={salvando} onClick={fechar}>Cancelar</Button><Button type="submit" loading={salvando}>Cadastrar aluno</Button></Group>
   </Stack></form>
  </Modal>
 </div>;
}
