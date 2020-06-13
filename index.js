var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

app.post('/nginxconf_changed', function(req, res) {
  const exec = require('child_process').exec ;
  const oAnsibleScript = exec('cd ansible-scripts && sh updateNGINXConf.sh');
  oAnsibleScript.stdout.on('data', (data)=>{
    console.log(data); 
  });
  oAnsibleScript.stderr.on('data', (data)=>{
    console.error(data);
  });
  res.send("");
});

server.listen(3000, 'localhost');
server.on('listening', function() {
    console.log('Express server started on port %s at %s', server.address().port, server.address().address);
});

