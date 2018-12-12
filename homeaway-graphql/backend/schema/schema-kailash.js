const graphql = require("graphql");
const _ = require("lodash");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID } = graphql;

let users = [
  {
    id: 1,
    email: "kailash@gmail.com",
    password: "123",
    firstname: "kailash",
    lastname: "ram"
  },
  {
    id: "2",
    email: "ram@gmail.com",
    password: "123",
    firstname: "ram",
    lastname: "kailash"
  },
  {
    id: 3,
    email: "sita@gmail.com",
    password: "123",
    firstname: "sita",
    lastname: "ram"
  }
];

let properties = [
  {
    id: "1",
    name: "Cottage",
    owner: "kailash",
    location: "San Jose"
  },

  {
    id: "2",
    name: "Apartment",
    owner: "ram",
    location: "San Francisco"
  },
  {
    id: "3",
    name: "Bungalow",
    owner: "sita",
    location: "San Mateo"
  }
];
const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    firstname: { type: GraphQLString },
    lastname: { type: GraphQLString }
  })
});

const PropertyType = new GraphQLObjectType({
  name: "Property",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    owner: { type: GraphQLString },
    location: { type: GraphQLString }
  })
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    user: {
      type: UserType,
      args: { email: { type: GraphQLString } },
      resolve(parent, args) {
        //TODO code to get data from db

        return _.find(users, { email: args.email });
      }
    },
    property: {
      type: PropertyType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(properties, { id: args.id });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});
