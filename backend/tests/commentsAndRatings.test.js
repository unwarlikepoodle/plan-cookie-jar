const request = require('supertest');
const app = require('../main'); // Assuming main.js exports the Express app

describe('Comments and Ratings Routes', () => {
  let planId;
  let userId;

  beforeAll(async () => {
    // Create a user and a plan for testing
    const userResponse = await request(app)
      .post('/users')
      .send({ email: 'testuser@example.com', name: 'Test User' });
    userId = userResponse.body.id;

    const groupResponse = await request(app)
      .post('/groups')
      .send({ name: 'Test Group', description: 'A test group' });
    const groupId = groupResponse.body.id;

    const planResponse = await request(app)
      .post(`/groups/${groupId}/plans`)
      .send({
        title: 'Test Plan',
        description: 'A test plan',
        createdById: userId,
      });
    planId = planResponse.body.id;
  });

  it('should add a comment to a plan', async () => {
    const response = await request(app)
      .post(`/plans/${planId}/comments`)
      .send({ userId, content: 'This is a test comment' });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.content).toBe('This is a test comment');
  });

  it('should fetch comments for a plan', async () => {
    const response = await request(app).get(`/plans/${planId}/comments`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body[0]).toHaveProperty('content', 'This is a test comment');
  });

  it('should add a rating to a plan', async () => {
    const response = await request(app)
      .post(`/plans/${planId}/ratings`)
      .send({ userId, rating: 5 });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('rating', 5);
  });

  it('should fetch the average rating for a plan', async () => {
    const response = await request(app).get(`/plans/${planId}/ratings/average`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('rating', 5);
  });
});