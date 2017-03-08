import Tags from './components/Tags';
import EditTag from './components/Tags/Edit';
import Notes from './components/Notes';
import Companies from './components/Companies';
import AddCompany from './components/Companies/Add';
import People from './components/People';
import Login from './components/Login';

const routes = [
  {
    path: '/',
    exact: true,
    auth: true,
    component: Companies,
  },
  {
    path: '/tags',
    component: Tags,
    exact: true,
    auth: true,
  },
  {
    path: '/people',
    component: People,
    exact: true,
    auth: true,
  },
  {
    path: '/companies',
    component: Companies,
    default: true,
    exact: true,
    auth: true,
  },
  {
    path: '/companies/add',
    component: AddCompany,
    exact: true,
    auth: true,
  },
  {
    path: '/tags/edit/:id',
    component: EditTag,
    exact: true,
    auth: true,
  },
  {
    path: '/notes',
    component: Notes,
    exact: true,
    auth: true,
  },
  {
    path: '/login',
    exact: true,
    component: Login,
  },
];

export const defaultRoute = () => routes.filter(r => r.default)[0];
export default routes;
