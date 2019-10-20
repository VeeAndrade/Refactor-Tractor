const chai = require('chai');
const expect = chai.expect;

import User from '../src/User';
import ActivityRepository from '../src/ActivityRepository';


let activityRepository, activityData, user, sampleData;

beforeEach(() => {
  activityData =
    [
      { "userID": 13, "date": "2019/08/18", "numSteps": 1242, "minutesActive": 64, "flightsOfStairs": 16 },
      { "userID": 13, "date": "2019/08/19", "numSteps": 3425, "minutesActive": 112, "flightsOfStairs": 4 },
      { "userID": 13, "date": "2019/08/20", "numSteps": 5321, "minutesActive": 140, "flightsOfStairs": 174 },
      { "userID": 13, "date": "2019/08/21", "numSteps": 12, "minutesActive": 846, "flightsOfStairs": 24 },
      { "userID": 13, "date": "2019/08/22", "numSteps": 3455, "minutesActive": 836, "flightsOfStairs": 18 },
      { "userID": 13, "date": "2019/08/23", "numSteps": 5321, "minutesActive": 134, "flightsOfStairs": 85 },
      { "userID": 13, "date": "2019/08/24", "numSteps": 2948, "minutesActive": 456, "flightsOfStairs": 162 },
      { "userID": 13, "date": "2019/08/25", "numSteps": 9352, "minutesActive": 567, "flightsOfStairs": 143 },
      { "userID": 2, "date": "2019/06/15", "numSteps": 1112, "minutesActive": 875, "flightsOfStairs": 16 },
      { "userID": 2, "date": "2019/06/16", "numSteps": 3253, "minutesActive": 174, "flightsOfStairs": 52 },
      { "userID": 5, "date": "2019/08/25", "numSteps": 6425, "minutesActive": 67, "flightsOfStairs": 42 },
      { "userID": 6, "date": "2019/08/25", "numSteps": 842, "minutesActive": 43, "flightsOfStairs": 86 },
    ];

  sampleData = {
    "id": 13,
    "name": "Tom Schmeler",
    "address": "1524 Clemmie River, Newtonbury RI 02849-3159",
    "email": "Leopoldo.Sauer@gmail.com",
    "strideLength": 3.2,
    "dailyStepGoal": 4000,
    "friends": [33, 14, 3, 43, 35]
  };

  user = new User(sampleData);
  activityRepository = new ActivityRepository(13, activityData);
});

