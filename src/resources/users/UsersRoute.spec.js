import db from '../../data/dbConfig';
import server from '../server';
import request from 'supertest';

beforeAll(async () => {
  await db.raw('truncate users cascade');
});

let token = '';

describe('auths', () => {
  it('[POST] /auths/register (username missing)!', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ email: 'eneh@abc.co', password: '1234' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Missing required username field'
        });
      });
  });
  it('[POST] /auths/register (email missing)!', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ username: 'eneh', password: '1234' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Missing required email field'
        });
      });
  });
  it('[POST] /auths/register (invalid email)!', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ username: 'eneh', email: 'eneh', password: '1234' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Invalid value for email field'
        });
      });
  });
  it('[POST] /auths/register (password missing)!', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ username: 'eneh', email: 'eneh@abc.co', password: '' })
      .expect(400)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Missing required password field'
        });
      });
  });
  it('[POST] /auths/register WORKS!', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ username: 'eneh', email: 'eneh@abc.co', password: '1234' })
      .expect(201)
      .expect('Content-Type', /json/)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body.username).toEqual('eneh');
      });
  });

  it('[POST] /auths/login WORKS', () => {

    return request(server)
      .post('/api/v2/auths/login')
      .send({ email: 'eneh@abc.co', password: '1234' })
      .expect(200)
      .then(res => {
        token = res.body.token;
        expect(res.body).toBeInstanceOf(Object);
      });
  });

  it('[PUT] /auths/reset (invalid email)', () => {

    return request(server)
      .put('/api/v2/auths/reset')
      .send({ email: 'eneh@ab.co', password: '1234' })
      .expect(400)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Invalid credentials'
        });
      });
  });
  it('[PUT] /auths/reset (invalid password)', () => {

    return request(server)
      .put('/api/v2/auths/reset')
      .send({ email: 'eneh@abc.co', password: '12' })
      .expect(400)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
        expect(res.body).toEqual({
          message: 'Invalid credentials'
        });
      });
  });
  it('[PUT] /auths/reset WORKS', () => {

    return request(server)
      .put('/api/v2/auths/reset')
      .send({ email: 'eneh@abc.co', password: '1234' })
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });

});

describe('users', () => {
  it('[PUT] /users WORKS', () => {
      return request(server)
      .put('/api/v2/users')
      .send({ username: 'james' })
      .set('Authorization', `${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
  it('[GET] /users WORKS', () => {
      return request(server)
      .get('/api/v2/users')
      .set('Authorization', `${token}`)
      .expect(200)
      .then(res => {
        expect(res.body).toBeInstanceOf(Object);
      });
  });
});
