import Tags from './components/Tags';
import EditTag from './components/Tags/Edit';
import Notes from './components/Notes';
import Companies from './components/Companies';
import People from './components/People';

const routes = [
  {
    path: '/',
    exact: true,
    component: Tags,
  },  
  {
    path: '/tags',
    component: Tags,
    default: true,
    exact: true,
  },  
  {
    path: '/people',
    component: People,
    exact: true,
  },  
  {
    path: '/companies',
    component: Companies,
    exact: true,
  },  
  {
    path: '/tags/edit/:id',
    component: EditTag,
    exact: true,
  },
  {
    path: '/notes',
    component: Notes,
    exact: true,
  },  
];

export const defaultRoute = () => routes.filter(r => r.default)[0].component;
export default routes;
