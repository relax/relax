import nodemailer from 'nodemailer';
import config from '../../../../config';
import validateMailConfig from 'helpers/validate-mail-config';
import getSettings from 'helpers/get-settings';
import {
  mailService,
  mailUser,
  mailPass,
  mailFrom
} from 'statics/settings-keys';

const getErrorObj = (message, details) => {
  const err = {mailError: message};
  if (details) {err.details = details;}
  return err;
};

export default async function sendMail (formData) {
  const settingsIds = [
    mailService,
    mailUser,
    mailPass,
    mailFrom
  ];
  const settings = await getSettings(settingsIds);
  const mailSettings =
    validateMailConfig(settings, settingsIds) ||
    validateMailConfig(config.mail.settings, settingsIds) ||
    false;

  if (mailSettings) {
    const transporter = nodemailer.createTransport({
      service: mailSettings.mailService,
      auth: {
        user: mailSettings.mailUser,
        pass: mailSettings.mailPass
      }
    });
    const mailOptions = {
      from: mailSettings.mailFrom,
      to: formData.to,
      subject: formData.subject,
      html: formData.message
    };

    try {
      return await transporter.sendMail(mailOptions);
    } catch (err) {
      return getErrorObj('Error sending email', err);
    }
  } else {
    return getErrorObj('Admin: mail setup not concluded');
  }
}
