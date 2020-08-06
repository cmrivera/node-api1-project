const http = require("http");

//use request(req) to get info about incoming http request
//use response(res) to set info on outgoing http response
const server = http.createServer((req, res) => {
  res.statusCode = 200;

  //send client what type of data we are sending back to them
  res.setheader("Content-Type", "text/html");

  //send actual data back
  res.write("<h1>Server is displaying</h1>");

  //finalize the response and send it off into the internet
  res.end();
});
server.listen(8080, () => {
  console.log("server is started on port 8080");
});
