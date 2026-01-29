const axios = require('axios');

async function testRegisterDuplicate() {
    try {
        const response = await axios.post('http://localhost:5000/api/users', {
            name: 'Sri',
            email: 'ujaini.sk@gmail.com',
            password: 'password123',
            role: 'doctor'
        });
        console.log('Success (Unexpected):', response.data);
    } catch (error) {
        console.log('Error Status:', error.response?.status);
        console.log('Error Data:', error.response?.data);
        console.log('Error Message:', error.message);
    }
}

testRegisterDuplicate();
