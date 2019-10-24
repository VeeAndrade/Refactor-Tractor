import UtilityRepository from '../src/UtilityRepository';

class HydrationRepository extends UtilityRepository {
  constructor(data, id, userData, sleepData, hydrationData, activityData) {
    super(userData, sleepData, hydrationData, activityData);
    this.data = data;
    this.id = id;
    this.user = this.getUserLogs(id, 'hydrationData');
  }

  // getHydrationData(id, dataType) {
  //   this.getUserLogs(id, dataType);
  //   // return this.data.filter((user => user.userID === this.id));
  // }

  getAllTimeAvg() {
    return Math.round(this.user.reduce((totalNumOz, ozPerDay) => {
      totalNumOz += ozPerDay.numOunces;
      return totalNumOz;
    }, 0) / this.user.length);
  }

  totalOzDay(id, date, dataType) {
    console.log(dataType);
    return this.getUserInfoByDate(id, date, dataType).numOunces;
  }

  // weeklyHydrationAvg(date) {
  //   const indexCurrentDay = this.user.findIndex(data => data.date === date);
  //   return this.user.slice(indexCurrentDay - 6, indexCurrentDay + 1);
  // }
}

export default HydrationRepository;