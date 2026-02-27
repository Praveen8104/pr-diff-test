const express = require('express');
const { addUser, getUser, deleteUser, updateUser, getAllUsers, loginUser } = require('./userService');

const app = express();
app.use(express.json());

app.get('/users', (req, res) => {
  res.json(getAllUsers());
});

app.post('/users', (req, res) => {
  try {
    const user = addUser(req.body.name, req.body.age);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.get('/users/:id', (req, res) => {
  const user = getUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

app.put('/users/:id', (req, res) => {
  const user = updateUser(req.params.id, req.body);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json(user);
});

app.delete('/users/:id', (req, res) => {
  const user = deleteUser(req.params.id);
  if (!user) return res.status(404).json({ error: 'Not found' });
  res.json({ deleted: true });
});

app.post('/login', (req, res) => {
  const result = loginUser(req.body.username, req.body.password);
  if (!result) return res.status(401).json({ error: 'Invalid credentials' });
  res.json(result);
});

app.listen(3001, () => console.log('Server on 3001'));
