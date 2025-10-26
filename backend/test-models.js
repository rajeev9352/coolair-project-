require('dotenv').config();
const sequelize = require('./dist/config/database').default;
const User = require('./dist/models/User').default;

async function testModels() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected successfully!');
    
    console.log('Testing User model...');
    console.log('User model attributes:', Object.keys(User.rawAttributes));
    
    // Test creating a user
    console.log('Testing user creation...');
    const user = await User.create({
      email: 'test-model@example.com',
      password: 'test123',
      name: 'Test Model User'
    });
    console.log('User created:', user.toJSON());
    
    // Test finding a user
    console.log('Testing user lookup...');
    const foundUser = await User.findOne({ where: { email: 'test-model@example.com' } });
    console.log('User found:', foundUser ? foundUser.toJSON() : 'Not found');
    
    // Clean up
    if (foundUser) {
      await foundUser.destroy();
      console.log('Test user deleted');
    }
  } catch (error) {
    console.error('Error testing models:', error.message);
    console.error('Stack trace:', error.stack);
  } finally {
    await sequelize.close();
  }
}

testModels();