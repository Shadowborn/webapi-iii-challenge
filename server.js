const express = require('express');

const userRouter = require('./users/userRouter.js');

const server = express();

server.use(express.json());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});


server.use('/users', userRouter);

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} to ${req.url} ${req.get(
    'Origin'
    )}`
  );
};

server.use(logger);

module.exports = server;
