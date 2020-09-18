const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);
describe('test function', () => {
  // test stuff
  it('test endpoint get', async done => {
    // Sends GET Request to /all endpoint
    const res = await request.get('/all');
    expect(res.status).toBe(200);
    done();
  });
  it('test endpoint post', async done => {
    // Sends post Request to /addTripInfo endpoint
    const res = await request.post('/addTripInfo');
    expect(res.status).toBe(200);
    done();
  });
});
