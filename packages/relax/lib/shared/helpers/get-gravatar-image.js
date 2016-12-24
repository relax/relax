import md5 from 'js-md5';

export default (email, size = 100) => {
  const hash = email ? md5(email.toLowerCase()) : '0';
  return `http://www.gravatar.com/avatar/${hash}?d=mm&s=${size}`;
};
