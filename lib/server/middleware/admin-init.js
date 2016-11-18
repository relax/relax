import UserModel from '../models/user';
import logger from '../logger';

export default async (req, res, next) => {
  req.relax = req.relax || {usersCount: 0};
  try {
    req.relax.usersCount = await UserModel.count().exec();
    const initPage = '/admin/init';
    if (req.relax.usersCount === 0 && req.url.indexOf(initPage) === -1) {
      return res.redirect(initPage);
    }
  } catch (error) {
    logger.error('ADMIN INIT: users count had an error', error);
    return next(error);
  }
  next();
};
