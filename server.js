const app = require("./app");
const envConfig = require("./config");
const PORT = process.env.PORT || 8080;

const DATASOURCE_BY_ENV = {
  mongo: require('./models/containers/mongo.container'),
  firebase: require('./models/containers/firebase.container')
};

const dataSource = DATASOURCE_BY_ENV[envConfig.DATASOURCE]

const server = app.listen(PORT, () => {
  dataSource.connect().then(() => {
    console.log(`Server is up and running on port: `, PORT);
    console.log("Connected to " + envConfig.DATASOURCE);
  })
});
server.on('error', error => {
  console.error(`Error: ${error}`)
})