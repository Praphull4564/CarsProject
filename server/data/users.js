// In-memory user storage with roles
let users = [
  {
    id: '1',
    username: 'admin',
    password: 'admin@praphull', // plain text for demo
    role: 'admin',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    username: 'editor',
    password: 'editor@praphull', // plain text for demo
    role: 'editor',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    username: 'user',
    password: 'user@praphull', // plain text for demo
    role: 'user',
    createdAt: new Date().toISOString()
  }
];

export const getUsers = () => users;

export const addUser = (user) => {
  users.push(user);
  return user;
};

export const findUserByUsername = (username) => {
  return users.find(user => user.username === username);
};

export const findUserById = (id) => {
  return users.find(user => user.id === id);
};

