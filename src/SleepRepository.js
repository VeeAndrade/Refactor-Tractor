import UtilityRepository from './UtilityRepository';
class SleepRepository extends UtilityRepository {
  constructor(sleepData, userData, hydrationData, activityData, id) {
    super(userData, sleepData, userData, hydrationData, activityData);
    this.sleepData = sleepData;
    this.id = id;
    this.user = this.getUserLogs(this.id, 'sleepData');
  }

  getAllTimeAvg() {
    const total = this.getTotal(this.id, 'user', 'hoursSlept').total
    return parseFloat((total / this.user.length).toFixed(1));
  }

  getQualitySleepAvg() {
    const total = this.getTotal(this.id, 'user', 'sleepQuality').total
    return parseFloat((total / this.user.length).toFixed(1));
  }

  getAvgQuality() {
    const total = this.getTotal(this.id, 'sleepData', 'sleepQuality').total
    return parseFloat((total / this.sleepData.length).toFixed(1));
  }

  getDailySleepHours(date) {
    return this.user.find(day => day.date === date).hoursSlept;
  }

  weeklySleepData(date, user = this.user) {
    let i = user.findIndex(day => day.date === date);
    return this.user.slice(i - 6, i + 1);
  }


  getWeeklyMetric(date, metric) {
    return this.weeklySleepData(date).map(day => {
      return {date: day.date, [metric]: day[metric]};
    });
  }

  getAllIds() {
    return this.sleepData.reduce((idHolder, log) => {
      !idHolder.includes(log.userID) && idHolder.push(log.userID);
      return idHolder;
    }, []);
  }

  getBestSleepers(date) {
    let sorted = [];

    this.getAllIds().forEach(id => {
      let userLogs = this.sleepData.filter(log => log.userID === id);
      sorted.push(userLogs);
    });

    let allWeeklyData = sorted.reduce((accumulator, user) => {
      let i = user.findIndex(log => log.date === date);
      accumulator.push(user.slice(i - 6, i + 1));
      return accumulator;
    }, []);

    let allAverages = allWeeklyData.reduce((acc, user) => {
      let avgQual = user.reduce((totalQual, day) => {
        totalQual += day.sleepQuality;
        return totalQual;
      }, 0);
      acc.push(
        {
          id: acc.length + 1,
          avgQual: parseFloat((avgQual / 7).toFixed(1))
        });
      return acc;
    }, []);

    return allAverages.filter(user => user.avgQual > 3);
  }

  getMaxSleepers(date) {
    let specificDate = this.sleepData.filter(day => day.date === date);
    let maxSleepHours = Math.max.apply(Math, specificDate.map((log) => {
      return log.hoursSlept;
    }));
    return specificDate.filter(user => user.hoursSlept === maxSleepHours);
  }

  weeklyAvgHours(date) {
    let weeklySleep = this.weeklySleepData(date)
    let totalWeeklyHours = weeklySleep.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0);
    return parseFloat((totalWeeklyHours / 7).toFixed(1));
  }
}

export default SleepRepository;