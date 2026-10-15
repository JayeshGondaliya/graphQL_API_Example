
require("dotenv").config();

const mongoose = require("mongoose");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs, resolvers } = require("./schema");

const server=async() =>{
  try {
    // 1. Connect MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected successfully!");

    // 2. Create Apollo Server
    const server = new ApolloServer({
      typeDefs,
      resolvers
    });

    // 3. Start GraphQL Server
    const { url } = await startStandaloneServer(server, {
      listen: {
        port: process.env.PORT || 4000
      }
    });

    console.log(`GraphQL Server running at ${url}`);

  } catch (error) {
    console.error("Server startup failed:", error.message);
    process.exitCode = 1;
  }
}

server();
