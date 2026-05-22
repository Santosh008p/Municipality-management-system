const test = async () => {
  const registerUrl = 'http://localhost:8000/user/register';
  const loginUrl = 'http://localhost:8000/user/login';

  const testPhone = '99' + Math.floor(10000000 + Math.random() * 90000000);
  const testPassword = 'agentpassword';

  console.log('--- Testing Registration Route ---');
  try {
    const registerResponse = await fetch(registerUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'Test Agent User',
        email: `agent.${Date.now()}@example.com`,
        phone: testPhone,
        password: testPassword
      })
    });

    const registerText = await registerResponse.text();
    console.log(`Status: ${registerResponse.status}`);
    console.log(`Response: ${registerText}`);

    if (registerResponse.ok) {
      console.log('\n--- Testing Login Route ---');
      const loginResponse = await fetch(loginUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: testPhone,
          password: testPassword
        })
      });

      const loginText = await loginResponse.text();
      console.log(`Status: ${loginResponse.status}`);
      console.log(`Response: ${loginText}`);
    }
  } catch (error) {
    console.error('Error during endpoint test:', error);
  }
};

test();
