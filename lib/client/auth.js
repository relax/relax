import reducers from 'reducers';
import routes from 'routers/auth';

import renderRoutes from './helpers/render-routes';

renderRoutes(routes, reducers);
