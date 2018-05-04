const express = require('express');
const router = express.Router();   // create router, then rename all 'server.' to 'router.'
const db = require('../helpers/projectModel.js');


router.get('/', (req, res) => {
  db
    .get()
    .then(projects => res.status(200).json({ projects }))
    .catch(error => res.status(500).json({ error: `{err} Error fetching projects` }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(project => res.status(200).json({ project }))
    .catch(error => res.status(500).json({ error: `{err} Error fetching project ${id}` }));
});

router.get('/:id/actions', (req, res) => {
  const { id } = req.params;

  db
    .getProjectActions(id)
    .then(actions => res.status(200).json({ actions }))
    .catch(error => res.status(500).json({ error: `Error fetching project ${id}'s actions` }));
});

router.post('/', (req, res) => {
  const { name, description } = req.body;
  const newProject = req.body;

  if (!name || !description) {
    res.status(400).json({ error: 'Please provide both name and description' });
  }

  if (name.length > 128 || description.length > 128) {
    res.status(400).json({ error: 'Both name and description must not exceed 128 characters' });
  }

  db
    .insert(newProject)
    .then(newProject => res.status(201).json({ newProject }))
    .catch(error => res.status(500).json({ error: 'Error creating project' }));
});

router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  const updatedProject = req.body;

  if (!name || !description) {
    res.status(400).json({ error: 'Please provide both name and description' });
  }

  if (name.length > 128 || description.length > 128) {
    res.status(400).json({ error: 'Both name and description must not exceed 128 characters' });
  }

  db
    .update(id, updatedProject)
    .then(updatedProject => res.status(200).json({ updatedProject }))
    .catch(error => res.status(500).json({ error: 'Error updating project' }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(500).json({ error: `Error deleting project ${id}` }));
});

module.exports = router;
