const express = require("express");
const graphqlHTTP = require("express-graphql");
const app = express();
const schema = require("./schema/schema");

let mongoose = require("mongoose");

mongoose.set("debug", true);

mongoose
  .connect("mongodb://kailashr:passw0rd1@ds237855.mlab.com:37855/homeaway")
  .then(() => {
    console.log("Connection to MongoDB established");
  })
  .catch(err => {
    console.log("Connection to MongoDB unsuccessful");
  });

module.exports = { mongoose };

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true
  })
);
app.listen(3001, () => {
  console.log("Listening for requests on port 3001..");
});
