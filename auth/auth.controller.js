const users = require('./users.json');
const jwt = require('jsonwebtoken');


module.exports = (ctx) => {
  console.log('try to connect 🔎');
  const { email, password } = ctx.request.body;

  // verif de email et password
  ctx.assert(email, 400, 'The user info is malformed!');
  ctx.assert(password, 400, 'The user info is malformed!');

  // verif si le user est dans le liste 
  const user = users.find(user => user.email === email && user.password === password)
  console.log('🐛: user', user)
  // creation du jwt
  if (user) {
    ctx.status = 200;
    console.log('creation du jwt 🔧');
    ctx.body = {
      token: jwt.sign(user, process.env.secretJWT),
      message: "Successfully logged in!"
    };
  } else {
    ctx.status = 401;
    ctx.body = {
      message: "Authentication failed"
    };
  }
};