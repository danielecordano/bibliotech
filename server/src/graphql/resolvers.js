import DateTimeType from "./scalars/DateTimeType.js";
import PasswordType from "./scalars/PasswordType.js";
import RatingType from "./scalars/RatingType.js";

const resolvers = {
    DateTime: DateTimeType,
    Password: PasswordType,
    Rating: RatingType,
    AuthorOrderBy: {
    NAME_ASC: "name_asc",
    NAME_DESC: "name_desc"
  },
  BookOrderBy: {
    TITLE_ASC: "title_asc",
    TITLE_DESC: "title_desc"
  },
  LibraryOrderBy: {
    ADDED_ON_ASC: "createdAt_asc",
    ADDED_ON_DESC: "createdAt_desc"
  },
  ReviewOrderBy: {
    REVIEWED_ON_ASC: "createdAt_asc",
    REVIEWED_ON_DESC: "createdAt_desc"
  },
  Person: {
    __resolveType(obj, context, info) {
      if (obj.username) {
        return "User";
      } else {
        return "Author";
      }
    }
  },
  BookResult: {
    __resolveType(obj, context, info) {
      if (obj.title) {
        return "Book";
      } else {
        return "Author";
      }
    }
  },
  Author: {
    books(author, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorBooks(author.id);
    }
  },
  Book: {
      authors(book, args, { dataSources }, info) {
          return dataSources.jsonServerApi.getBookAuthors(book.id);
        },
      reviews(book, args, { dataSources }, info) {
          return dataSources.jsonServerApi.getBookReviews(book.id, args);
      }
  },
  Review: {
    book(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(review.bookId);
    },
    reviewedOn(review, args, { dataSources }, info) {
      return review.createdAt;
    },
    reviewer(review, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserById(review.userId);
    }
  },
  User: {
    library(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserLibrary(user.id, args);
    },
    reviews(user, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getUserReviews(user.id, args);
    }
  },
  Query: {
    author(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthorById(id);
    },
    authors(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getAuthors(args);
    },
    book(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getBookById(id);
    },
    books(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.getBooks(args);
    },
    review(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.getReviewById(id);
    },
    searchPeople(root, args, {dataSources}, info) {
      return dataSources.jsonServerApi.searchPeople(args);
    },
    searchBooks(root, args, {dataSources}, info) {
      return dataSources.jsonServerApi.searchBooks(args);
    },
    user(root, { username }, { dataSources }, info) {
      return dataSources.jsonServerApi.getUser(username);
    },
    viewer(root, args, { dataSources, user }, info) {
      if (user?.username) {
        return dataSources.jsonServerApi.getUser(user.username);
      }
      return null;
    }
  },
  Mutation: {
    signUp(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.signUp(input);
    },
    login(root, args, { dataSources }, info) {
      return dataSources.jsonServerApi.login(args);
    },
    logout(root, args, context, info) {
      return true;
    },
    createAuthor(root, { name }, { dataSources }, info) {
      return dataSources.jsonServerApi.createAuthor(name);
    },
    createBook(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createBook(input);
    },
    createReview(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.createReview(input);
    },
    deleteReview(root, { id }, { dataSources }, info) {
      return dataSources.jsonServerApi.deleteReview(id);
    },
    updateReview(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.updateReview(input);
    },
    addBooksToLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.addBooksToLibrary(input);
    },
    removeBooksFromLibrary(root, { input }, { dataSources }, info) {
      return dataSources.jsonServerApi.removeBooksFromLibrary(input);
    }
  }
};
  
export default resolvers;
