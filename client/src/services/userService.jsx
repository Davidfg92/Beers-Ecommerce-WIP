import axios from 'axios';

const api = 'http://localhost:3040';

export default function userService() {
  function login(user) {
    axios
      .post(`${api}/login`, { email: user.email, password: user.password })
      .then((resp) => {
        localStorage.setItem('user', JSON.stringify(resp.data));
      })
      .catch((err) => console.log(err));
  }

  function logout() {
    localStorage.removeItem('user');
  }

  return {
    login,
    logout,
  };
}

export function userRegister(user) {
  axios
    .post(`${api}/user`, { name: user.name, password: user.password, email: user.email })
    .then((resp) => {
      localStorage.setItem('user', JSON.stringify(resp.data));
    })
    .catch((err) => console.log(err));
}
