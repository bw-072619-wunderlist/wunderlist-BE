import db from '../../data/dbConfig';
import server from '../server';
import request from 'supertest';

beforeAll(async () => {
  await db('shares').truncate();
  await db('histories').truncate();
  await db('tasks').truncate();
  await db.raw('truncate todos cascade');
});

beforeAll(async () => {
  await db.raw('truncate users cascade');
});

let token = '';

describe('todos', () => {
  it('', () => {
    return request(server)
      .post('/api/v2/auths/register')
      .send({ username: 'ene', email: 'ene@abc.co', password: '1234' })
      .then(res => {
        
      });
  });
  it('', () => {

    return request(server)
      .post('/api/v2/auths/login')
      .send({ email: 'ene@abc.co', password: '1234' })
      .then(res => {
        token = res.body.token;
      });
  });

  it('[POST] /todos (title missing)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({ title: '' })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'Missing required title field'
      });
    });
  });
  it('[POST] /todos (description missing)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      description: '   '
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'description field cannot be empty'
      });
    });
  });
  it('[POST] /todos (invalid completed)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      completed: 34
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'completed field can only hold boolean value'
      });
    });
  });
  it('[POST] /todos (invalid deleted)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      deleted: 34
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'deleted field can only hold boolean value'
      });
    });
  });
  it('[POST] /todos (invalid scheduled_at)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      scheduled_at: 34
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'Invalid value for scheduled_at field'
      });
    });
  });
  it('[POST] /todos (invalid repeat)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      repeat: '34'
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'Invalid value for repeat field'
      });
    });
  });
  it('[POST] /todos (invalid tasks)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      tasks: 34
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'tasks field cannot be empty list'
      });
    });
  });
  it('[POST] /todos (name missing)', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title',
      tasks: [{
        name: ''
      }]
    })
    .set('Authorization', `${token}`)
    .expect(400)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toEqual({
        message: 'Missing required task name field'
      });
    });
  });
  it('[POST] /todos WORKS', () => {
    return request(server)
    .post('/api/v2/todos')
    .send({
      title: 'title'
    })
    .set('Authorization', `${token}`)
    .expect(201)
    .then(res => {
      expect(res.body).toBeInstanceOf(Object);
    });
  });
  it('[GET] /todos WORKS', () => {
    return request(server)
    .get('/api/v2/todos')
    .set('Authorization', `${token}`)
    .expect(200)
    .then(res => {
      expect(res.body).toBeInstanceOf(Array);
    });
  });

});
