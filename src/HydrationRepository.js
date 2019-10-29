import UtilityRepository from '../src/UtilityRepository';

class HydrationRepository extends UtilityRepository {
  constructor(data, id, userData, sleepData, hydrationData, activityData) {
    super(userData, sleepData, hydrationData, activityData);
    this.data = data;
    this.id = id;
    this.user = this.getUserLogs(id, 'hydrationData');
  }

  getAllTimeAvg() {
    return Math.round(this.user.reduce((totalNumOz, ozPerDay) => {
      totalNumOz += ozPerDay.numOunces;
      return totalNumOz;
    }, 0) / this.user.length);
  }

  totalOzDay(id, date, dataType) {
    return this.getUserInfoByDate(id, date, dataType).numOunces;
  }
}

export default HydrationRepository;