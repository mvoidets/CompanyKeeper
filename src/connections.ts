import pkg from 'pg';
const { Client } = pkg;

import * as dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number(process.env.DB_PORT),
});

export const connectDB = async () => {
  await client.connect();
};

export const disconnectDB = async () => {
  await client.end();
};

export const queryDB = async (text: string, params?: any[]) => {
  const res = await client.query(text, params);
  return res.rows;
};
