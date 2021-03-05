const router = require('express').Router();
const Notes = require('./notes-model.js');

// get all notes

router.get('/', (req, res) => {
  Notes.find()
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch(() => {
      res.status(500).json({
        message: 'Failed to get notes.',
      });
    });
});

// get notes of a specified plant

router.get('/plant/:plantid', (req, res) => {
  const { plantid } = req.params;
  Notes.findByPlant(plantid)
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

// get a specific note

router.get('/:id', (req, res) => {
  const { id } = req.params;
  Notes.findById(id)
    .then((note) => {
      res.status(200).json(note);
      res.status(404).json({
        message: `Could not find note with ID: ${id}.`,
      });
    })
    .catch(() => {
      res.status(500).json({
        message: 'Failed to get note.',
      });
    });
});

// add a note

router.post('/plant/:plantid', (req, res) => {
  const { plantid } = req.params;
  const newNote = req.body;
  Notes.add(newNote, plantid)
    .then((noteId) => {
      res.status(201).json({ noteId });
    })
    .catch((err) => {
      res
        .status(500)
        .json({ message: 'could not add note', error: err.message });
    });
});

// update a note with a specified id

router.put('/:id', (req, res) => {
  const { id } = req.params;
  const changes = req.body;
  Notes.findById(id)
    .then((note) => {
      note
        ? Notes.update(id, changes).then((updated) => {
            res.status(200).json({
              message: `successfully updated note ID: ${id}`,
            });
          })
        : res.status(404).json({
            errorMessage: 'note not found',
          });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        errorMessage: error.message,
      });
    });
});

// delete a note

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  Notes.remove(id)
    .then((deletedNote) => {
      if (deletedNote) {
        res
          .status(201)
          .json({ message: `note ID: ${id} has been removed`, deletedNote });
      } else {
        console.log(deletedNote);
        res
          .status(400)
          .json({ message: 'you cannot delete what does not exist' });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        message: `cannot remove note by ID: ${id}`,
        error: err.message,
      });
    });
});

module.exports = router;
