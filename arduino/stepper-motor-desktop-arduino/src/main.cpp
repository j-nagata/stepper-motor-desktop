#include <Arduino.h>

int dirPin = 2; // direction
int stepPin = 3;
int stepsPerRevolution = 200;
int motorSpeed = 2000;
int rotations = 0;

void command(int);
void rotate(int);

void setup()
{
    pinMode(dirPin, OUTPUT);
    pinMode(stepPin, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    if (Serial.available())
    {
        int rec = Serial.read();
        command(rec);
    }
}

void command(int rec)
{
    /*
    Command List :
      0x00  reset position
      0x01  save zero point
      0x02  request current position
      0x03  emergency stop
      0x10  rotate 1/200
      0x11  rotate 1/20
      0x12  rotate 1/2
      0x13  rotate 1
      0x14  rotate 5
      0x15  rotate 10
      0x20  rotate -1/200
      0x21  rotate -1/20
      0x22  rotate -1/2
      0x23  rotate -1
      0x24  rotate -5
      0x25  rotate -10
  */
    if (rec == 0x02)
        Serial.write(rotations);
    if (rec == 0x10)
        rotate(1);
    if (rec == 0x11)
        rotate(10);
    if (rec == 0x12)
        rotate(100);
    if (rec == 0x13)
        rotate(200);
    if (rec == 0x14)
        rotate(1000);
    if (rec == 0x15)
        rotate(2000);
    if (rec == 0x20)
        rotate(-1);
    if (rec == 0x21)
        rotate(-10);
    if (rec == 0x22)
        rotate(-100);
    if (rec == 0x23)
        rotate(-200);
    if (rec == 0x24)
        rotate(-1000);
    if (rec == 0x25)
        rotate(-2000);
}

void rotate(int num)
{
    digitalWrite(dirPin, num < 0 ? HIGH : LOW);
    for (int i = 0; i < abs(num) * 2; i++)
    {
        if (Serial.available())
        {
            int rec = Serial.read();
            command(rec);
            break;
        }
        digitalWrite(stepPin, i % 2 == 0 ? HIGH : LOW);
        delayMicroseconds(motorSpeed);
        if (i % 2)
        {
            rotations += constrain(num, -1, 1);
            command(0x02);
        }
    }
}