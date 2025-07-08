// server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('./db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

// Add delay middleware (2 seconds)
server.use((req, res, next) => {
  setTimeout(() => {
    next();
  }, 2000);
});

// Add custom middleware for CORS
server.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Allow any origin
  res.header(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, DELETE, PATCH, OPTIONS'
  );
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

server.use('/api', router);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`JSON Server is running on port ${port}`);
});
