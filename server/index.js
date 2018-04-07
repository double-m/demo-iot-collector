const path = require('path')
    , appRoot = path.resolve(`${__dirname}/../`)
    , port = 3000
    , http = require(`${appRoot}/server/app/app`);

http.listen(port);

console.log(`Server listening on port ${port}`);
