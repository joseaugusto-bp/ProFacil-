import { Prisma } from '../../generated/prisma';
import { ApiError } from '../lib/errors';
type Avaliacao = { nota: number | null; peso: number };
export function mediaAluno(avaliacoes: Avaliacao[]): number | null {
  let total = new Prisma.Decimal(0), pesos = new Prisma.Decimal(0);
  for (const item of avaliacoes) {
    if (!Number.isFinite(item.peso) || item.peso <= 0) throw new ApiError(400, 'PESO_INVALIDO', 'Peso deve ser positivo.');
    if (item.nota === null) continue;
    if (!Number.isFinite(item.nota) || item.nota < 0 || item.nota > 10) throw new ApiError(400, 'NOTA_INVALIDA', 'Nota deve estar entre 0 e 10.');
    total = total.add(new Prisma.Decimal(item.nota).mul(item.peso)); pesos = pesos.add(item.peso);
  }
  return pesos.isZero() ? null : total.div(pesos).toNumber();
}
export function mediaTurma(medias: (number | null)[]) {
  const validas = medias.filter((n): n is number => n !== null);
  const media = mediaAluno(validas.map(nota => ({ nota, peso: 1 })));
  return { media, considerados: validas.length, elegiveis: medias.length };
}
export function frequencia(aulas: { cargaMinutos: number; presente: boolean; cancelada?: boolean }[]): number | null {
  let total = 0, presente = 0;
  for (const aula of aulas) {
    if (!Number.isInteger(aula.cargaMinutos) || aula.cargaMinutos <= 0) throw new ApiError(400, 'CARGA_INVALIDA', 'Carga horária inválida.');
    if (aula.cancelada) continue;
    total += aula.cargaMinutos; if (aula.presente) presente += aula.cargaMinutos;
  }
  return total === 0 ? null : 100 * presente / total;
}
export function risco(media: number | null, presenca: number | null) {
  if (media !== null && (!Number.isFinite(media) || media < 0 || media > 10)) throw new ApiError(400, 'MEDIA_INVALIDA', 'Média inválida.');
  if (presenca !== null && (!Number.isFinite(presenca) || presenca < 0 || presenca > 100)) throw new ApiError(400, 'FREQUENCIA_INVALIDA', 'Frequência inválida.');
  const motivos = [];
  if (media !== null && media < 6) motivos.push('NOTAS');
  if (presenca !== null && presenca < 75) motivos.push('FREQUENCIA');
  return { status: motivos.length ? 'EM_RISCO' : media === null || presenca === null ? 'DADOS_INSUFICIENTES' : 'REGULAR', motivos, dadosIncompletos: media === null || presenca === null };
}
export function validarPrazo(agora: Date, prazo: Date | null) {
  if (!prazo || !Number.isFinite(agora.getTime()) || !Number.isFinite(prazo.getTime()) || agora > prazo) throw new ApiError(409, 'ENTREGA_INDISPONIVEL', 'Entrega fora do prazo ou não habilitada.');
}
