import chai, {expect} from 'chai';
import spies from 'chai-spies';

import SleepRepository from '../src/SleepRepository';
import UtilityRepository from '../src/UtilityRepository'

chai.use(spies);

describe('SleepRepository', () => {
  
  let dataSleep, dataSleep2, sleepRepository, sleepRepository2, utility;
  
  beforeEach(() => {
    dataSleep =
    [
      { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
      { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
      { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
      { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
      { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
      { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
    ];

    dataSleep2 =
    [
      { userID: 1, date: "2019/08/15", hoursSlept: 9.9, sleepQuality: 3.8 },
      { userID: 1, date: "2019/08/16", hoursSlept: 6.9, sleepQuality: 3.5 },
      { userID: 1, date: "2019/08/17", hoursSlept: 7.3, sleepQuality: 4.1 },
      { userID: 1, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 3.5 },
      { userID: 1, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 1, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 1, date: "2019/08/21", hoursSlept: 24, sleepQuality: 4.7 },
      { userID: 2, date: "2019/08/15", hoursSlept: 9.9, sleepQuality: 5.8 },
      { userID: 2, date: "2019/08/16", hoursSlept: 6.9, sleepQuality: 3.5 },
      { userID: 2, date: "2019/08/17", hoursSlept: 7.3, sleepQuality: 3.1 },
      { userID: 2, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 6.5 },
      { userID: 2, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 2, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 2, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 3.7 },
      { userID: 3, date: "2019/08/15", hoursSlept: 9.9, sleepQuality: 4.8 },
      { userID: 3, date: "2019/08/16", hoursSlept: 6.9, sleepQuality: 4.5 },
      { userID: 3, date: "2019/08/17", hoursSlept: 7.3, sleepQuality: 3.1 },
      { userID: 3, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 5.5 },
      { userID: 3, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
      { userID: 3, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
      { userID: 3, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 4.7 },
      { userID: 4, date: "2019/08/15", hoursSlept: 9.9, sleepQuality: 1.8 },
      { userID: 4, date: "2019/08/16", hoursSlept: 6.9, sleepQuality: 2.5 },
      { userID: 4, date: "2019/08/17", hoursSlept: 7.3, sleepQuality: 1.1 },
      { userID: 4, date: "2019/08/18", hoursSlept: 9.2, sleepQuality: 1.5 },
      { userID: 4, date: "2019/08/19", hoursSlept: 7, sleepQuality: 2.2 },
      { userID: 4, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 1.3 },
      { userID: 4, date: "2019/08/21", hoursSlept: 24, sleepQuality: 3.0 },
    ];

    sleepRepository = new SleepRepository(dataSleep, [], [], [], 45);
    sleepRepository2 = new SleepRepository(dataSleep2, [], [], [], 2);
    utility = new UtilityRepository([], dataSleep, [], []);

  });

  it('should be a function', () => {
    expect(SleepRepository).to.be.a('function');
  });

  it('should be an instance of SleepRepository', () => {
    expect(sleepRepository).to.be.an.instanceOf(SleepRepository);
  });

  it('should be able to filter the user"s data by ID', () => {
    expect(sleepRepository.getUserLogs(45, "sleepData")).to.deep.equal(
      [
        { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
        { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
        { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
        { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
        { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
        { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/23", hoursSlept: 10.9, sleepQuality: 2.3 },
        { userID: 45, date: "2019/08/24", hoursSlept: 8.3, sleepQuality: 1.5 }
      ]
    );
  });

  it('should return the user"s average number of hours slept per day', () => {
   chai.spy.on(sleepRepository, 'getTotal', () => {
     return {total:77, userInfo: dataSleep}
   })
    expect(sleepRepository.getAllTimeAvg()).to.equal(8.6);
  });

  it('should return the user"s average sleep quality per day over all time', () => {
    expect(sleepRepository.getQualitySleepAvg()).to.equal(2.9);
  });

  it('should return how many hours the user slept for a specific day', () => {
    expect(sleepRepository.getDailySleepHours('2019/08/22')).to.equal(8.5);
  });

  it('should return the user"s sleep data over the course of a given week', () => {
    expect(sleepRepository.weeklySleepData('2019/08/22')).to.deep.equal(
      [
        { userID: 45, date: "2019/08/16", hoursSlept: 9.9, sleepQuality: 2.8 },
        { userID: 45, date: "2019/08/17", hoursSlept: 6.9, sleepQuality: 4.5 },
        { userID: 45, date: "2019/08/18", hoursSlept: 7.3, sleepQuality: 2.1 },
        { userID: 45, date: "2019/08/19", hoursSlept: 7, sleepQuality: 4.2 },
        { userID: 45, date: "2019/08/20", hoursSlept: 10.4, sleepQuality: 4.3 },
        { userID: 45, date: "2019/08/21", hoursSlept: 7.8, sleepQuality: 1.7 },
        { userID: 45, date: "2019/08/22", hoursSlept: 8.5, sleepQuality: 2.3 },
      ]
    );
  });

  it('should return the number of hours slept each day over the course of a given week', () => {
    expect(sleepRepository.getWeeklyMetric('2019/08/22', 'hoursSlept')).to.deep.equal(
      [
        { date: "2019/08/16", hoursSlept: 9.9 },
        { date: "2019/08/17", hoursSlept: 6.9 },
        { date: "2019/08/18", hoursSlept: 7.3 },
        { date: "2019/08/19", hoursSlept: 7 },
        { date: "2019/08/20", hoursSlept: 10.4 },
        { date: "2019/08/21", hoursSlept: 7.8 },
        { date: "2019/08/22", hoursSlept: 8.5 }
      ]
    );
  });

  it('should return the sleep quality each day over the course of a given week', () => {
    expect(sleepRepository.getWeeklyMetric('2019/08/22', 'sleepQuality')).to.deep.equal(
      [
        { date: "2019/08/16", sleepQuality: 2.8 },
        { date: "2019/08/17", sleepQuality: 4.5 },
        { date: "2019/08/18", sleepQuality: 2.1 },
        { date: "2019/08/19", sleepQuality: 4.2 },
        { date: "2019/08/20", sleepQuality: 4.3 },
        { date: "2019/08/21", sleepQuality: 1.7 },
        { date: "2019/08/22", sleepQuality: 2.3 }
      ]
    );
  });

  it('should return the average sleep quality of all users', () => {
    expect(sleepRepository.getAvgQuality()).to.equal(2.9); 
  });

  it('should find all users who average a sleep quality greater than 3 for a given week', () => {
    expect(sleepRepository2.getBestSleepers('2019/08/21')).to.deep.equal(
      [
        { id: 1, avgQual: 4.0 },
        { id: 2, avgQual: 4.4 },
        { id: 3, avgQual: 4.4 }
      ]
    );
  });

  it('should return the users that slept the most in a given week', () => {
    expect(sleepRepository2.getMaxSleepers('2019/08/21')).to.deep.equal(
      [
        { userID: 1, date: "2019/08/21", hoursSlept: 24, sleepQuality: 4.7 },
        { userID: 4, date: "2019/08/21", hoursSlept: 24, sleepQuality: 3.0 }
      ]
    );
  });

  it('should return the the weekly average hours slept for one user', () => {
    expect(sleepRepository2.weeklyAvgHours('2019/08/21')).to.equal(8.4);
  });

});