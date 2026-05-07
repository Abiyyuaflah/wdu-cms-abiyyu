fetch('http://localhost:3001/api/v1/pages')
  .then(res => res.json())
  .then(json => console.log(JSON.stringify(json, null, 2)));
