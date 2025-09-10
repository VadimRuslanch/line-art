import { createServer } from 'https';
import fs from 'fs';
import { parse } from 'url';
import next from 'next';

const dev = true;
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: fs.readFileSync('./cert/key.pem'),
  cert: fs.readFileSync('./cert/cert.pem'),
};

app.prepare().then(() => {
  createServer(httpsOptions, (req, res) => {
    handle(req, res, parse(req.url!, true));
  }).listen(3000, () => console.log('> Ready on https://localhost:3000'));
});
