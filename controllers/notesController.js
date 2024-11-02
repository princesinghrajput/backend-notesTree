const { supabase } = require('../lib/supabase');

// Get all notes for a user
const getNotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('is_deleted', false)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      notes: data
    });
  } catch (error) {
    console.error('Get notes error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Create a new note
const createNote = async (req, res) => {
  try {
    const { title, content, parent_id } = req.body;

    // If parent_id is "root" or invalid, set it to null
    const actualParentId = parent_id === 'root' ? null : parent_id;

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: req.user.id,
          title,
          content,
          parent_id: actualParentId
        }
      ])
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      note: data
    });
  } catch (error) {
    console.error('Create note error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update a note
const updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, is_starred } = req.body;

    const updates = {
      updated_at: new Date().toISOString()
    };

    // Only include fields that are provided
    if (title !== undefined) updates.title = title;
    if (content !== undefined) updates.content = content;
    if (is_starred !== undefined) updates.is_starred = is_starred;

    const { data, error } = await supabase
      .from('notes')
      .update(updates)
      .eq('id', id)
      .eq('user_id', req.user.id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      note: data
    });
  } catch (error) {
    console.error('Update note error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete a note (soft delete)
const deleteNote = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('notes')
      .update({ is_deleted: true })
      .eq('id', id)
      .eq('user_id', req.user.id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Note deleted successfully'
    });
  } catch (error) {
    console.error('Delete note error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get starred notes
const getStarredNotes = async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', req.user.id)
      .eq('is_starred', true)
      .eq('is_deleted', false)
      .order('updated_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      notes: data
    });
  } catch (error) {
    console.error('Get starred notes error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getStarredNotes
}; 