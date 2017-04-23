/*
  MQTT client for esp8266
*/
#include <ArduinoJson.h>
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <string.h>
#include <ESP.h>
#include "Sonoff.h"
#include <DNSServer.h>
#include <ESP8266WebServer.h>
#include <ESP8266HTTPClient.h>
#include <ESP8266httpUpdate.h>
#include <WiFiManager.h>

// Update these with values suitable for your network.
#define INPUT_PIN         2

#ifdef DEBUG
#define DEBUG_PRINT(x)     Serial.print (x)
#define DEBUG_PRINTDEC(x)     Serial.print (x, DEC)
#define DEBUG_PRINTLN(x)  Serial.println (x)
#else
#define DEBUG_PRINT(x)
#define DEBUG_PRINTDEC(x)
#define DEBUG_PRINTLN(x)
#endif

const char*       MQTT_POW_RELAYS_POSITION   = "/powposition";
const char*       MQTT_POW_COMMAND = "/powcommand";
const char*       MQTT_POW_POWER = "/powpower";
const char*       MQTT_POW_CURRENT = "/powcurrent";
const char*       MQTT_SWITCH_ON_PAYLOAD                            = "ON";
const char*       MQTT_SWITCH_OFF_PAYLOAD                           = "OFF";

const char* mqtt_server = "192.168.0.250";


WiFiClient espClient;
PubSubClient client(espClient);
long lastMsg = 0;
char msg[50];
int value = 0;

int clientMac = 1;
byte mac[6];
char payload[50];
Sonoff sonoff;
const int led = LED;
char message_buff[100];

void setup_wifi() {
  WiFiManager wifiManager;
  //first parameter is name of access point, second is the password
  wifiManager.autoConnect();

  if (!wifiManager.autoConnect()) {
    Serial.println("failed to connect and hit timeout");
    //reset and try again, or maybe put it to deep sleep
    ESP.reset();
    delay(1000);
  }

  //if you get here you have connected to the WiFi
  Serial.println("connected...yeey :)");

}


//----------- Sonoff switch -------------------

void setRelayState(bool relayState) {


  DEBUG_PRINTLN(relayState);
  if (relayState == HIGH) {

    digitalWrite(12, HIGH);
    digitalWrite(15, HIGH);
  }
  else {

    digitalWrite(12, LOW);
    digitalWrite(15, LOW);
  }
  reportState(relayState);
}

void reportState(bool relayState) {
  bool result;
  char data[80];
  if (relayState == HIGH) {
    sprintf(data, "{\"chipId\":\"ESP%d\",\"status\":\"on\"}", clientMac);
    result = client.publish("StatusCallBack", data, true);

  }
  else {
    sprintf(data, "{\"chipId\":\"ESP%d\",\"status\":\"off\"}", clientMac);
    result = client.publish("StatusCallBack", data, true);

  }

  if (result) {
    DEBUG_PRINT(F("INFO: MQTT message publish succeeded. Topic: "));
    DEBUG_PRINT(_topic);
    DEBUG_PRINT(F(". Payload: "));
    DEBUG_PRINTLN(relayState);
  } else {
    DEBUG_PRINTLN(F("ERROR: MQTT relayState message publish failed"));
  }
}

void callback(char* topic, byte* payload, unsigned int length) {
  int i = 0;

  char temp[100];

  for (i = 0; i < length; i++) {
    message_buff[i] = payload[i];
  }
  message_buff[i] = '\0';
  if (strcmp (topic, "update") == 0) {
    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.parseObject(message_buff);

    if (!root.success())
    {
      Serial.println("parseObject() failed");
      return;
    }

    const char* url    = root["url"];
    t_httpUpdate_return ret = ESPhttpUpdate.update(url);
    Serial.println("Update URL: ");
    Serial.println(url);
  } else if (strcmp (topic, "command") == 0) {

    String msgString = String(message_buff);
    sprintf(temp, "{\"ESP%d\":\"on\"}", clientMac);
    if (msgString.equals(temp)) {
      Serial.println("Turning on");
      setRelayState(HIGH);
    }
    sprintf(temp, "{\"ESP%d\":\"off\"}", clientMac);
    if (msgString.equals(temp)) {
      setRelayState(LOW);
    }
    sprintf(temp, "{\"type\":\"getstate\"}", clientMac);
    if (msgString.equals(temp)) {
      char data[80];
    int buttonState = 0;
    buttonState = digitalRead(12);
    if(buttonState == HIGH){
      sprintf(data, "{\"chipId\":\"ESP%d\",\"state\":\"on\"}", clientMac);
      }
    else{
      sprintf(data, "{\"chipId\":\"ESP%d\",\"state\":\"off\"}", clientMac);
      }
    client.publish("StatusCallBack", data, true);
    }
  } 
}
void setup() {
  clientMac = ESP.getChipId();
  pinMode(12, OUTPUT);
  Serial.begin(115200);
  setup_wifi();
  client.setServer(mqtt_server, 1883);
  client.setCallback(callback);


}

void reconnect() {
  // Loop until we're reconnected
  char charBuf[50];
  String(clientMac).toCharArray(charBuf, 50);
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    // Attempt to connect
    sprintf(payload, "{\"type\": \"off\",\"did\": \"ESP%d\"}", clientMac);
    if (client.connect(charBuf, "connection", 0, false, payload)) {
      Serial.println("connected");
      // Once connected, publish an announcement...

      sprintf(payload, "{\"type\": \"live\",\"did\": \"ESP%d\"}", clientMac);
      Serial.println(payload);
      client.publish("connection", payload);
      // ... and resubscribe
      client.subscribe("command");
    } else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println(" try again in 5 seconds");
      // Wait 5 seconds before retrying
      delay(5000);
    }
  }
}
void loop() {

  if (!client.connected()) {
    reconnect();
  }
  client.loop();
}

