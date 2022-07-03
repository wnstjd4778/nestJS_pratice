import { registerAs } from '@nestjs/config';

export default registerAs('admin', () => ({
  email: process.env.ADMIN_EMAIL,
  password: process.env.ADMIN_PASSWORD,
  name: process.env.ADMIN_NAME,
  phone: process.env.ADMIN_PHONE,
}));
