class Auth {
  static authenticateShop(token) {
    localStorage.setItem("token", token);
  }
  static isShopAuthenticated() {
    return localStorage.getItem("token") !== null;
  }
  static deauthenticateShop() {
    localStorage.removeItem("token");
  }
  static getToken() {
    return localStorage.getItem("token");
  }
}
export default Auth;
