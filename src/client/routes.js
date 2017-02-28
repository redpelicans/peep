import Tags from './containers/Tags';
import EditTag from './containers/Tags/Edit';
import Notes from './containers/Notes';

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
