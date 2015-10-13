import {Router} from 'backbone';
import authRoutes from './routers/auth';
import init from './init';

init(Router.extend(authRoutes));
