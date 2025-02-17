const WebSocket = require('ws');
const mqtt = require("mqtt");
const express = require('express')


const wss = new WebSocket.Server({ port: 9000 });

wss.on('connection', (ws) => {
  console.log('New client connected');

  // Sending a message to the client
  //ws.send('Welcome to the WebSocket server!');

  // Listening for messages from the client
  ws.on('message', (message) => {
    console.log(`WS Request -> ${message}`);
    // Echoing the message back to the client
    ws.send(JSON.stringify({received: `${message}`}));
  });

  // Handling client disconnection
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

console.log('WebSocket port -> ws://{server}}:9000');


const client = mqtt.connect("mqtt://test.mosquitto.org");

client.on("connect", () => {
  client.subscribe("mqtt/test", (err) => {
    console.log("MQTT broker -> mqtt://test.mosquitto.org:1883 Topic -> mqtt/test");
    //if (!err) {
    //  client.publish("presence", "Hello mqtt");
    //}
  });
});

client.on("message", (topic, message) => {
  // message is Buffer
  console.log(`MQTT Request -> ${message.toString()}`);
  console.log(message.toString());
  //client.end();
});

// HTTP server
const app = express()
const port = 8080
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.post('/', (req, res) => {
    console.log(`HTTP Request -> ${JSON.stringify(req.body)}`);
    res.send({received: req.body})
})
app.listen(port, () => {
  console.log(`REST port -> http://{server}:${port}`)
})