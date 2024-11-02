const { supabase } = require('../lib/supabase');

const createUser = async (email, password, name) => {
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: name },
    }
  });

  if (authError) throw authError;

  const { error: profileError } = await supabase
    .from('profiles')
    .insert([
      {
        id: authData.user.id,
        full_name: name,
      }
    ]);

  if (profileError) throw profileError;

  return authData;
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

const getUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
};

module.exports = {
  createUser,
  loginUser,
  logoutUser,
  verifyUser,
  getUserProfile
}; 