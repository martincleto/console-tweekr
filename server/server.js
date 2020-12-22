const path = require('path');
const jsonServer = require('json-server')
const server = jsonServer.create()
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const db = router.db;
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

const getLastId = route => db.get(route).last().value().id;

server.post('/posts', (req, res) => {
  res.send({
    ...req.body,
    id: getLastId('posts') + 1,
  });
});

server.use(router);
server.listen(5000, () => {
  console.log('JSON Server is running in port 5000');
});
