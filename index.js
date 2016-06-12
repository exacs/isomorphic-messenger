const server = require('./server-es5').default;

const PORT = process.env.PORT || 3000;

server.listen(PORT, function() {
  console.log('Server listening from port', PORT);
});
