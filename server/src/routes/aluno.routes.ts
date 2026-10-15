import { Router } from 'express';
import { AlunoController } from '../controllers/aluno.controller';
import { asyncRoute } from '../lib/errors';
// Autenticação, CSRF e perfil são aplicados antes deste router em app.ts.
export function createAlunoRoutes(controller = new AlunoController()) {
  const router = Router();
  router.post('/', asyncRoute(controller.criar));
  router.get('/', asyncRoute(controller.listar));
  return router;
}
