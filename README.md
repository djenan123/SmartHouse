# SmartHouse
IoT project :: REST API C# ASP.NET Core | Xamarin forms | Arduino Uno | NODEMCU - ESP8266

Currently working on my IoT project. Project contains Arduino Uno that communicates with sensors: temperature and humidity (DHT11), smoke sensor (MQ2), movement sensor (PIR) and with servo. For making a RESTful API I used C# .NET CORE, for database I used SQL Server and for mobile development I used React Native. Flow of the project goes like this. Arduino collects data from the sensors and sends them, like JSON object, to the NODEMCU (ESP8266) over serial communication and then NODEMCU make a HTTP request to my API and then data is being saved to database. Main reason why I used NODEMCU is because Arduino Uno doesn’t have WiFi modul, so it can’t send HTTP requests to my API. User can filter data and see current temperature using mobile application. I also integrated Twilio Api as a part of my project, beacuse in case of a gas leak, NODEMCU will send an HTTP request and user will get a message to the phone so user can react immediately.
