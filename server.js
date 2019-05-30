const express = require('express');
const helmet = require('helmet');
const userRouter = require('./users/userRouter.js');
const postRouter = require('./posts/postRouter.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`${new Date().toISOString()} ${req.method} to ${req.url} ${req.get(
    'Origin'
    )}`
  );
  next();
};


function atGate(req, res, next) {
  console.log('At the gate, about to be eaten');
  next();
}
function auth(req, res, next) {
  if(req.url === '/mellon') {
    next()
  } else {
    res.send('You shall not pass')
  }
}

server.use(logger);
server.use(atGate);
server.use('/users', userRouter);
server.use('/posts', postRouter);

server.get('/mellon', auth, (req, res) => {
  console.log('gate opening');
  console.log('Inside and safe');
  res.send('welcome traveler')
})

module.exports = server;
