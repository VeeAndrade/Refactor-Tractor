const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';

let user, data;

beforeEach(() => {
  data =
    {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [16, 4, 8]
    };
  user = new User(data);
});

describe('User', () => {

  it('should be a function', () => {
    expect(User).to.be.a('function');
  });

  it('should be an instance of User', () => {
    expect(user).to.be.an.instanceOf(User);
  });

  it('should hold on to the user properties from the data file', () => {
    expect(user.id).to.equal(1);
    expect(user.name).to.equal('Luisa Hane');
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
    expect(user.strideLength).to.equal(4.3);
    expect(user.dailyStepGoal).to.equal(10000);
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it('should return the first name', () => {
    expect(user.getFirstName()).to.equal('Luisa');
  });

});