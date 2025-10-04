const userService = require('../service/userService');

exports.register = (req, res) => {
  try {
    const user = userService.registerUser(req.body);
    res.status(201).json({ message: 'Usuário registrado', user: { username: user.username } });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Login e senha obrigatórios' });
  }
  try {
    const user = userService.authenticateUser(username, password);
    res.json({ message: 'Login realizado', user: { username: user.username } });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
};

exports.getUsers = (req, res) => {
  res.json(userService.getAllUsers());
};
