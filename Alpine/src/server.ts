// Import the 'net' module
require("dotenv").config({path: "/Users/mantragohil/Documents/code/Nirma/Alpine/.env"});
console.log(process.env.port)
const net = require('net');
const {parseResponse} = require('parse-raw-http');

//local-modules
const protocol = require("../service/determine.protocol");
const {xmlToJson, jsonToXml} = require("../service/converter");

// Define local consts
const port = process.env.port;

// Create a TCP server using the 'net' module
const server = net.createServer((socket:any) => {
  // When a new connection is established
  console.log('Client connected');

  // Set the encoding for the data received from the client
  socket.setEncoding('utf8');

  // Listen for data from the client
  socket.on('data', (data:any) => {
    console.log(data)
    const foundProtocol = protocol(data)
    const [, headerLines] = data.split(/\r\n\r\n/);
    switch(foundProtocol){
      case "XML":
        const json_object = xmlToJson(headerLines);
        console.log({json_object})
        break;
    }
  });
  
  // Listen for the 'end' event, which is triggered when the client disconnects
  socket.on('end', () => {
    console.log('Client disconnected');
  });

  // Handle errors
  socket.on('error', (error:any) => {
    console.error(`Error: ${error.message}`);
  });
});

// Start the server and listen for incoming connections on the specified port
server.listen(port, () => {
  console.log(`TCP server listening on port ${server.address().port}`);
});

// Handle server errors
server.on('error', (error:any) => {
  console.error(`Server error: ${error.message}`);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
export {}