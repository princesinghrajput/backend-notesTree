const supabase = require('../config/supabase');

class UserModel {
  static async createUser(email, password, name) {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: name },
        emailRedirectTo: 'http://localhost:5173/auth/login'
      }
    });

    if (error) throw error;
    return data;
  }

  static async loginUser(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return data;
  }
}

module.exports = UserModel; 