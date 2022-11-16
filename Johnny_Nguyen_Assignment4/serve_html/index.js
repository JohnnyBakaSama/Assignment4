const http = require('http')
const httpStatus = require("http-status-codes");
const port = 3000
const fs = require('fs');
const { receiveMessageOnPort } = require('worker_threads');
const d = new Date();
const app = http.createServer();
const routeResponseMap = {
   "/index.html" : "views/index.html",
   "/Books.html" : "views/Books.html",
   "/book1.jpg" : "public/images/book1.jpg",
   "/book2.jpg": "public/images/book2.jpg",
   "/book3.jpg" : "public/images/book3.jpg",
   "/bookpage1.html" :  "views//bookpage1.html",
   "/bookpage2.html" : "views/bookpage2.html",
   "/bookpage3.html" : "views/bookpage3.html",
   "/contact.html" : "views/contact.html",
   "/Honestypage.html" : "views//Honestypage.html",
   "/survey.html" : "views/survey.html",
   "/thankyou.html" : "views/thankyou.html",
   "/error" : "pagenotfound" 
}; 

app.on("request", (req, res) => {
  console.log('Received an incoming request...' + routeResponseMap[req.url] + d);
  res.writeHead(httpStatus.StatusCodes.OK, {
    "Content-Type": "text/html",
  });

  if (routeResponseMap[req.url]) 
  {
    fs.readFile(routeResponseMap[req.url], (error, data) => {
      res.write(data);
      res.end();
    });
  }

  else 
  {
    console.log('Error:', routeResponseMap[req.url],d)
    res.end(routeResponseMap["/error"]);

  }
});


app.listen(port);
console.log('The server has started and is listening on port number:$',{port});
