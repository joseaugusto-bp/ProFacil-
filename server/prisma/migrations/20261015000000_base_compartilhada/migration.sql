-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ALUNO', 'PROFESSOR', 'COORDENADOR', 'RESPONSAVEL');

-- CreateTable
CREATE TABLE "Usuario" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessao" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,
    "csrfToken" TEXT NOT NULL,
    "expiraEm" TIMESTAMP(3) NOT NULL,
    "ultimaAtividade" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aluno" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professor" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Professor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Coordenador" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Coordenador_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Responsavel" (
    "id" TEXT NOT NULL,
    "usuarioId" TEXT NOT NULL,

    CONSTRAINT "Responsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlunoResponsavel" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),
    "validadoPorId" TEXT NOT NULL,

    CONSTRAINT "AlunoResponsavel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Turma" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,

    CONSTRAINT "Turma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PeriodoLetivo" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "fechado" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PeriodoLetivo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AlunoTurma" (
    "id" TEXT NOT NULL,
    "alunoId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),

    CONSTRAINT "AlunoTurma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessorTurma" (
    "id" TEXT NOT NULL,
    "professorId" TEXT NOT NULL,
    "turmaId" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "disciplinaId" TEXT NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fim" TIMESTAMP(3),

    CONSTRAINT "ProfessorTurma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Atividade" (
    "id" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT,
    "dataAvaliacao" TIMESTAMP(3) NOT NULL,
    "dataLimite" TIMESTAMP(3),
    "peso" DECIMAL(6,2) NOT NULL DEFAULT 1,
    "vinculoDocenteId" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "periodoId" TEXT NOT NULL,

    CONSTRAINT "Atividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EntregaAtividade" (
    "id" TEXT NOT NULL,
    "dataEnvio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resposta" TEXT,
    "anexoChave" TEXT,
    "requisicaoId" TEXT NOT NULL,
    "atividadeId" TEXT NOT NULL,
    "matriculaId" TEXT NOT NULL,

    CONSTRAINT "EntregaAtividade_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" TEXT NOT NULL,
    "valor" DECIMAL(4,2) NOT NULL,
    "versao" INTEGER NOT NULL DEFAULT 1,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "matriculaId" TEXT NOT NULL,
    "atividadeId" TEXT NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Aula" (
    "id" TEXT NOT NULL,
    "data" TIMESTAMP(3) NOT NULL,
    "cargaMinutos" INTEGER NOT NULL,
    "cancelada" BOOLEAN NOT NULL DEFAULT false,
    "vinculoDocenteId" TEXT NOT NULL,
    "anoLetivo" INTEGER NOT NULL,
    "periodoId" TEXT NOT NULL,

    CONSTRAINT "Aula_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Presenca" (
    "id" TEXT NOT NULL,
    "aulaId" TEXT NOT NULL,
    "matriculaId" TEXT NOT NULL,
    "presente" BOOLEAN NOT NULL,

    CONSTRAINT "Presenca_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Auditoria" (
    "id" TEXT NOT NULL,
    "autorId" TEXT NOT NULL,
    "acao" TEXT NOT NULL,
    "recursoId" TEXT NOT NULL,
    "detalhes" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Auditoria_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_email_key" ON "Usuario"("email");

-- CreateIndex
CREATE INDEX "Sessao_usuarioId_idx" ON "Sessao"("usuarioId");

-- CreateIndex
CREATE INDEX "Sessao_expiraEm_idx" ON "Sessao"("expiraEm");

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_usuarioId_key" ON "Aluno"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Professor_usuarioId_key" ON "Professor"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Coordenador_usuarioId_key" ON "Coordenador"("usuarioId");

-- CreateIndex
CREATE UNIQUE INDEX "Responsavel_usuarioId_key" ON "Responsavel"("usuarioId");

-- CreateIndex
CREATE INDEX "AlunoResponsavel_responsavelId_fim_idx" ON "AlunoResponsavel"("responsavelId", "fim");

-- CreateIndex
CREATE INDEX "AlunoResponsavel_alunoId_idx" ON "AlunoResponsavel"("alunoId");

-- CreateIndex
CREATE UNIQUE INDEX "Turma_nome_anoLetivo_key" ON "Turma"("nome", "anoLetivo");

-- CreateIndex
CREATE UNIQUE INDEX "Turma_id_anoLetivo_key" ON "Turma"("id", "anoLetivo");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodoLetivo_nome_anoLetivo_key" ON "PeriodoLetivo"("nome", "anoLetivo");

-- CreateIndex
CREATE UNIQUE INDEX "PeriodoLetivo_id_anoLetivo_key" ON "PeriodoLetivo"("id", "anoLetivo");

-- CreateIndex
CREATE UNIQUE INDEX "Disciplina_nome_key" ON "Disciplina"("nome");

-- CreateIndex
CREATE INDEX "AlunoTurma_alunoId_anoLetivo_idx" ON "AlunoTurma"("alunoId", "anoLetivo");

-- CreateIndex
CREATE INDEX "AlunoTurma_turmaId_idx" ON "AlunoTurma"("turmaId");

-- CreateIndex
CREATE INDEX "ProfessorTurma_turmaId_disciplinaId_idx" ON "ProfessorTurma"("turmaId", "disciplinaId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorTurma_professorId_turmaId_disciplinaId_inicio_key" ON "ProfessorTurma"("professorId", "turmaId", "disciplinaId", "inicio");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessorTurma_id_anoLetivo_key" ON "ProfessorTurma"("id", "anoLetivo");

-- CreateIndex
CREATE INDEX "Atividade_periodoId_idx" ON "Atividade"("periodoId");

-- CreateIndex
CREATE UNIQUE INDEX "EntregaAtividade_requisicaoId_key" ON "EntregaAtividade"("requisicaoId");

-- CreateIndex
CREATE UNIQUE INDEX "EntregaAtividade_atividadeId_matriculaId_key" ON "EntregaAtividade"("atividadeId", "matriculaId");

-- CreateIndex
CREATE UNIQUE INDEX "Nota_matriculaId_atividadeId_key" ON "Nota"("matriculaId", "atividadeId");

-- CreateIndex
CREATE UNIQUE INDEX "Presenca_aulaId_matriculaId_key" ON "Presenca"("aulaId", "matriculaId");

-- CreateIndex
CREATE INDEX "Auditoria_recursoId_createdAt_idx" ON "Auditoria"("recursoId", "createdAt");

-- AddForeignKey
ALTER TABLE "Sessao" ADD CONSTRAINT "Sessao_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aluno" ADD CONSTRAINT "Aluno_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Professor" ADD CONSTRAINT "Professor_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Coordenador" ADD CONSTRAINT "Coordenador_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Responsavel" ADD CONSTRAINT "Responsavel_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoResponsavel" ADD CONSTRAINT "AlunoResponsavel_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoResponsavel" ADD CONSTRAINT "AlunoResponsavel_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Responsavel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoTurma" ADD CONSTRAINT "AlunoTurma_alunoId_fkey" FOREIGN KEY ("alunoId") REFERENCES "Aluno"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AlunoTurma" ADD CONSTRAINT "AlunoTurma_turmaId_anoLetivo_fkey" FOREIGN KEY ("turmaId", "anoLetivo") REFERENCES "Turma"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorTurma" ADD CONSTRAINT "ProfessorTurma_professorId_fkey" FOREIGN KEY ("professorId") REFERENCES "Professor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorTurma" ADD CONSTRAINT "ProfessorTurma_turmaId_anoLetivo_fkey" FOREIGN KEY ("turmaId", "anoLetivo") REFERENCES "Turma"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessorTurma" ADD CONSTRAINT "ProfessorTurma_disciplinaId_fkey" FOREIGN KEY ("disciplinaId") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_vinculoDocenteId_anoLetivo_fkey" FOREIGN KEY ("vinculoDocenteId", "anoLetivo") REFERENCES "ProfessorTurma"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Atividade" ADD CONSTRAINT "Atividade_periodoId_anoLetivo_fkey" FOREIGN KEY ("periodoId", "anoLetivo") REFERENCES "PeriodoLetivo"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaAtividade" ADD CONSTRAINT "EntregaAtividade_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EntregaAtividade" ADD CONSTRAINT "EntregaAtividade_matriculaId_fkey" FOREIGN KEY ("matriculaId") REFERENCES "AlunoTurma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_matriculaId_fkey" FOREIGN KEY ("matriculaId") REFERENCES "AlunoTurma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_atividadeId_fkey" FOREIGN KEY ("atividadeId") REFERENCES "Atividade"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_vinculoDocenteId_anoLetivo_fkey" FOREIGN KEY ("vinculoDocenteId", "anoLetivo") REFERENCES "ProfessorTurma"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Aula" ADD CONSTRAINT "Aula_periodoId_anoLetivo_fkey" FOREIGN KEY ("periodoId", "anoLetivo") REFERENCES "PeriodoLetivo"("id", "anoLetivo") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_aulaId_fkey" FOREIGN KEY ("aulaId") REFERENCES "Aula"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Presenca" ADD CONSTRAINT "Presenca_matriculaId_fkey" FOREIGN KEY ("matriculaId") REFERENCES "AlunoTurma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- Invariantes de domínio complementares ao schema Prisma.
CREATE EXTENSION IF NOT EXISTS btree_gist;
ALTER TABLE "Nota" ADD CONSTRAINT "nota_intervalo" CHECK ("valor" BETWEEN 0 AND 10 AND "versao" > 0);
ALTER TABLE "Atividade" ADD CONSTRAINT "peso_positivo" CHECK ("peso" > 0);
ALTER TABLE "Aula" ADD CONSTRAINT "carga_positiva" CHECK ("cargaMinutos" > 0);
ALTER TABLE "PeriodoLetivo" ADD CONSTRAINT "periodo_valido" CHECK ("fim" > "inicio");
ALTER TABLE "AlunoTurma" ADD CONSTRAINT "matricula_vigencia" CHECK ("fim" IS NULL OR "fim" > "inicio");
ALTER TABLE "ProfessorTurma" ADD CONSTRAINT "docente_vigencia" CHECK ("fim" IS NULL OR "fim" > "inicio");
ALTER TABLE "AlunoResponsavel" ADD CONSTRAINT "responsavel_vigencia" CHECK ("fim" IS NULL OR "fim" > "inicio");
ALTER TABLE "AlunoTurma" ADD CONSTRAINT "matricula_sem_sobreposicao"
 EXCLUDE USING gist ("alunoId" WITH =, "anoLetivo" WITH =, tsrange("inicio", "fim", '[)') WITH &&);
ALTER TABLE "AlunoResponsavel" ADD CONSTRAINT "responsavel_sem_sobreposicao"
 EXCLUDE USING gist ("alunoId" WITH =, "responsavelId" WITH =, tsrange("inicio", "fim", '[)') WITH &&);
ALTER TABLE "ProfessorTurma" ADD CONSTRAINT "docente_sem_sobreposicao"
 EXCLUDE USING gist ("professorId" WITH =, "turmaId" WITH =, "disciplinaId" WITH =, tsrange("inicio", "fim", '[)') WITH &&);
ALTER TABLE "AlunoResponsavel" ADD CONSTRAINT "validador_existente" FOREIGN KEY ("validadoPorId") REFERENCES "Usuario"("id") ON DELETE RESTRICT;

CREATE FUNCTION validar_perfil() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE esperado "Role"; atual "Role";
BEGIN
 esperado := CASE TG_TABLE_NAME WHEN 'Aluno' THEN 'ALUNO'::"Role" WHEN 'Professor' THEN 'PROFESSOR'::"Role" WHEN 'Coordenador' THEN 'COORDENADOR'::"Role" ELSE 'RESPONSAVEL'::"Role" END;
 SELECT "role" INTO atual FROM "Usuario" WHERE id = NEW."usuarioId";
 IF atual IS DISTINCT FROM esperado THEN RAISE EXCEPTION 'Perfil incompatível com o usuário' USING ERRCODE = '23514'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER perfil_aluno BEFORE INSERT OR UPDATE ON "Aluno" FOR EACH ROW EXECUTE FUNCTION validar_perfil();
CREATE TRIGGER perfil_professor BEFORE INSERT OR UPDATE ON "Professor" FOR EACH ROW EXECUTE FUNCTION validar_perfil();
CREATE TRIGGER perfil_coordenador BEFORE INSERT OR UPDATE ON "Coordenador" FOR EACH ROW EXECUTE FUNCTION validar_perfil();
CREATE TRIGGER perfil_responsavel BEFORE INSERT OR UPDATE ON "Responsavel" FOR EACH ROW EXECUTE FUNCTION validar_perfil();

CREATE FUNCTION impedir_troca_perfil() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.role <> OLD.role THEN RAISE EXCEPTION 'Troca de perfil exige fluxo institucional específico' USING ERRCODE = '23514'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER usuario_perfil BEFORE UPDATE OF role ON "Usuario" FOR EACH ROW EXECUTE FUNCTION impedir_troca_perfil();

CREATE FUNCTION validar_responsavel() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NOT EXISTS (SELECT 1 FROM "Usuario" WHERE id = NEW."validadoPorId" AND role = 'COORDENADOR' AND ativo) THEN
  RAISE EXCEPTION 'Vínculo exige validação por coordenador ativo' USING ERRCODE = '23514';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER responsavel_validacao BEFORE INSERT OR UPDATE ON "AlunoResponsavel" FOR EACH ROW EXECUTE FUNCTION validar_responsavel();

CREATE FUNCTION validar_evento_letivo() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE docente "ProfessorTurma"%ROWTYPE; periodo "PeriodoLetivo"%ROWTYPE; instante timestamp;
BEGIN
 SELECT * INTO STRICT docente FROM "ProfessorTurma" WHERE id = NEW."vinculoDocenteId";
 SELECT * INTO STRICT periodo FROM "PeriodoLetivo" WHERE id = NEW."periodoId";
 IF TG_TABLE_NAME = 'Atividade' THEN instante := NEW."dataAvaliacao"; ELSE instante := NEW.data; END IF;
 IF periodo.fechado OR instante < periodo.inicio OR instante >= periodo.fim OR instante < docente.inicio OR (docente.fim IS NOT NULL AND instante >= docente.fim) THEN
  RAISE EXCEPTION 'Evento fora da vigência ou em período fechado' USING ERRCODE = '23514';
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER atividade_periodo BEFORE INSERT OR UPDATE ON "Atividade" FOR EACH ROW EXECUTE FUNCTION validar_evento_letivo();
CREATE TRIGGER aula_periodo BEFORE INSERT OR UPDATE ON "Aula" FOR EACH ROW EXECUTE FUNCTION validar_evento_letivo();

CREATE FUNCTION validar_registro_academico() RETURNS trigger LANGUAGE plpgsql AS $$
DECLARE matricula "AlunoTurma"%ROWTYPE; turma text; instante timestamp; periodo text; prazo timestamp; cancelada boolean;
BEGIN
 SELECT * INTO STRICT matricula FROM "AlunoTurma" WHERE id = NEW."matriculaId";
 IF TG_TABLE_NAME = 'Presenca' THEN
  SELECT d."turmaId", a.data, a."periodoId", a.cancelada INTO turma, instante, periodo, cancelada
   FROM "Aula" a JOIN "ProfessorTurma" d ON d.id = a."vinculoDocenteId" WHERE a.id = NEW."aulaId";
  IF cancelada THEN RAISE EXCEPTION 'Aula cancelada não recebe presença' USING ERRCODE = '23514'; END IF;
 ELSE
  SELECT d."turmaId", a."dataAvaliacao", a."periodoId", a."dataLimite" INTO turma, instante, periodo, prazo
   FROM "Atividade" a JOIN "ProfessorTurma" d ON d.id = a."vinculoDocenteId" WHERE a.id = NEW."atividadeId";
 END IF;
 IF turma IS NULL OR turma <> matricula."turmaId" OR instante < matricula.inicio OR (matricula.fim IS NOT NULL AND instante >= matricula.fim) THEN
  RAISE EXCEPTION 'Matrícula incompatível com o registro acadêmico' USING ERRCODE = '23514';
 END IF;
 IF EXISTS (SELECT 1 FROM "PeriodoLetivo" WHERE id = periodo AND fechado) THEN
  RAISE EXCEPTION 'Período fechado' USING ERRCODE = '23514';
 END IF;
 IF TG_TABLE_NAME = 'EntregaAtividade' THEN
  IF TG_OP = 'UPDATE' THEN RAISE EXCEPTION 'Reenvio não habilitado no MVP' USING ERRCODE = '23514'; END IF;
  NEW."dataEnvio" := (CURRENT_TIMESTAMP AT TIME ZONE 'UTC');
  IF prazo IS NULL OR NEW."dataEnvio" > prazo THEN RAISE EXCEPTION 'Entrega fora do prazo' USING ERRCODE = '23514'; END IF;
 END IF;
 IF TG_TABLE_NAME = 'Nota' AND TG_OP = 'UPDATE' THEN
  IF NEW.versao <> OLD.versao + 1 THEN RAISE EXCEPTION 'Atualização exige incremento de versão' USING ERRCODE = '23514'; END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER nota_matricula BEFORE INSERT OR UPDATE ON "Nota" FOR EACH ROW EXECUTE FUNCTION validar_registro_academico();
CREATE TRIGGER entrega_matricula BEFORE INSERT OR UPDATE ON "EntregaAtividade" FOR EACH ROW EXECUTE FUNCTION validar_registro_academico();
CREATE TRIGGER presenca_matricula BEFORE INSERT OR UPDATE ON "Presenca" FOR EACH ROW EXECUTE FUNCTION validar_registro_academico();

-- Não permitir reatribuição de vínculos/avaliações com histórico.
CREATE FUNCTION proteger_historico() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF TG_TABLE_NAME = 'Atividade' THEN
  IF (NEW."vinculoDocenteId", NEW."periodoId", NEW."dataAvaliacao", NEW.peso) IS DISTINCT FROM (OLD."vinculoDocenteId", OLD."periodoId", OLD."dataAvaliacao", OLD.peso)
   AND (EXISTS (SELECT 1 FROM "Nota" WHERE "atividadeId" = OLD.id) OR EXISTS (SELECT 1 FROM "EntregaAtividade" WHERE "atividadeId" = OLD.id)) THEN
   RAISE EXCEPTION 'Avaliação com histórico não pode ser reatribuída' USING ERRCODE = '23514';
  END IF;
 ELSIF TG_TABLE_NAME = 'AlunoTurma' THEN
  IF (NEW."alunoId", NEW."turmaId", NEW."anoLetivo", NEW.inicio) IS DISTINCT FROM (OLD."alunoId", OLD."turmaId", OLD."anoLetivo", OLD.inicio)
   AND (EXISTS (SELECT 1 FROM "Nota" WHERE "matriculaId" = OLD.id) OR EXISTS (SELECT 1 FROM "EntregaAtividade" WHERE "matriculaId" = OLD.id) OR EXISTS (SELECT 1 FROM "Presenca" WHERE "matriculaId" = OLD.id)) THEN
   RAISE EXCEPTION 'Matrícula com histórico não pode ser reatribuída' USING ERRCODE = '23514';
  END IF;
 END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER atividade_historico BEFORE UPDATE ON "Atividade" FOR EACH ROW EXECUTE FUNCTION proteger_historico();
CREATE TRIGGER matricula_historico BEFORE UPDATE ON "AlunoTurma" FOR EACH ROW EXECUTE FUNCTION proteger_historico();

CREATE FUNCTION proteger_fim_matricula() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF NEW.fim IS NOT NULL AND (
  EXISTS (SELECT 1 FROM "Nota" n JOIN "Atividade" a ON a.id=n."atividadeId" WHERE n."matriculaId"=OLD.id AND a."dataAvaliacao">=NEW.fim) OR
  EXISTS (SELECT 1 FROM "EntregaAtividade" e JOIN "Atividade" a ON a.id=e."atividadeId" WHERE e."matriculaId"=OLD.id AND a."dataAvaliacao">=NEW.fim) OR
  EXISTS (SELECT 1 FROM "Presenca" p JOIN "Aula" a ON a.id=p."aulaId" WHERE p."matriculaId"=OLD.id AND a.data>=NEW.fim)
 ) THEN RAISE EXCEPTION 'Encerramento invalidaria histórico acadêmico' USING ERRCODE='23514'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER matricula_fim BEFORE UPDATE OF fim ON "AlunoTurma" FOR EACH ROW EXECUTE FUNCTION proteger_fim_matricula();

CREATE FUNCTION proteger_docente() RETURNS trigger LANGUAGE plpgsql AS $$
BEGIN
 IF (NEW."professorId",NEW."turmaId",NEW."disciplinaId",NEW."anoLetivo",NEW.inicio) IS DISTINCT FROM (OLD."professorId",OLD."turmaId",OLD."disciplinaId",OLD."anoLetivo",OLD.inicio)
 AND (EXISTS (SELECT 1 FROM "Atividade" WHERE "vinculoDocenteId"=OLD.id) OR EXISTS (SELECT 1 FROM "Aula" WHERE "vinculoDocenteId"=OLD.id))
 THEN RAISE EXCEPTION 'Vínculo docente com histórico não pode ser reatribuído' USING ERRCODE='23514'; END IF;
 IF NEW.fim IS NOT NULL AND (
 EXISTS (SELECT 1 FROM "Atividade" WHERE "vinculoDocenteId"=OLD.id AND "dataAvaliacao">=NEW.fim) OR
 EXISTS (SELECT 1 FROM "Aula" WHERE "vinculoDocenteId"=OLD.id AND data>=NEW.fim))
 THEN RAISE EXCEPTION 'Encerramento invalidaria eventos letivos' USING ERRCODE='23514'; END IF;
 RETURN NEW;
END $$;
CREATE TRIGGER docente_historico BEFORE UPDATE ON "ProfessorTurma" FOR EACH ROW EXECUTE FUNCTION proteger_docente();
