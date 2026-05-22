const { spawn } = require('child_process');
const path = require('path');

// Start the server
const server = spawn('node', ['src/app.js'], {
  cwd: path.join(__dirname, '..', '..'),
  stdio: ['ignore', 'pipe', 'pipe'],
});

let output = '';
server.stdout.on('data', (data) => {
  output += data.toString();
});
server.stderr.on('data', (data) => {
  output += data.toString();
});

// Wait for server to start, then make a test request
setTimeout(async () => {
  try {
    // Test health
    const http = require('http');
    const makeRequest = (url) => new Promise((resolve, reject) => {
      http.get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => data += chunk);
        res.on('end', () => resolve({ status: res.statusCode, body: data }));
      }).on('error', reject);
    });

    const health = await makeRequest('http://localhost:3000/api/health');
    console.log('HEALTH:', JSON.stringify(health));

    // Test pending notifications
    const pending = await makeRequest('http://localhost:3000/api/notifications/pending/1');
    console.log('PENDING:', JSON.stringify(pending));
  } catch (err) {
    console.error('Request error:', err.message);
  }

  // Wait a moment then kill server and exit
  setTimeout(() => {
    server.kill();
    console.log('===SERVER OUTPUT===');
    console.log(output);
    process.exit(0);
  }, 1000);
}, 3000);
