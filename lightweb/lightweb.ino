#include <WiFiManager.h>
#include <ESP8266WebServer.h>
#include <ArduinoJson.h>

ESP8266WebServer server(80);

void getWeather()
{
  StaticJsonBuffer<200> jsonBuffer;

  JsonObject& root = jsonBuffer.createObject();
  JsonObject& current = root.createNestedObject("current");

  current["condition"] = "clear";
  current["human"] = "Clear";
  current["temperature"] = 68.2;
  current["time"] = 1500000;

  String response;
  root.printTo(response);
  server.send(200, "text/json", response);
}

void getConditions()
{
  server.send(200, "text/plain", "got conditions");
}

void setConditions()
{
  server.send(200, "text/plain", "set conditions");
}

void getSettings()
{
  server.send(200, "text/plain", "got settings");
}

void setSettings()
{
  server.send(200, "text/plain", "set settings");
}


void setupServer()
{
  server.on("/api/weather", HTTP_GET, getWeather);

  server.on("/api/conditions", HTTP_GET, getConditions);
  server.on("/api/conditions", HTTP_PATCH, setConditions);

  server.on("/api/settings", HTTP_GET, getSettings);
  server.on("/api/settings", HTTP_PATCH, setSettings);

  server.begin();
}

void setup()
{
  Serial.begin(115200);
  Serial.println("Wow");

  WiFiManager wifiManager;
  wifiManager.autoConnect("ESPConnect", "ESPConnectPassword");

  setupServer();
}

void loop()
{
  server.handleClient();
}
