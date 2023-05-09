const request = require('supertest');

request('https:localhost:3000')
  .post('/api/sessions')
  .end(function(err, res) {
        if (err) throw err;
        console.log(res.body);
  });