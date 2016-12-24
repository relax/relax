import 'babel-polyfill';

import reducers from 'reducers';
import routes from 'routers/admin';

import renderRoutes from './helpers/render-routes';

renderRoutes(routes, reducers);
