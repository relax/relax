import {Router} from 'backbone';
import publicRoutes from './routers/public';
import init from './init';

init(Router.extend(publicRoutes));
