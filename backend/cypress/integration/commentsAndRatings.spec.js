describe('E2E Tests for Comments and Ratings', () => {
  let planId;
  let userId;

  before(() => {
    // Create a user and a plan for testing
    cy.request('POST', 'http://localhost:8000/users', {
      email: 'e2euser@example.com',
      name: 'E2E User'
    }).then((userResponse) => {
      userId = userResponse.body.id;

      cy.request('POST', 'http://localhost:8000/groups', {
        name: 'E2E Test Group',
        description: 'A group for E2E testing'
      }).then((groupResponse) => {
        const groupId = groupResponse.body.id;

        cy.request('POST', `http://localhost:8000/groups/${groupId}/plans`, {
          title: 'E2E Test Plan',
          description: 'A test plan for E2E',
          createdById: userId
        }).then((planResponse) => {
          planId = planResponse.body.id;
        });
      });
    });
  });

  it('should add a comment to a plan', () => {
    cy.request('POST', `http://localhost:8000/plans/${planId}/comments`, {
      userId,
      content: 'This is an E2E test comment'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('content', 'This is an E2E test comment');
    });
  });

  it('should fetch comments for a plan', () => {
    cy.request(`http://localhost:8000/plans/${planId}/comments`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body[0]).to.have.property('content', 'This is an E2E test comment');
    });
  });

  it('should add a rating to a plan', () => {
    cy.request('POST', `http://localhost:8000/plans/${planId}/ratings`, {
      userId,
      rating: 4
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('rating', 4);
    });
  });

  it('should fetch the average rating for a plan', () => {
    cy.request(`http://localhost:8000/plans/${planId}/ratings/average`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('rating', 4);
    });
  });
});