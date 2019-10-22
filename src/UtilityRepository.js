class UtilityRepository {
  constructor(userData, sleepData, hydrationData, activityData) {
    this.userData = userData;
    this.sleepData = sleepData;
    this.hydrationData = hydrationData;
    this.activityData = activityData;
  }
  
  getUserLogs(id, dataType) {
    return this[dataType].filter(user => user.userID === id);
  }

  getUserInfoByDate(id, date, dataType) {
    return this.getUserLogs(id, dataType).find(log => log.date === date);
  }

  getAllUserInfoByDate(date, dataType) {
    return this[dataType].filter(log => log.date === date);
  }

  getWeeksData(id, date, dataType) {
    const userInfo = this.getUserLogs(id, dataType);
    let i = userInfo.findIndex(day => day.date === date);
    return userInfo.slice(i - 6, i + 1);
  }

  getTotal(id, dataType, dataKey) {
    const userInfo = this.getUserLogs(id, dataType);
    const total = userInfo.reduce((acc, day) => {
      acc += day[dataKey];
      return acc;
    }, 0);
    return { total, userInfo };
  }

  getAverage(id, dataType, dataKey) {
    const { total, userInfo } = this.getTotal(id, dataType, dataKey);
    return parseFloat((total / userInfo.length).toFixed(1));
  }
}

export default UtilityRepository;