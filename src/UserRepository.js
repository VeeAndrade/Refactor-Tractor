class UserRepository {
  constructor(data, id) {
    this.data = data;
    this.id = id;
    this.friendIds = this.getFriends();
  }

  getUserData(id = this.id) {
    return this.data.find(user => user.id === id);
  }

  getAvgStep() {
    let totalStep = this.data.reduce((avg, user) => {
      return avg += user.dailyStepGoal;
    }, 0);
    return totalStep / this.data.length;
  }

  getFriends() {
    return this.getUserData().friends;
  }

  getFriendsUserInfo() {
    let friendsData = [];
    let friendIds = this.friendIds;
    friendIds.forEach(friend => {
      let foundFriend = this.data.find(user => user.id === friend);
      friendsData.push(foundFriend);
    });
    return friendsData;
  }

  getFriendsName() {
    return this.getFriendsUserInfo().reduce((acc, friend) => {
      acc.push(friend.name.split(' ')[0]);
      return acc
    }, []);
  }

}

export default UserRepository;