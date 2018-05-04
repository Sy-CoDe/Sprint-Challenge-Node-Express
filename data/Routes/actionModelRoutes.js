const express = require("express");
const router = express.Router();     // create router, then rename all 'server.' to 'router.'
const db = require("../helpers/actionModel.js");


router.get('/', (req, res) => {
  db
    .get()
    .then(actions => res.status(200).json({ actions }))
    .catch(error => res.status(500).json({ error: 'Error fetching actions' }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  db
    .get(id)
    .then(action => res.status(200).json({ action }))
    .catch(error => res.status(500).json({ error: `Error fetching action ${id}` }));
});

router.post('/', (req, res) => {
  const { project_id, description } = req.body;
  const newAction = req.body;

  if (!project_id || !description) {
    res.status(400).json({ error: 'Please provide both project_id and description' });
  }

  if (description.length > 128) {
    res.status(400).json({ error: 'Description must not exceed 128 characters' });
  }

  db
    .insert(newAction)
    .then(newAction => res.status(201).json({ newAction }))
    .catch(error => res.status(500).json({ error: 'Error creating action' }));
});

router.put('/:id', (req, res) => {
  const { project_id, description } = req.body;
  const { id } = req.params;
  const updatedAction = req.body;

  if (!project_id || !description) {
    res.status(400).json({ error: 'Please provide both project_id and description' });
  }

  if (description.length > 128) {
    res.status(400).json({ error: 'Description must not exceed 128 characters' });
  }

  db
    .update(id, updatedAction)
    .then(updatedAction => res.status(200).json({ updatedAction }))
    .catch(error => res.status(500).json({ error: 'Error updating action' }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db
    .remove(id)
    .then(response => res.status(200).json({ response }))
    .catch(error => res.status(500).json({ error: `Error deleting action ${id}` }));
});

module.exports = router;
