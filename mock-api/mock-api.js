const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');

const app = new Koa();
const router = new Router();

app.use(bodyParser({
  enableTypes: ['json'],
}));

router.get('/weather', async (ctx) => {
  ctx.body = {
    color: 'clear',
    temperature: 68.2,
    time: 1526698800,
    hourly: [
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
      { time: 1526698800, color: 'clear' },
    ],
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

app.listen(3000);
