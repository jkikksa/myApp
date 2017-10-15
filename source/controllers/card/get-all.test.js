const supertest = require('supertest');
const app = require('../../app');
const server = app.listen(3005);
const request = supertest(server);

it('File-Model. GetAll.', () => {
  request.get('/cards')
      .expect('Content-Type', /json/)
      .then((response) => {
        expect(response.body[0]).toHaveProperty('id', 1);
      });
});
