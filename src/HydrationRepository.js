class HydrationRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
    this.user = this.getHydrationData();
  }

  getHydrationData() {
    return this.data.filter((user => user.userID === this.id));
  }

  getAllTimeAvg() {
    return Math.round(this.user.reduce((totalNumOz, ozPerDay) => {
      totalNumOz += ozPerDay.numOunces;
      return totalNumOz;
    }, 0) / this.user.length);
  }

  totalOzDay(date) {
    let foundUser = this.user.find(user => user.date === date);
    return foundUser.numOunces;
  }

  weeklyHydrationAvg(date) {
    const indexCurrentDay = this.user.findIndex(data => data.date === date);
    return this.user.slice(indexCurrentDay - 6, indexCurrentDay + 1);
  }
}

export default HydrationRepository;