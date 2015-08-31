import {Router} from 'relax-framework';
import publicRoutes from './routers/public';
import init from './init';

init(Router.extend(publicRoutes));
