import asyncComponent from './lib/async';

const People = asyncComponent(() => import('./components/People').then(module => module.default));
const AddPeople = asyncComponent(() => import('./components/People/Add').then(module => module.default));
const EditPeople = asyncComponent(() => import('./components/People/Edit').then(module => module.default));
const Companies = asyncComponent(() => import('./components/Companies').then(module => module.default));
const Tags = asyncComponent(() => import('./components/Tags').then(module => module.default));
const EditTag = asyncComponent(() => import('./components/Tags/Edit').then(module => module.default));
const AddCompany = asyncComponent(() => import('./components/Companies/Add').then(module => module.default));
const ViewCompany = asyncComponent(() => import('./components/Companies/View').then(module => module.default));
const Notes = asyncComponent(() => import('./components/Notes').then(module => module.default));
const Login = asyncComponent(() => import('./components/Login').then(module => module.default));

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
    path: '/people/add',
    component: AddPeople,
    exact: true,
  },
  {
    path: '/people/edit/:id',
    component: EditPeople,
    exact: true,
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
    path: '/companies/:id',
    component: ViewCompany,
    exact: true,
    auth: true,
  },
  {
    path: '/companies/edit/:id',
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