describe('ActivityRepository', () => {

  it('should be a function', () => {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of ActivityRepository', () => {
    expect(activityRepository).to.be.an.instanceOf(ActivityRepository);
  });

  it('should get the user logs by id', () => {
    expect(activityRepository.getUserLogs(13)).to.deep.equal([
      { "userID": 13, "date": "2019/08/18", "numSteps": 1242, "minutesActive": 64, "flightsOfStairs": 16 },
      { "userID": 13, "date": "2019/08/19", "numSteps": 3425, "minutesActive": 112, "flightsOfStairs": 4 },
      { "userID": 13, "date": "2019/08/20", "numSteps": 5321, "minutesActive": 140, "flightsOfStairs": 174 },
      { "userID": 13, "date": "2019/08/21", "numSteps": 12, "minutesActive": 846, "flightsOfStairs": 24 },
      { "userID": 13, "date": "2019/08/22", "numSteps": 3455, "minutesActive": 836, "flightsOfStairs": 18 },
      { "userID": 13, "date": "2019/08/23", "numSteps": 5321, "minutesActive": 134, "flightsOfStairs": 85 },
      { "userID": 13, "date": "2019/08/24", "numSteps": 2948, "minutesActive": 456, "flightsOfStairs": 162 },
      { "userID": 13, "date": "2019/08/25", "numSteps": 9352, "minutesActive": 567, "flightsOfStairs": 143 }
    ]);
  });

  it('should get the user"s data based on a date', () => {
    expect(activityRepository.getUserDate('2019/08/21')).to.deep.equal(
      { "userID": 13, "date": "2019/08/21", "numSteps": 12, "minutesActive": 846, "flightsOfStairs": 24 }
    );
  });

  it('should get the data of all users on a specific date', () => {
    expect(activityRepository.getFilteredDate('2019/08/25')).to.deep.equal(
      [
        { "userID": 13, "date": "2019/08/25", "numSteps": 9352, "minutesActive": 567, "flightsOfStairs": 143 },
        { "userID": 5, "date": "2019/08/25", "numSteps": 6425, "minutesActive": 67, "flightsOfStairs": 42 },
        { "userID": 6, "date": "2019/08/25", "numSteps": 842, "minutesActive": 43, "flightsOfStairs": 86 }
      ]
    );
  });

  it('should return miles user has walked from their number of steps and stride length', () => {
    expect(activityRepository.getMilesWalked('2019/08/25', user)).to.equal(5.7);
  });

  it('should return how many minutes the user was active for a given day', () => {
    expect(activityRepository.getMinutesActive('2019/08/24')).to.equal(456);
  });

  it('should return how many minutes active the user averaged for the week', () => {
    expect(activityRepository.getAverageActivity('2019/08/24')).to.equal(370);
  });

  it('should return whether a user met their daily step goal for a given date', () => {
    expect(activityRepository.reachedDailyStepGoal('2019/08/24', sampleData)).to.equal(false);
  });

  it('should return the days where the user exceeded their step goal', () => {
    expect(activityRepository.getAllTimeExceededSteps(sampleData)).to.deep.equal(
      [
        { "date": "2019/08/20", "numSteps": 5321 },
        { "date": "2019/08/23", "numSteps": 5321 },
        { "date": "2019/08/25", "numSteps": 9352 },
      ]);
  });

  it('should return the user"s all-time stair climbing record', () => {
    expect(activityRepository.getAllTimeStairClimb()).to.deep.equal(
      { "date": "2019/08/20", "flightsOfStairs": 174 }
    );
  });

  it('should return the average number of stairs climbed for all users on a given date', () => {
    expect(activityRepository.getAverageStairsDay('2019/08/25')).to.equal(90);
  });

  it('should return the average number of steps taken for all users on a given date', () => {
    expect(activityRepository.getAverageStepsDay('2019/08/25')).to.equal(5540);
  });

  it('should return the average number of minutes active for all users on a given date', () => {
    expect(activityRepository.getAvergageMinutesActive('2019/08/25')).to.equal(226);
  });

  it('should return the number of kilometers a user walked in a given date', () => {
    expect(activityRepository.getKilometersWalked('2019/08/25', user)).to.equal(9.2);
  });

  it('should return the number of daily steps', () => {
    expect(activityRepository.getDailyStats('2019/08/25', 'numSteps')).to.equal(9352);
  });

  it('should return the user"s weekly stats', () => {
    expect(activityRepository.getWeeklyStats('2019/08/25')).to.deep.equal(
      [
        { "userID": 13, "date": "2019/08/19", "numSteps": 3425, "minutesActive": 112, "flightsOfStairs": 4 },
        { "userID": 13, "date": "2019/08/20", "numSteps": 5321, "minutesActive": 140, "flightsOfStairs": 174 },
        { "userID": 13, "date": "2019/08/21", "numSteps": 12, "minutesActive": 846, "flightsOfStairs": 24 },
        { "userID": 13, "date": "2019/08/22", "numSteps": 3455, "minutesActive": 836, "flightsOfStairs": 18 },
        { "userID": 13, "date": "2019/08/23", "numSteps": 5321, "minutesActive": 134, "flightsOfStairs": 85 },
        { "userID": 13, "date": "2019/08/24", "numSteps": 2948, "minutesActive": 456, "flightsOfStairs": 162 },
        { "userID": 13, "date": "2019/08/25", "numSteps": 9352, "minutesActive": 567, "flightsOfStairs": 143 },
      ]);
  });

  it('should return the positive trend dates', () => {
    expect(activityRepository.getStepTrends(true)).to.deep.equal(['2019/08/20', '2019/08/23']);
  });

  it('should return the negative trend dates', () => {
    expect(activityRepository.getStepTrends(false)).to.deep.equal([]);
  });
});