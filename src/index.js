if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
  }

const server = require('./server');
require('./database');


// server.listen(server.get('port'), () => {
//     console.log('Server on port', server.get('port'));
//     console.log('Environment:', process.env.NODE_ENV);
// })