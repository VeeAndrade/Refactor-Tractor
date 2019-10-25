import UtilityRepository from "../src/UtilityRepository";

class ActivityRepository extends UtilityRepository {
  constructor(id, activityData, sleepData, hydrationData, userData) {
    super(userData, sleepData, hydrationData, activityData)
    this.id = id;
    this.activityData = activityData;
    this.user = this.getUserLogs(id, "activityData")
  }

  // getUserLogs(id) {
    // return this.activityData.filter(user => user.userID === id);
  //   this.getUserLogs(id, this.activityData)
  // }

  getUserDate(date) {
    return this.user.find(log => log.date === date);
  }

  // getFilteredDate(date) {
  //   return this.activityData.filter(log => log.date === date);
  // }

  getMilesWalked(date, user) {
    const miles = (user.strideLength * this.getUserDate(date).numSteps) / 5280;
    return parseFloat(miles.toFixed(1));
  }

  getMinutesActive(date) {
    return this.getUserDate(date).minutesActive;
  }

  getAverageActivity(date) {
    const i = this.user.findIndex(log => log.date === date);
    const week = this.user.slice(i - 6, i + 1);
    const totalMinutes = week.reduce((totalHours, log) => {
      totalHours += log.minutesActive;
      return totalHours;
    }, 0);
    return Math.round(totalMinutes / week.length);
  }

  reachedDailyStepGoal(date, user) {
    const stepGoal = user.dailyStepGoal;
    return this.getUserDate(date) >= stepGoal;
  }

  getAllTimeExceededSteps(user) {
    let exceededStepGoalDates = this.user.filter(log => {
      return log.numSteps >= user.dailyStepGoal;
    });
    return exceededStepGoalDates.map(log => {
      return { "date": log.date, "numSteps": log.numSteps };
    });
  }

  getAllTimeStairClimb() {
    const maxFlightsClimbed = this.user.find(log => {
      return log.flightsOfStairs === Math.max.apply(Math, this.user.map(log => {
        return log.flightsOfStairs;
      }));
    });
    return {
      "date": maxFlightsClimbed.date,
      "flightsOfStairs": maxFlightsClimbed.flightsOfStairs
    };
  }

  getAverages(date, property) {
    const filteredDate = this.getAllUserInfoByDate(date, 'activityData');
    const total = filteredDate.reduce((total, log) => {
      total += log[property];
      return total;
    }, 0);
    return Math.round(total / filteredDate.length);
  }

  getKilometersWalked(date, user) {
    const miles = this.getMilesWalked(date, user);
    return parseFloat((miles * 1.609).toFixed(1));
  }

  getDailyStats(date, property) {
    return this.getUserDate(date)[property];
  }

  getWeeklyStats(date) {
    const index = this.user.findIndex(log => log.date === date);
    return this.user.slice(index - 6, index + 1);
  }

  getStepTrends(positive) {
    return this.user.reduce((acc, day, index) => {
      if (index < 2) {
        return acc;
      }
      if (positive && (day.numSteps > this.user[index - 1].numSteps) &&
        (this.user[index - 1].numSteps > this.user[index - 2].numSteps)) {
        acc.push(day.date);
      } 
      if (!positive && (day.numSteps < this.user[index - 1].numSteps) &&
        (this.user[index - 1].numSteps < this.user[index - 2].numSteps)) {
        acc.push(day.date);
      }
      return acc;
    }, []);
  }
}

export default ActivityRepository;