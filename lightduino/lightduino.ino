#include <Arduino.h>
#include <ArduinoJson.h>

const int redPin = 11;
const int greenPin = 10;
const int bluePin = 9;

const String typeSet = "set";

void setColor(int red, int green, int blue)
{
  analogWrite(redPin, red);
  analogWrite(greenPin, green);
  analogWrite(bluePin, blue);

  Serial.print("red ");
  Serial.println(red, DEC);

  Serial.print("green ");
  Serial.println(green, DEC);

  Serial.print("blue ");
  Serial.println(blue, DEC);
}

void setup()
{
  Serial.begin(115200);
  Serial.println("yo");

  pinMode(redPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
  pinMode(bluePin, OUTPUT);

  setColor(100, 100, 100);
}

void loop()
{
  if (Serial.available() > 0)
  {
    DynamicJsonBuffer jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(Serial);

    String type = root["type"];

    if (type == typeSet)
    {
      int red = root["color"][0];
      int green = root["color"][1];
      int blue = root["color"][2];
      
      setColor(red, green, blue);
    }
    Serial.print("I received type: ");
    Serial.println(type);
  }
}
