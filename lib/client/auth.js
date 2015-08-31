import {Router} from 'relax-framework';
import authRoutes from './routers/auth';
import init from './init';

init(Router.extend(authRoutes));
