const express = require('express');

const server = express();

server.use(express.json());

const projects = [{
  id: "0",
  title: "Novo Projeto",
  task: []
}];

server.use('/projects', (req, res, next) => {
  console.count("Qtd de requisicao");
  return next();
})

const verificaIndexExistente = (req, res, next) => {
  if (!projects[req.params.index]) {
    return res.json({ error: "indexInxistente" });
  }
  return next();
};

server.post('/projects', (req, res) => {
  const project = { title, task } = req.body;
  project.id = projects.length.toString();
  projects.push(project);
  return res.send();
})

server.get('/projects', (req, res) => {
  return res.json(projects);
})

server.get('/projects/:index', verificaIndexExistente, (req, res) => {
  return res.json(projects[req.params.index]);
})

server.put('/projects/:index', verificaIndexExistente, (req, res) => {
  const { index } = req.params;
  const project = { title, task } = req.body;
  projects[index] = project;
  return res.send();
})

server.delete('/projects/:index', verificaIndexExistente, (req, res) => {
  const { index } = req.params;
  projects.splice(index, 1);
  return res.send();
})

server.post('/projects/:index/tasks', verificaIndexExistente, (req, res) => {
  const { title } = req.body;
  projects[req.params.index].task.push(title);
  return res.json();
});

server.listen(3001);