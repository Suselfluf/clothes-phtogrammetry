class Auth {
  constructor() {
    this.authenticated = false;
  }

  trylogin(res) {
    this.authenticated = true;
  }

  login() {
    this.authenticated = true;
  }

  logout() {
    localStorage.clear();
    this.authenticated = false;
  }

  isAuthenticated() {
    return this.authenticated;
  }
}

export default new Auth();
