const request = require('supertest');
const app = require('../main'); // Assuming main.js exports the Express app

describe('User Routes', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({ email: 'test@example.com', name: 'Test User' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('test@example.com');
  });

  it('should fetch a user by ID', async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({ email: 'fetch@example.com', name: 'Fetch User' });

    const userId = userResponse.body.id;

    const response = await request(app).get(`/users/${userId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('id', userId);
    expect(response.body.email).toBe('fetch@example.com');
  });
});

describe('Group Routes', () => {
  it('should fetch all groups', async () => {
    const response = await request(app).get('/groups');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should allow a user to join a group', async () => {
    const userResponse = await request(app)
      .post('/users')
      .send({ email: 'join@example.com', name: 'Join User' });

    const groupResponse = await request(app)
      .post('/groups')
      .send({ name: 'Test Group', description: 'A test group' });

    const response = await request(app)
      .post(`/users/${userResponse.body.id}/groups/${groupResponse.body.id}`);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('userId', userResponse.body.id);
    expect(response.body).toHaveProperty('groupId', groupResponse.body.id);
  });
});