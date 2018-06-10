const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');

const app = new Koa();
const router = new Router();

app.use(cors('*'));

app.use(bodyParser({
  enableTypes: ['json'],
}));

router.get('/api/weather', async (ctx) => {
  ctx.body = {
    current: {
      condition: 'Clear',
      temperature: 68.2,
      time: 1526698800,
    },
    forecast: [
      {
        temperature: 58,
        condition: 'Rainy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Foggy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Snowy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Partly Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'Cloudy',
        time: 1000000,
      },
    ]
  };
});


let colors = {
  clear: '#81dc68',
  rain: '#af7289',
  snow: '#936130',
  wind: '#77ffaa',
  fog: '#336699',
  cloudy: '#f77f91',
  partlyCloudy: '#140305',
};

router.get('/colors', async (ctx) => {
  ctx.body = colors;
});

router.patch('/colors', async (ctx) => {
  const newColors = { ...colors, ...ctx.request.body };
  colors = newColors;
  ctx.body = colors;
});


let settings = {
  unit: 'us',
  location: '42.3601,-71.0589',
  hostname: 'lighty',
};

router.get('/settings', async (ctx) => {
  ctx.body = settings;
});

router.patch('/settings', async (ctx) => {
  const newSettings = { ...settings, ...ctx.request.body };
  settings = newSettings;
  ctx.body = settings;
});

app.use(router.routes());

app.listen(3001);
