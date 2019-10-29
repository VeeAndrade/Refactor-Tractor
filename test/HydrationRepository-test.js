import chai, { expect } from 'chai';
import spies from 'chai-spies';

import HydrationRepository from '../src/HydrationRepository';

chai.use(spies);

let dataHydration, hydrationRepository;

beforeEach(() => {
  dataHydration =
    [
      { userID: 12, date: "2019/08/15", numOunces: 71 },
      { userID: 12, date: "2019/08/16", numOunces: 37 },
      { userID: 12, date: "2019/08/17", numOunces: 97 },
      { userID: 14, date: "2019/08/17", numOunces: 62 },
      { userID: 12, date: "2019/08/18", numOunces: 62 },
      { userID: 12, date: "2019/08/19", numOunces: 77 },
      { userID: 12, date: "2019/08/20", numOunces: 76 },
      { userID: 12, date: "2019/08/21", numOunces: 85 },
      { userID: 12, date: "2019/08/22", numOunces: 58 }
    ];

  hydrationRepository = new HydrationRepository(dataHydration, 12, [], [], dataHydration, []);
});

describe('HydrationRepository', () => {
  it('should be a function', () => {
    expect(HydrationRepository).to.be.a('function');
  });

  it('should be an instance of HydrationRepository', () => {
    expect(hydrationRepository).to.be.an.instanceOf(HydrationRepository);
  });

  it('should be able to filter the user"s data by ID', () => {
    expect(hydrationRepository.getUserLogs(12, 'hydrationData')).to.deep.equal(
      [
        { userID: 12, date: "2019/08/15", numOunces: 71 },
        { userID: 12, date: "2019/08/16", numOunces: 37 },
        { userID: 12, date: "2019/08/17", numOunces: 97 },
        { userID: 12, date: "2019/08/18", numOunces: 62 },
        { userID: 12, date: "2019/08/19", numOunces: 77 },
        { userID: 12, date: "2019/08/20", numOunces: 76 },
        { userID: 12, date: "2019/08/21", numOunces: 85 },
        { userID: 12, date: "2019/08/22", numOunces: 58 }
      ]
    );
  });

  it('should return the average fluid oz consumed per day for all time', () => {
    expect(hydrationRepository.getAllTimeAvg()).to.equal(70);
  });

  it('should return how many fluid oz they consumed for a specific day', () => {
    chai.spy.on(hydrationRepository, 'getUserInfoByDate', () => {
      return { userID: 12, date: "2019/08/22", numOunces: 58 }
    })
    expect(hydrationRepository.totalOzDay(12, '2019/08/22', 'hydrationData')).to.equal(58);
  });

  it('should return fluid oz of water consumed each day over the course of a week', () => {
    expect(hydrationRepository.getWeeksData(12, '2019/08/22', 'hydrationData')).to.deep.equal(
      [
        { userID: 12, date: '2019/08/16', numOunces: 37 },
        { userID: 12, date: '2019/08/17', numOunces: 97 },
        { userID: 12, date: '2019/08/18', numOunces: 62 },
        { userID: 12, date: '2019/08/19', numOunces: 77 },
        { userID: 12, date: '2019/08/20', numOunces: 76 },
        { userID: 12, date: '2019/08/21', numOunces: 85 },
        { userID: 12, date: '2019/08/22', numOunces: 58 }
      ]
    );
  });

});