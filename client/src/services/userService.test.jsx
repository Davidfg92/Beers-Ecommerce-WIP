import axios from 'axios';
import userService, { userRegister } from './userService';

jest.mock('axios');

describe('Given the registerUser', () => {
  describe('When is called with a valid data', () => {
    test('Then it should return the data', async () => {
      axios.post.mockResolvedValue({
        data: {
          name: 'david',
          email: 'david@isdi.com',
          password: '1234',
        },
      });

      const response = await userRegister({
        name: 'david',
        email: 'david@isdi.com',
        password: '1234',
      });
    });
  });
});

describe('Given the userServices function, log in', () => {
  const user = { email: 'david@isdi.com', password: '1234' };
  test('When is called then a user should have been posted', async () => {
    const response = userService();

    expect(JSON.stringify(response)).toBe(JSON.stringify({
      login(user) {
        const urlBase = 'http://localhost:3000';

        const response = axios.post(`${urlBase}/login`, {
          email: user.email, password: user.password,
        }).then((result) => {
          localStorage.setItem('user', JSON.stringify(result.data.token));

          return result.data.user;
        }).catch((err) => console.log(err));

        return response;
      },
      logOut() {
        localStorage.removeItem('user');
        window.location.reload();
      },
    }));
  });
});

describe('Given the userServices log in', () => {
  describe('When is called with valid data', () => {
    test('Then it should return data', async () => {
      axios.post.mockResolvedValue({
        data: {
          token: 'testettstetst',
          user: 'tetstetstestets',
        },
      });
      const response = await userService().login({ email: 'test', password: 'test' });

      expect(response).toEqual('tetstetstestets');
    });
  });
});

describe('Given the userServices log in', () => {
  describe('When is called with valid data', () => {
    test('Then it should return data', async () => {
      axios.post.mockRejectedValue({});

      expect(async () => await userService().login({ email: 'test', password: 'test' })).rejects.toThrow();
    });
  });
});

describe('Given the userServies logout', () => {
  describe('When is called', () => {
    test('Then window reload should be called', () => {
      const original = window.location;

      const reloadFn = () => {
        window.location.reload(true);
      };
      Object.defineProperty(window, 'location', {
        configurable: true,
        value: { reload: jest.fn() },
      });

      userService().logout();

      expect(window.location.reload).toHaveBeenCalled();
    });
  });
});
