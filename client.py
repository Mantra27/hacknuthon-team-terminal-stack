import requests

# Set the URL for the SOAP server
url = 'http://localhost:8000/hello'

# Construct the SOAP request message as an XML document
soap_request = '''
<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:example-com:myservice">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:MyFunctionRequest>
         <urn:a>10</urn:a>
         <urn:b>5</urn:b>
      </urn:MyFunctionRequest>
   </soapenv:Body>
</soapenv:Envelope>
'''

# Set the headers and content-type for the HTTP request
headers = {'Content-Type': 'application/soap+xml'}

# Send the SOAP request to the server
response = requests.post(url, data=soap_request, headers=headers)

# Extract the SOAP response from the HTTP response
soap_response = response.content
print(soap_response)
# Parse the SOAP response to extract relevant information
# ...
