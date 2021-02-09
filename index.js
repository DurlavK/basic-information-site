var http = require('http');
var fs = require('fs');
var path = require('path');

http.createServer(function (req, res) {

  let filePath = path.join(
  __dirname, 
  'pages', 
  req.url === '/' ? 'index.html' : req.url+'.html'
  );
  
  fs.readFile(filePath, (err,content)=> {
    if(err) {
      if(err.code == 'ENOENT') {
        //page not found
        fs.readFile(path.join(__dirname,'pages','404.html'),(err,content)=>{
          res.writeHead(200, {'Content-Type': 'text/html'});
          res.end(content, 'utf8');
        })
      }else {
        // server error
        res.writeHead(500);
        res.end(`server error ${err.code}`)
      }
    }else {
      //success
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.end(content, 'utf8');
    }
  });
  // if(req.url === '/') {
  //   fs.readFile(path.join(__dirname,'pages','index.html'),(err,content)=>{
  //     if(err) throw err;
  //     res.writeHead(200,{'Content-Type':'text/html'})
  //     res.end(content);
  //   })
  // }
  // else if(req.url === '/about') {
  //   fs.readFile(path.join(__dirname,'pages','about.html'),(err,content)=>{
  //     if(err) throw err;
  //     res.writeHead(200,{'Content-Type':'text/html'})
  //     res.end(content);
  //   })
  // }
  // else if(req.url === '/contact') {
  //   fs.readFile(path.join(__dirname,'pages','contact.html'),(err,content)=>{
  //     if(err) throw err;
  //     res.writeHead(200,{'Content-Type':'text/html'})
  //     res.end(content);
  //   })
  // }
  // else {
  //   fs.readFile(path.join(__dirname,'pages','404.html'),(err,content)=>{
  //     if(err) throw err;
  //     res.writeHead(200,{'Content-Type':'text/html'})
  //     res.end(content);
  //   })
  // }
}).listen(8080);