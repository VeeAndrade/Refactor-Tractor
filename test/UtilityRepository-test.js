const chai = require('chai');
const expect = chai.expect;

import UtilityRepository from '../src/UtilityRepository';

let dataSleep, dataActivity, dataUser, utilityRepo;

beforeEach(() => {
  dataSleep = 
    [
      { userID: 44, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
      { userID: 44, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
      { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
      { userID: 46, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 1.5 },
      { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
      { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
    ];

  utilityRepo = new UtilityRepository([], [], [], [])
})

describe('UtilityRepository', () => {
  it('should be a function', () => {
    expect(UtilityRepository).to.be.a('function');
  });

  it('should be able to filter the user data by ID', () => {
    expect(utilityRepo.getUserLogs(44, 'sleepData')).to.deep.equal(
      [
        { userID: 44, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 44, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 }
      ]
    )
  })

  it('should be able to get the data for a specific user at a specific date', () => {
    expect(utilityRepo.getUserInfoByDate(45, "2019/08/20", 'sleepData')).to.deep.equal(
      { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 }
    )
  })

  it('should get a weeks data for a user', () => {
    expect(utilityRepo.getWeeksData(45, "2019/08/24", 'sleepData')).to.deep.equal(
      [
        { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
        { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
        { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
        { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
        { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
      ]
    )
  })

  it('should give the sum (total) of a specific property on a datatype for a unique user', () => {
    expect(utilityRepo.getTotal(44, 'sleepData', 'hoursSlept')).to.deep.equal(
      { total: 16.8, userInfo: [
        { userID: 44, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 44, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 }
      ]}
    )
  })

  it('should give the average from a data type property for a specific user', () => {
    expect(utilityRepo.getAverage(44, 'sleepData', 'hoursSlept')).to.deep.equal(8.4);
  })
})