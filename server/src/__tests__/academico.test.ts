import { test } from 'node:test';
import assert from 'node:assert/strict';
import { frequencia, mediaAluno, mediaTurma, risco, validarPrazo } from '../domain/academico';
test('média da turma não soma avaliações como se fossem alunos', () => {
 const m = mediaAluno([{ nota: 8, peso: 1 }, { nota: 8, peso: 1 }]);
 assert.deepEqual(mediaTurma([m, m]), { media: 8, considerados: 2, elegiveis: 2 });
});
test('pesos, nota zero, pendências e cobertura permanecem distintos', () => {
 assert.equal(mediaAluno([{ nota: 0, peso: 1 }, { nota: 10, peso: 3 }, { nota: null, peso: 2 }]), 7.5);
 assert.equal(mediaAluno([{ nota: null, peso: 1 }]), null);
 assert.deepEqual(mediaTurma([8, null]), { media: 8, considerados: 1, elegiveis: 2 });
 assert.throws(() => mediaAluno([{ nota: 11, peso: 1 }]));
 assert.throws(() => mediaAluno([{ nota: 8, peso: 0 }]));
});
test('frequência usa carga de aulas realizadas, não entregas', () => {
 assert.equal(frequencia([{ cargaMinutos: 60, presente: true }, { cargaMinutos: 30, presente: false }, { cargaMinutos: 90, presente: false, cancelada: true }]), 100 * 60 / 90);
 assert.equal(frequencia([]), null);
});
test('risco respeita limites, dados ausentes e sai do risco após correção', () => {
 assert.equal(risco(6, 75).status, 'REGULAR');
 assert.deepEqual(risco(5.9, 74).motivos, ['NOTAS', 'FREQUENCIA']);
 assert.equal(risco(8, 90).status, 'REGULAR');
 assert.equal(risco(null, 90).status, 'DADOS_INSUFICIENTES');
 assert.equal(risco(4, null).status, 'EM_RISCO');
 assert.throws(() => risco(Number.NaN, 90));
});
test('prazo inclui o instante limite e rejeita depois dele', () => {
 const prazo = new Date('2026-10-21T02:59:00Z');
 validarPrazo(prazo, prazo);
 assert.throws(() => validarPrazo(new Date(prazo.getTime() + 1), prazo));
 assert.throws(() => validarPrazo(prazo, null));
});
