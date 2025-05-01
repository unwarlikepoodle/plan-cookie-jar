describe('API Endpoints', () => {
  it('should create a new user and fetch it', () => {
    cy.request('POST', 'http://localhost:8000/users', {
      email: 'e2e@example.com',
      name: 'E2E User'
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('id');

      const userId = response.body.id;

      cy.request(`http://localhost:8000/users/${userId}`).then((getUserResponse) => {
        expect(getUserResponse.status).to.eq(200);
        expect(getUserResponse.body).to.have.property('email', 'e2e@example.com');
      });
    });
  });

  it('should create a group and allow a user to join it', () => {
    cy.request('POST', 'http://localhost:8000/users', {
      email: 'groupuser@example.com',
      name: 'Group User'
    }).then((userResponse) => {
      const userId = userResponse.body.id;

      cy.request('POST', 'http://localhost:8000/groups', {
        name: 'E2E Test Group',
        description: 'A group for E2E testing'
      }).then((groupResponse) => {
        const groupId = groupResponse.body.id;

        cy.request('POST', `http://localhost:8000/users/${userId}/groups/${groupId}`).then((membershipResponse) => {
          expect(membershipResponse.status).to.eq(201);
          expect(membershipResponse.body).to.have.property('userId', userId);
          expect(membershipResponse.body).to.have.property('groupId', groupId);
        });
      });
    });
  });
});