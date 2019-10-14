const chai = require('chai');
const expect = chai.expect;

import UserRepository from '../src/UserRepository';

let userRepository, data;

beforeEach(() => {
  data = [
    {
      "id": 1,
      "name": "Luisa Hane",
      "address": "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      "email": "Diana.Hayes1@hotmail.com",
      "strideLength": 4.3,
      "dailyStepGoal": 10000,
      "friends": [
        16,
        4,
        8
      ]
    },
    {
      "id": 2,
      "name": "Jarvis Considine",
      "address": "30086 Kathryn Port, Ciceroland NE 07273",
      "email": "Dimitri.Bechtelar11@gmail.com",
      "strideLength": 4.5,
      "dailyStepGoal": 3000,
      "friends": [
        9,
        18,
        24,
        19
      ]
    },
    {
      "id": 3,
      "name": "Herminia Witting",
      "address": "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      "email": "Elwin.Tromp@yahoo.com",
      "strideLength": 4.4,
      "dailyStepGoal": 5000,
      "friends": [
        19,
        11,
        42,
        33
      ]
    }];
  userRepository = new UserRepository(data, 3);
});

describe('UserRepository', () => {

  it('should be a function', () => {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of UserRepository', () => {
    expect(userRepository).to.be.an.instanceOf(UserRepository);
  });

  it('should return user data upon ID', () => {
    expect(userRepository.getUserData()).to.deep.equal(data[2]);
  });

  it('should return the average step count goal of all users', () => {
    expect(userRepository.getAvgStep()).to.equal(6000);
  });

});