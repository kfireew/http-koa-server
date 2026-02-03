import { gql } from 'graphql-tag';

export default gql`
  extend type Query {
    products(limit: Float): [Product!]!
    product(id: ID!): Product!
  }

  extend type Mutation {
    createProduct(product: ProductInput!): Product!
    updateProduct(id: ID!, data: ProductUpdateInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    stock: Int!
  }

  input ProductInput {
    name: String!
    price: Float!
    description: String!
    stock: Int!
  }

  input ProductUpdateInput {
    name: String
    price: Float
    description: String
    stock: Int
  }

  extend type Subscription {
    productsDelta: Product!
  }
`;
