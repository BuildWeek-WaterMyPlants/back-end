const router = require('express').Router();
const Tasks = require('./tasks-model.js');

// get all tasks

router.get('/', (req, res) => {
  Tasks.find()
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Failed to get tasks.',
      });
    });
});

// get tasks of a specified plant

router.get('/plant/:plantid', (req, res) => {
  const { plantid } = req.params;
  Tasks.findByPlant(plantid)
    .then((tasks) => {
      res.status(200).json(tasks);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// get a specific task

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.findById(id)
    .then((task) => {
      res.status(200).json(task);
      res.status(404).json({
        message: `Could not find task with ID: ${id}.`,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Failed to get task.',
      });
    });
});

// add a task

router.post('/plant/:plantid', (req, res) => {
  const { plantid } = req.params;
  const newTask = req.body;
  Tasks.add(newTask, plantid)
    .then((taskId) => {
      res.status(201).json({ taskId });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'could not add task', error: err.message });
    });
});

// update a task with a specified id

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Tasks.findById(id)
    .then((task) => {
      task
        ? Tasks.update(id, changes).then((updated) => {
            res.status(200).json({
              message: `successfully updated task ID: ${id}`,
            });
          })
        : res.status(404).json({
            errorMessage: 'task not found',
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

// delete a task

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Tasks.remove(id)
    .then((deletedTask) => {
      if (deletedTask) {
        res
          .status(201)
          .json({ message: `task ID: ${id} has been removed`, deletedTask });
      } else {
        console.log(deletedTask);
        res
          .status(400)
          .json({ message: 'you cannot delete what does not exist' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `cannot remove task by ID: ${id}`,
        error: err.message,
      });
    });
});

module.exports = router;
