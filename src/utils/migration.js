import { exec } from 'child_process';
import fs from 'fs';
import { clients } from './clients.js';

const total = clients.length;
let counter = 0;

async function run() {
  while (counter < total) {
    await new Promise((resolve, reject) => {
      console.log('Alterando arquivo .env');
      const databaseUrl = `DATABASE_URL="postgresql://${clients[counter].user}:${clients[counter].password}@${clients[counter].ip}:${clients[counter].port}/${clients[counter].subdomain}?schema=public"`;
      const databaseTrated = databaseUrl.replace('""', '"');
      fs.writeFile('.env', databaseTrated, (err) => {
        if (err) {
          reject(err);
        }
      });
      console.log('Arquivo env alterado com sucesso!');
      console.log('Iniciando Migração !');
      exec('yarn prisma migrate dev', (error, stdout, stderr) => {
        if (error) {
          reject(error.message);
        }
        if (stderr) {
          reject(stderr);
        }
        console.log(`stdout: ${stdout}`);
        console.log('Migração finalizada com sucesso!');
        resolve('Pronto');
      });
    });
    counter++;
  }
}

run()
  .then(() => {
    console.log('TERMINOU');
  })
  .catch((err) => {
    console.log(err);
  });
