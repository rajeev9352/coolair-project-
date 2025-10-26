const axios = require('axios');

// Test the login endpoint
async function testLogin() {
  try {
    console.log('Testing login endpoint...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'admin@coolair.com',
      password: 'password123'
    });
    
    console.log('Login response:', response.data);
    console.log('Status code:', response.status);
  } catch (error) {
    console.log('Login error occurred:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
      console.log('Headers:', error.response.headers);
    } else {
      console.log('Error message:', error.message);
    }
  }
}

// Test the register endpoint
async function testRegister() {
  try {
    console.log('\nTesting register endpoint...');
    
    const response = await axios.post('http://localhost:5000/api/auth/register', {
      name: 'Test User 2',
      email: 'test2@example.com',
      password: 'password123'
    });
    
    console.log('Register response:', response.data);
    console.log('Status code:', response.status);
  } catch (error) {
    console.log('Register error occurred:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }
}

// Test with invalid credentials
async function testInvalidLogin() {
  try {
    console.log('\nTesting login with invalid credentials...');
    
    const response = await axios.post('http://localhost:5000/api/auth/login', {
      email: 'nonexistent@example.com',
      password: 'wrongpassword'
    });
    
    console.log('Unexpected success:', response.data);
  } catch (error) {
    console.log('Expected error for invalid login:');
    if (error.response) {
      console.log('Status:', error.response.status);
      console.log('Data:', error.response.data);
    } else {
      console.log('Error message:', error.message);
    }
  }
}

// Run tests
testLogin();
testRegister();
testInvalidLogin();