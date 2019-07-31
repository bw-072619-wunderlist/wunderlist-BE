import db from '../data/dbConfig';
import server from './server';
import request from 'supertest';

beforeAll(async () => {
  await db('shares').truncate();
  await db('histories').truncate();
  await db('tasks').truncate();
  await db.raw('truncate todos cascade');
  await db.raw('truncate users cascade');
});

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

});
