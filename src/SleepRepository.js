class SleepRepository {
  constructor(sleepData, id) {
    this.sleepData = sleepData;
    this.id = id;
    this.user = this.getSleepData();
  }

  getSleepData() {
    return this.sleepData.filter(user => user.userID === this.id);
  }

  getAllTimeAvg() {
    const totalHrs = this.user.reduce((totalHours, day) => {
      totalHours += day.hoursSlept;
      return totalHours;
    }, 0);
    return Math.round(totalHrs / this.user.length);
  }

  getQualitySleepAvg() {
    const sleepQualAvg = this.user.reduce((sleepQual, day) => {
      sleepQual += day.sleepQuality;
      return sleepQual;
    }, 0);
    return parseFloat((sleepQualAvg / this.user.length).toFixed(1));
  }

  getDailySleepHours(date) {
    return this.user.find(day => day.date === date).hoursSlept;
  }

  weeklySleepData(date, user = this.user) {
    let i = user.findIndex(day => day.date === date);
    return this.user.slice(i - 6, i + 1);
  }

  getWeeklyHours(date) {
    return this.weeklySleepData(date).map(day => {
      return { date: day.date, hoursSlept: day.hoursSlept };
    });
  }

  getWeeklyQuality(date) {
    return this.weeklySleepData(date).map(day => {
      return { date: day.date, sleepQuality: day.sleepQuality };
    });
  }

  getAvgQuality() {
    const avgQual = this.sleepData.reduce((totalQual, day) => {
      totalQual += day.sleepQuality;
      return totalQual;
    }, 0);
    return parseFloat((avgQual / this.sleepData.length).toFixed(1));
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