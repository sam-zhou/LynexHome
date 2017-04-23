void setup() {
  // put your setup code here, to run once:
  pinMode(2, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  // put your main code here, to run repeatedly:
  char inStr = '\0';

  if (Serial.available())
  {
    inStr = Serial.read();
    //Serial.println(inStr);
  }

  if (inStr == '1')
  {
    Serial.println(inStr);
    digitalWrite(2, HIGH);
    delay(200);
  }
  else if (inStr == '0')
  {
    digitalWrite(2, LOW);
  }
}
