#include <WiFiManager.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

ESP8266WebServer server(80);

struct Condition
{
  String condition;
  float temperature;
  int time;
};

Condition currentWeather = { "clear", 68.2, 150000 };
Condition forecast[2] = {
  { "rain", 68.2, 160000 },
  { "cloudy", 45, 170000 }
};

void getWeather()
{
  DynamicJsonBuffer jsonBuffer;

  JsonObject &root = jsonBuffer.createObject();
  JsonObject &current = root.createNestedObject("current");

  current["condition"] = currentWeather.condition;
  current["temperature"] = currentWeather.temperature;
  current["time"] = currentWeather.time;

  JsonArray& weatherForecast = root.createNestedArray("forecast");

  for (int i = 0; i < 2; i++)
  {
    JsonObject& item = weatherForecast.createNestedObject();

    item["condition"] = forecast[i].condition;
    item["temperature"] = forecast[i].temperature;
    item["time"] = forecast[i].time;
  }

  String response;
  root.printTo(response);

  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/json", response);
}

struct Color
{
  int red;
  int green;
  int blue;
};

struct Conditions
{
  Color clear;
  Color windy;
  Color partlyCloudy;
  Color cloudy;
  Color rain;
  Color snow;
  Color fog;
};

Conditions conditionList = {
  {242, 142, 42},
  {37, 101, 200},
  {178, 200, 133},
  {84, 192, 95},
  {0, 72, 181},
  {43, 36, 245},
  {90, 100, 80},
};

void getConditions()
{
  DynamicJsonBuffer jsonBuffer;

  JsonObject &root = jsonBuffer.createObject();

  JsonObject &clear = root.createNestedObject("clear");
  clear["red"] = conditionList.clear.red;
  clear["green"] = conditionList.clear.green;
  clear["blue"] = conditionList.clear.blue;

  JsonObject &windy = root.createNestedObject("windy");
  windy["red"] = conditionList.windy.red;
  windy["green"] = conditionList.windy.green;
  windy["blue"] = conditionList.windy.blue;

  JsonObject &partlyCloudy = root.createNestedObject("partlyCloudy");
  partlyCloudy["red"] = conditionList.partlyCloudy.red;
  partlyCloudy["green"] = conditionList.partlyCloudy.green;
  partlyCloudy["blue"] = conditionList.partlyCloudy.blue;

  JsonObject &cloudy = root.createNestedObject("cloudy");
  cloudy["red"] = conditionList.cloudy.red;
  cloudy["green"] = conditionList.cloudy.green;
  cloudy["blue"] = conditionList.cloudy.blue;

  JsonObject &rain = root.createNestedObject("rain");
  rain["red"] = conditionList.rain.red;
  rain["green"] = conditionList.rain.green;
  rain["blue"] = conditionList.rain.blue;

  JsonObject &snow = root.createNestedObject("snow");
  snow["red"] = conditionList.snow.red;
  snow["green"] = conditionList.snow.green;
  snow["blue"] = conditionList.snow.blue;

  JsonObject &fog = root.createNestedObject("fog");
  fog["red"] = conditionList.fog.red;
  fog["green"] = conditionList.fog.green;
  fog["blue"] = conditionList.fog.blue;

  String response;
  root.printTo(response);

  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/json", response);
}

void setConditions()
{
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));

  JsonObject& clear = root["clear"];
  if (clear.containsKey("red")) { conditionList.clear.red = clear["red"]; }
  if (clear.containsKey("green")) { conditionList.clear.green = clear["green"]; }
  if (clear.containsKey("blue")) { conditionList.clear.blue = clear["blue"]; }

  JsonObject& windy = root["windy"];
  if (windy.containsKey("red")) { conditionList.windy.red = windy["red"]; }
  if (windy.containsKey("green")) { conditionList.windy.green = windy["green"]; }
  if (windy.containsKey("blue")) { conditionList.windy.blue = windy["blue"]; }

  JsonObject& partlyCloudy = root["partlyCloudy"];
  if (partlyCloudy.containsKey("red")) { conditionList.partlyCloudy.red = partlyCloudy["red"]; }
  if (partlyCloudy.containsKey("green")) { conditionList.partlyCloudy.green = partlyCloudy["green"]; }
  if (partlyCloudy.containsKey("blue")) { conditionList.partlyCloudy.blue = partlyCloudy["blue"]; }

  JsonObject& cloudy = root["cloudy"];
  if (cloudy.containsKey("red")) { conditionList.cloudy.red = cloudy["red"]; }
  if (cloudy.containsKey("green")) { conditionList.cloudy.green = cloudy["green"]; }
  if (cloudy.containsKey("blue")) { conditionList.cloudy.blue = cloudy["blue"]; }

  JsonObject& rain = root["rain"];
  if (rain.containsKey("red")) { conditionList.rain.red = rain["red"]; }
  if (rain.containsKey("green")) { conditionList.rain.green = rain["green"]; }
  if (rain.containsKey("blue")) { conditionList.rain.blue = rain["blue"]; }

  JsonObject& snow = root["snow"];
  if (snow.containsKey("red")) { conditionList.snow.red = snow["red"]; }
  if (snow.containsKey("green")) { conditionList.snow.green = snow["green"]; }
  if (snow.containsKey("blue")) { conditionList.snow.blue = snow["blue"]; }

  JsonObject& fog = root["fog"];
  if (fog.containsKey("red")) { conditionList.fog.red = fog["red"]; }
  if (fog.containsKey("green")) { conditionList.fog.green = fog["green"]; }
  if (fog.containsKey("blue")) { conditionList.fog.blue = fog["blue"]; }

  getConditions();
}

struct Settings
{
  String lat;
  String lng;
  String hostname;
};

Settings currentSettings = { "42.3601", "-71.0589", "weather-light" };

void getSettings()
{
  DynamicJsonBuffer jsonBuffer;
  JsonObject &root = jsonBuffer.createObject();

  root["lat"] = currentSettings.lat;
  root["long"] = currentSettings.lng;
  root["hostname"] = currentSettings.hostname;

  String response;
  root.printTo(response);

  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/json", response);
}

void setSettings()
{
  DynamicJsonBuffer jsonBuffer;
  JsonObject& root = jsonBuffer.parseObject(server.arg("plain"));

  if (root.containsKey("lat")) { currentSettings.lat = root.get<String>("lat"); }
  if (root.containsKey("long")) { currentSettings.lng = root.get<String>("long"); }
  if (root.containsKey("hostname")) { currentSettings.hostname = root.get<String>("hostname"); }

  getSettings();
}

void corsDisable()
{
  server.sendHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  server.sendHeader("Access-Control-Allow-Methods", "PATCH,GET,OPTIONS");
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", "" );
}

void setupServer()
{
  server.on("/api/weather", HTTP_OPTIONS, corsDisable);
  server.on("/api/weather", HTTP_GET, getWeather);

  server.on("/api/conditions", HTTP_OPTIONS, corsDisable);
  server.on("/api/conditions", HTTP_GET, getConditions);
  server.on("/api/conditions", HTTP_PATCH, setConditions);

  server.on("/api/conditions", HTTP_OPTIONS, corsDisable);
  server.on("/api/settings", HTTP_GET, getSettings);
  server.on("/api/settings", HTTP_PATCH, setSettings);

  server.begin();
}

void setup()
{
  Serial.begin(115200);

  WiFiManager wifiManager;
  wifiManager.autoConnect("ESPConnect", "ESPConnectPassword");

  setupServer();
}

void loop()
{
  server.handleClient();
}
