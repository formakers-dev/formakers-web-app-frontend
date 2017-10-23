const KEY_IS_LOGIN = 'KEY_IS_LOGIN';

export function isLoggedIn() {
  return sessionStorage.getItem(KEY_IS_LOGIN);
}

export function setLogin(isLogin) {
  if (!isLogin) {
    sessionStorage.removeItem(KEY_IS_LOGIN);
  } else {
    sessionStorage.setItem(KEY_IS_LOGIN, isLogin);
  }
}

export function requireAuth(to, from, next) {
  if (!isLoggedIn()) {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  } else {
    next();
  }
}
