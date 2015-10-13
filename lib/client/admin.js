import {Router} from 'backbone';
import adminRoutes from './routers/admin';
import init from './init';

init(Router.extend(adminRoutes));
