# serverURLMonitor
Monitor URLS
RESTful API server that allows authenticated users to monitor URLs,
and get detailed uptime reports about their availability, average response time, and total uptime/downtime.

1-Signup with email verification.

2-CRUD operations for URL checks (GET, PUT and DELETE can be called only by the user user who created the check)

3-Authenticated users can receive a notification whenever one of their URLs goes down or up again using:

    -email
    
    -puchover
    
4-Authenticated users can get detailed uptime reports about their URLs availability, average response time, and total uptime/downtime.

5-API documentation:

    https://documenter.getpostman.com/view/10918316/2s935oLitC
    
6-Docker:
to build an image:
    
```bash
docker build [project path] -t monitorserver:latest
``` 
to run the Container:

```bash
docker run -d --name server -p 3000:3000 monitorserver
```
7-Unit tests:
    to run the unit test:
```bash
npm test
```

- Each URL check may have the following options:
  - `name`: The name of the check.
  - `url`: The URL to be monitored.
  - `protocol`: The resource protocol name `HTTP`, `HTTPS`, or `TCP`.
  - `path`: A specific path to be monitored *(optional)*.
  - `port`: The server port number *(optional)*.
  - `webhook`: A webhook URL to receive a notification on *(optional)*.
  - `timeout` *(defaults to 5 seconds)*: The timeout of the polling request *(optional)*.
  - `interval` *(defaults to 10 minutes)*: The time interval for polling requests *(optional)*.
  - `threshold` *(defaults to 1 failure)*: The threshold of failed requests that will create an alert *(optional)*.
  - `authentication`: An HTTP authentication header, with the Basic scheme, to be sent with the polling request *(optional)*.
    - `authentication.username`
    - `authentication.password`
  - `httpHeaders`: A list of key/value pairs custom HTTP headers to be sent with the polling request (optional).
  - `assert`: The response assertion to be used on the polling response (optional).
    - `assert.statusCode`: An HTTP status code to be asserted.
  - `tags`: A list of the check tags (optional).
  - `ignoreSSL`: A flag to ignore broken/expired SSL certificates in case of using the HTTPS protocol.
- Each report may have the following information:
  - `status`: The current status of the URL.
  - `availability`: A percentage of the URL availability.
  - `outages`: The total number of URL downtimes.
  - `downtime`: The total time, in seconds, of the URL downtime.
  - `uptime`: The total time, in seconds, of the URL uptime.
  - `responseTime`: The average response time for the URL.
  - `history`: Timestamped logs of the polling requests.
