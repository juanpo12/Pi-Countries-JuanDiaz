const server = require("./src/server");
const { conn } = require('./src/db.js');
const PORT = 3001;
const {getCountries} = require('./src/controllers/getCountries')



conn.sync({ force: false }).then(() => {
server.listen(PORT, () => {
  getCountries()
  console.log(`Server listening on port ${PORT}`);
})
}).catch(error => console.error(error))
