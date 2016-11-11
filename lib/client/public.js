import 'babel-polyfill';

import reducers from 'reducers/index.public.js';
import routes from 'routers/public';

import renderRoutes from './helpers/render-routes';

renderRoutes(routes, reducers);
