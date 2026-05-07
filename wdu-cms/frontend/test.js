const http = require('http');

http.get('http://localhost:3001/api/v1/pages', (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log(data);
  });
});
