export default class UserModel {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
  }

  static add(name, email, password) {
    const newUser = new UserModel(name, email, password);
    users.push(newUser);
  }

  static isValidUser(email, password) {
    return users.find(
      (user) => user.email === email && user.password === password,
    );
  }
}

const users = [];
