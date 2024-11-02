const authService = require('../services/authService');

const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const authData = await authService.createUser(email, password, name);

    res.status(201).json({
      success: true,
      message: 'User created successfully',
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: authData.user.user_metadata.full_name,
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Registration failed'
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await authService.loginUser(email, password);

    res.status(200).json({
      success: true,
      session: data.session,
      user: {
        id: data.user.id,
        email: data.user.email,
        name: data.user.user_metadata.full_name,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Invalid credentials'
    });
  }
};

const logout = async (req, res) => {
  try {
    await authService.logoutUser();
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

const verifySession = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) throw new Error('No token provided');

    const user = await authService.verifyUser(token);

    res.status(200).json({
      id: user.id,
      email: user.email,
      name: user.user_metadata.full_name
    });
  } catch (error) {
    console.error('Session verification error:', error);
    res.status(401).json({
      success: false,
      message: 'Invalid session'
    });
  }
};

const getProfile = async (req, res) => {
  try {
    // req.user is set by protect middleware
    const { data, error } = await authService.getUserProfile(req.user.id);
    
    if (error) throw error;

    res.status(200).json({
      success: true,
      profile: data
    });
  } catch (error) {
    console.error('Profile fetch error:', error);
    res.status(400).json({
      success: false,
      message: error.message || 'Failed to fetch profile'
    });
  }
};

module.exports = {
  signup,
  login,
  logout,
  verifySession,
  getProfile
}; 