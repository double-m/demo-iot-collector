const app = require('express')()
      path = require('path')
    , PORT = 3000;

app.get('/', (req, res) => {
    res.sendFile(`${path.dirname(__dirname)}/client/index.html`);
});

app.listen(PORT);

console.log(`Server listening on port ${PORT}`);
