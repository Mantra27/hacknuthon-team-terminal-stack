const axios = require('axios');

// Set the URL for the SOAP server
const url = 'http://localhost:3434/wsdl';

// Construct the SOAP request message as an XML document
const soapRequest = `
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:example-com:myservice">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:MyFunctionRequest>
         <urn:a>10</urn:a>
         <urn:b>5</urn:b>
      </urn:MyFunctionRequest>
   </soapenv:Body>
</soapenv:Envelope>
`;

// Set the headers and content-type for the HTTP request
const headers = {'Content-Type': 'application/soap+xml'};

// Send the SOAP request to the server
axios.post(url, soapRequest, {headers})
  .then(response => {
    // Extract the SOAP response from the HTTP response
    const soapResponse = response.data;
    console.log(soapResponse);

    // Parse the SOAP response to extract relevant information
    // ...
  })
  .catch(error => {
    console.error('Error:', error.message);
  });
