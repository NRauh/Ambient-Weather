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
      condition: 'clear',
      human: 'Clear',
      temperature: 68.2,
      time: 1526698800,
    },
    forecast: [
      {
        temperature: 58,
        condition: 'windy',
        human: 'Windy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'partlyCloudy',
        human: 'Partly Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'cloudy',
        human: 'Cloudy',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'rain',
        human: 'Rain',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'snow',
        human: 'Snow',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'fog',
        human: 'Fog',
        time: 1000000,
      },
      {
        temperature: 58,
        condition: 'clear',
        human: 'Clear',
        time: 1000000,
      },
    ]
  };
});


let colors = {
  clear: { red: 242, green: 142, blue: 42 },
  windy: { red: 37, green: 101, blue: 200 },
  partlyCloudy: { red: 178, green: 200, blue: 133 },
  cloudy: { red: 84, green: 192, blue: 95 },
  rain: { red: 0, green: 72, blue: 181 },
  snow: { red: 43, green: 36, blue: 245 },
  fog: { red: 90, green: 100, blue: 80 },
};

router.get('/api/conditions', async (ctx) => {
  ctx.body = colors;
});

router.patch('/api/conditions', async (ctx) => {
  const newColors = { ...colors, ...ctx.request.body };
  colors = newColors;
  ctx.body = colors;
});


let settings = {
  lat: '42.3601',
  long: '-71.0589',
  hostname: 'weather-light'
};

router.get('/api/settings', async (ctx) => {
  ctx.body = settings;
});

router.patch('/api/settings', async (ctx) => {
  const newSettings = { ...settings, ...ctx.request.body };
  settings = newSettings;
  ctx.body = settings;
});

app.use(router.routes());

app.listen(3001);
