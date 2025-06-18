# gemini-flash-api
This is a practice repository for learning Gemini AI, initiated with model 2.5 Flash

## Prerequesite
- Node JS version 18+ (this repo is using 22.16.0)
- GEMINI API KEY (refer to document reference below)
- Document references:
  - [Gemini API Docs](https://ai.google.dev/gemini-api/docs)
  - [Building a Basic API with Node.js and Gemini AI](https://medium.com/google-developer-group-canberra/add-gemini-to-your-next-web-project-a53fe4679951#id_token=eyJhbGciOiJSUzI1NiIsImtpZCI6IjFiYjc3NGJkODcyOWVhMzhlOWMyZmUwYzY0ZDJjYTk0OGJmNjZmMGYiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIyMTYyOTYwMzU4MzQtazFrNnFlMDYwczJ0cDJhMmphbTRsamRjbXMwMHN0dGcuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTIzNTg0MjkzMDcyODY1NjU3NDAiLCJlbWFpbCI6ImRpbWFzZGF5OTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5iZiI6MTc1MDI0NjM5MSwibmFtZSI6IkRpbWFzIERheSIsInBpY3R1cmUiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQ2c4b2NMR28waHhXdFlDX3hUSEFab2RicGlkWi1oMXNZeUV1RnY2NXlhMktLeEQzRThTM3I2Sj1zOTYtYyIsImdpdmVuX25hbWUiOiJEaW1hcyIsImZhbWlseV9uYW1lIjoiRGF5IiwiaWF0IjoxNzUwMjQ2NjkxLCJleHAiOjE3NTAyNTAyOTEsImp0aSI6IjYzMTY3NWFhYTk0ZGVjOWJjZTZhNTRmOGMxMzY4OWI5OWYyZTZhYjIifQ.h71885lSB3zfEeeKT4l76k7ZfZvqy33Dn6PjsG21xj9mU7ygHuaisj6OsTDCfssbQnMI2EXYkq3TAbVpYPxpewPCMJalfs0LB2iBjewg5-D8eGanq6-Mmgt3mk11i9kPDhgOJ4pKCxhvs_LzNyGBUQ0BzYcCG1HHILsf8Zz7FXysqBfv4MB9t2q2NCTJAezH0csgZwcrsOSA4e9lfQ6XZgv_x7a9SuhjiL6aMyQvU4nKIUazhLQUq6TM7azGweZaFU0OEnm9XbXaF8m661aoO2n3WC6JhOCH1yEs-HBL_ysm2xipHPltzSXtayGKpukN3nkArqXrOw9mrsOnBVrfzA)
  - [Add Gemini to your Node.js Project](https://medium.com/@yousafmaaz.kakakhel/building-a-basic-api-with-node-js-and-gemini-ai-1ed6571be3e6)
  - [Google Gemini with NodeJS](https://rishavd3v.hashnode.dev/google-gemini-with-nodejs)
- Postman for testing API (can use alternative like Thunder Client or REST Client in VS Code extensions)

## Setup Parameter in Gemini configuration
| Parameter   |  Purpose                                              | Value range |
|:------------|:------------------------------------------------------|:----------: |
| temperature | Controls randomness in output. Higher = more creative | 0.0 - 2.0   |
| top_k       | Limits responses to top-K likely tokens               | 1 - 40      |
| top_p       | Uses nucleus sampling to limit randomness             | 0.0 - 1.0   |

### Why is this important?
Imagine your AI have differente "personalities":
- For **creative writinge**, you might want the **temperature: 0.9**.
- For **factual Q&A**, a lower value like **temperature: 0.2** ensures precision.

### Endpoints available
``` generate-text
/generate-text
method: POST
body: {
  "prompt": <string>
} (body in JSON)
```
``` generate-from-image
/generate-from-image
method: POST
body: {
  "prompt": <string>
  "image": <File>
} (body in form-data)
```
``` generate-from-document
/generate-from-document
method: POST
body: {
  "prompt": <string>
  "document": <File>
} (body in form-data)
```
``` generate-from-audio
/generate-from-audio
method: POST
body: {
  "prompt": <string>
  "audio": <File>
} (body in form-data)
```
