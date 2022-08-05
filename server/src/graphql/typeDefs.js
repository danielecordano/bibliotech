import { gql } from "apollo-server";

const typeDefs = gql`
  enum Genre {
    ADVENTURE
    CHILDREN
    CLASSICS
    COMIC_GRAPHIC_NOVEL
    DETECTIVE_MYSTERY
    DYSTOPIA
    FANTASY
    HORROR
    HUMOR
    NON_FICTION
    SCIENCE_FICTION
    ROMANCE
    THRILLER
    WESTERN
  }

  enum AuthorOrderBy {
    NAME_ASC
    NAME_DESC
  }

  enum BookOrderBy {
    TITLE_ASC
    TITLE_DESC
  }

  enum LibraryOrderBy {
    ADDED_ON_ASC
    ADDED_ON_DESC
  }

  enum ReviewOrderBy {
    REVIEWED_ON_ASC
    REVIEWED_ON_DESC
  }

  enum SearchOrderBy {
    RESULT_ASC
    RESULT_DESC
  }

  interface Person {
    id: ID!
    name: String!
  }

  union BookResult = Book | Author

  type Author implements Person {
    id: ID!
    books: [Book]
    name: String!
  }

  type Authors {
    results: [Author]
    pageInfo: PageInfo
  }

  type Book {
    id: ID!
    authors: [Author]
    cover: String
    genre: Genre
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews
    summary: String
    title: String!
  }

  type Books {
    results: [Book]
    pageInfo: PageInfo
  }

  type Review {
    id: ID!
    book: Book
    rating: Int!
    reviewedOn: String!
    reviewer: User!
    text: String
  }

  type Reviews {
    results: [Review]
    pageInfo: PageInfo
  }

  type User implements Person {
    id: ID!
    email: String!
    library(limit: Int = 20, orderBy: LibraryOrderBy, page: Int): Books
    name: String!
    reviews(limit: Int = 20, orderBy: ReviewOrderBy, page: Int): Reviews
    username: String!
  }

  type PageInfo {
    hasNextPage: Boolean
    hasPrevPage: Boolean
    page: Int
    perPage: Int
    totalCount: Int
  }

  type Query {
    author(id: ID!): Author
    authors(limit: Int = 20, orderBy: AuthorOrderBy, page: Int): Authors
    book(id: ID!): Book
    books(limit: Int = 20, orderBy: BookOrderBy, page: Int): Books
    review(id: ID!): Review
    searchPeople(
      exact: Boolean = false
      orderBy: SearchOrderBy
      query: String!
    ): [Person]
    searchBooks(
      exact: Boolean = false
      orderBy: SearchOrderBy
      query: String!
    ): [BookResult]
    user(username: String!): User
  }

  input CreateBookInput {
    authorIds: [ID]
    cover: String
    genre: Genre
    summary: String
    title: String!
  }

  input CreateReviewInput {
    bookId: ID!
    rating: Int!
    reviewerId: ID!
    text: String
  }

  input UpdateReviewInput {
    id: ID!
    rating: Int!
    text: String
  }

  input SignUpInput {
    email: String!
    name: String!
    username: String!
  }

  input UpdateLibraryBooksInput {
    bookIds: [ID!]!
    userId: ID!
  }

  type Mutation {
    createAuthor(name: String!): Author!
    createBook(input: CreateBookInput!): Book!
    createReview(input: CreateReviewInput!): Review!
    deleteReview(id: ID!): ID!
    updateReview(input: UpdateReviewInput!): Review!
    signUp(input: SignUpInput!): User!
    addBooksToLibrary(input: UpdateLibraryBooksInput!): User!
    removeBooksFromLibrary(input: UpdateLibraryBooksInput!): User!
  }
  `;

export default typeDefs;