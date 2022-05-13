import Koa from 'koa';
import Router from '@koa/router';
import fetch from 'node-fetch';
import dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

router.get('/', ({ response }) => {
  response.body = '<a href="/fetch_token">Get Probely Access Token</a>';
});

router.get('/fetch_token', async ({ response }) => {
  const email = process.env.EMAIL;
  const password = process.env.PASSWORD;
  const type = process.env.TYPE;
  let url;

  if (type === 'ENTERPRISE') {
    url = 'https://api.probely.com/enterprise/auth/obtain/';
  } else {
    url = 'https://api.probely.com/auth/obtain/';
  }
  const authBody = JSON.stringify({
    username: email,
    password,
  });
  const res = await fetch(url, {
    method: 'POST',
    body: authBody,
    headers: { 'Content-Type': 'application/json' },
  });
  response.body = await res.json();
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(5000, (e) => {
  if (e) {
    console.error(e);
  } else {
    console.log(`Login server running at http://localhost:5000`);
  }
});
