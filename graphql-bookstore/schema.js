
const { buildSchema  } = require("graphql");
const Book = require("./models/book");

const typeDefs = buildSchema(`
  type Book {
    id: ID!
    name: String!
    author: String!
    price: Float!
  }

  type Query {
    books: [Book!]!
    book(id: ID!): Book
  }

  type Mutation {
    addBook(
      name: String!
      author: String!
      price: Float!
    ): Book!

    updateBook(
      id: ID!
      name: String
      author: String
      price: Float
    ): Book

    deleteBook(id: ID!): Boolean!
  }
`);

const resolvers = {
  Query: {
    books: async () => {
      return await Book.find();
    },

    book: async (_, { id }) => {
      return await Book.findById(id);
    }
  },

  Mutation: {
    addBook: async (_, { name, author, price }) => {
      return await Book.create({
        name,
        author,
        price
      });
    },

    updateBook: async (_, { id, name, author, price }) => {
      const book = await Book.findById(id);

      if (!book) {
        throw new Error("Book not found");
      }

      if (name !== undefined) book.name = name;
      if (author !== undefined) book.author = author;
      if (price !== undefined) book.price = price;

      return await book.save();
    },

    deleteBook: async (_, { id }) => {
      const result = await Book.findByIdAndDelete(id);
      return result !== null;
    }
  }
};

module.exports = { typeDefs, resolvers };
