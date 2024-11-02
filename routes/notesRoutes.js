const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getStarredNotes
} = require('../controllers/notesController');

const router = express.Router();

// Apply auth middleware to all routes
router.use(protect);

router.get('/', getNotes);
router.post('/', createNote);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);
router.get('/starred', getStarredNotes);

module.exports = router; 