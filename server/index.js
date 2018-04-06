const path = require('path')
    , appRoot = path.resolve(`${__dirname}/../`)
    , port = 3000
    , app = require(`${appRoot}/server/app/app`);

app.listen(port);

console.log(`Server listening on port ${port}`);
