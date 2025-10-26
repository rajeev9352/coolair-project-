require('dotenv').config();
const sequelize = require('./dist/config/database').default;
const User = require('./dist/models/User').default;
const bcrypt = require('bcryptjs');

async function createAdminUser() {
  try {
    console.log('Connecting to database...');
    await sequelize.authenticate();
    console.log('Connected successfully!');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ where: { email: 'admin@coolair.com' } });
    if (existingAdmin) {
      console.log('Admin user already exists:', existingAdmin.email);
      // Update role if needed
      if (existingAdmin.role !== 'admin') {
        await existingAdmin.update({ role: 'admin' });
        console.log('Updated admin user role to admin');
      }
      return;
    }
    
    // Create admin user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const adminUser = await User.create({
      email: 'admin@coolair.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin'
    });
    
    console.log('Admin user created successfully:', adminUser.toJSON());
  } catch (error) {
    console.error('Error creating admin user:', error.message);
  } finally {
    await sequelize.close();
  }
}

createAdminUser();