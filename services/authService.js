const { supabase } = require('../lib/supabase');

const createUser = async (email, password, name) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    }
  });

  if (error) throw error;
  return data;
};

const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) throw error;
  return data;
};

const logoutUser = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

const verifyUser = async (token) => {
  const { data: { user }, error } = await supabase.auth.getUser(token);
  if (error) throw error;
  return user;
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  verifyUser
}; 