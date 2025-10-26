require('dotenv').config();
const sequelize = require('./dist/config/database').default;
const User = require('./dist/models/User').default;

async function checkUsers() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected successfully!');
    
    console.log('Checking for admin user...');
    const adminUser = await User.findOne({ where: { email: 'admin@coolair.com' } });
    console.log('Admin user:', adminUser ? adminUser.toJSON() : 'Not found');
    
    console.log('Listing all users...');
    const allUsers = await User.findAll();
    console.log(`Found ${allUsers.length} users:`);
    allUsers.forEach(user => {
      console.log(`- ${user.email} (${user.name || 'No name'})`);
    });
  } catch (error) {
    console.error('Error:', error.message);
  } finally {
    await sequelize.close();
  }
}

checkUsers();