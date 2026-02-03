import { gql } from 'graphql-tag';

export const productSchema = gql`
  type Query {
    products: [Product!]!
    product(id: ID!): Product!
  }

  type Mutation {
    createProduct(product: CreateProductInput!): Product!
    updateProduct(id: ID!, data: UpdateProductInput!): Product!
    deleteProduct(id: ID!): Boolean!
  }

  type Product {
    id: ID!
    name: String!
    price: Float!
    description: String!
    stock: Int!
  }

  input CreateProductInput {
    name: String!
    price: Float!
    description: String!
    stock: Int!
  }

  input UpdateProductInput {
    name: String
    price: Float
    description: String
    stock: Int
  }

  type Subscription {
    productsDelta: Product!
  }
`;
