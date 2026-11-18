// Somente protótipo: estados explícitos; regras reais pertencem à API.
export const alunosDemo = [
  { id: '1', nome: 'João Pedro Silva', turma: '9º Ano A', media: 4.5, frequencia: 90, status: 'EM_RISCO' },
  { id: '2', nome: 'Ana Beatriz Souza', turma: '1º Ano B', media: 5.2, frequencia: 80, status: 'EM_RISCO' },
  { id: '3', nome: 'Carlos Eduardo', turma: '2º Ano A', media: 3.8, frequencia: 70, status: 'EM_RISCO' },
  { id: '4', nome: 'Mariana Santos', turma: '9º Ano C', media: 5.8, frequencia: 95, status: 'EM_RISCO' },
  { id: '5', nome: 'Sofia Lima', turma: '9º Ano A', media: 8, frequencia: 90, status: 'REGULAR' },
  { id: '6', nome: 'Lucas Santos', turma: '1º Ano B', media: null, frequencia: null, status: 'DADOS_INSUFICIENTES' },
];
function calcularMedia(valores: (number | null)[]) {
  const registros = valores.filter((valor): valor is number => valor !== null);
  if (registros.length === 0) return null;
  return registros.reduce((total, valor) => total + valor, 0) / registros.length;
}

export const resumoDemo = {
  total: alunosDemo.length,
  risco: alunosDemo.filter(a => a.status === 'EM_RISCO').length,
  regulares: alunosDemo.filter(a => a.status === 'REGULAR').length,
  semDados: alunosDemo.filter(a => a.status === 'DADOS_INSUFICIENTES').length,
  media: calcularMedia(alunosDemo.map(aluno => aluno.media)),
  frequencia: calcularMedia(alunosDemo.map(aluno => aluno.frequencia)),
};

export const turmasDemo = [...new Set(alunosDemo.map(aluno => aluno.turma))].map(turma => {
  const alunos = alunosDemo.filter(aluno => aluno.turma === turma);
  return {
    turma,
    media: calcularMedia(alunos.map(aluno => aluno.media)),
    frequencia: calcularMedia(alunos.map(aluno => aluno.frequencia)),
  };
});
