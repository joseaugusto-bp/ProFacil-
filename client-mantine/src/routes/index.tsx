import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { LoginScreen } from '../pages/Login';
import { Layout } from '../components/Layout';
import { DashboardCoordenador } from '../pages/Coordenador/Dashboard';
import { TurmasCoordenador } from '../pages/Coordenador/Turmas';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LoginScreen />,
  },
  {
    path: '/coordenador',
    element: <Layout />, // Layout tem o Sidebar e um Outlet
    children: [
      {
        path: '',
        element: <Navigate to="/coordenador/dashboard" replace />
      },
      {
        path: 'dashboard',
        element: <DashboardCoordenador />
      },
      {
        path: 'turmas',
        element: <TurmasCoordenador />
      },
      // TODO: Adicionar rotas para 'notas' e 'questoes' futuramente
    ]
  }
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
