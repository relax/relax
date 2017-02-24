import boolean from 'boolean';
import getSettings from 'helpers/get-settings';
import ReactMaintenancePage from '../../shared/screens/public/screens/maintenance/index.js';
import React from 'react';
import {renderToString} from 'react-dom/server';

export default async (req, res, next) => {
  const settings = await getSettings(['maintenanceMode']);
  settings.maintenanceMode = boolean(settings.maintenanceMode);
  /**
  TODO: when roles are implemented, check if user is an admin
  **/
  if (req.user ||
      !settings.maintenanceMode ||
      req.url.indexOf('/admin') !== -1) {
    return next();
  }

  /**
    TODO: future enhancements to enable a hook for a custom page
  **/
  res.send(renderToString(<ReactMaintenancePage />));
};
