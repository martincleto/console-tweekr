#!/usr/bin/env node

const { writeFileSync, existsSync } = require('fs');
const { join } = require('path');
const dotenv = require('dotenv');

const appName = require(join(process.cwd(), 'package.json')).name;
const appVersion = require(join(process.cwd(), 'package.json')).version;

dotenv.config();

const loadLocalEnv = () => {
  const path = join(process.cwd(), '.env');
  if (!existsSync(path)) throw new Error('Env file not found!')
    dotenv.config()
    console.info('Load local .env file: OK');
};

const writeEnvFile = () => {
  let content = `const env: NodeJS.ReactEnv = {
  APP_NAME: '${appName}',
  APP_VERSION: '${appVersion}',
  API_HOST: '${process.env.API_HOST}',
  NODE_ENV: '${process.env.NODE_ENV}',
  PUBLIC_URL: '${process.env.PUBLIC_URL}'
};

window.process = process;
window.process['env'] = env;
export { env };

`;

  const fileName = join(process.cwd(), 'src', 'env.ts');
  writeFileSync(fileName, content);
  console.info(`Write file ${fileName}: OK`);
};

loadLocalEnv();
writeEnvFile();