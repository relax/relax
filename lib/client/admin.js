import {Router} from 'relax-framework';
import adminRoutes from './routers/admin';
import init from './init';

init(Router.extend(adminRoutes));
