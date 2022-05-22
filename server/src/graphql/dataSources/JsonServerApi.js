import { RESTDataSource } from "apollo-datasource-rest";

class JsonServerApi extends RESTDataSource {
  baseURL = process.env.REST_API_BASE_URL;

  getAuthorById(id) {
      return this.get(`/authors/${id}`).catch(
          err => err.message === "404: Not Found" && null
      );
  }

  async getAuthorBooks(authorId) {
      const items = await this.get(`/authors/${authorId}/books`);
      return items.map(item => item.book);
  }

  getAuthors() {
      return this.get(`/authors`);
  }

  getBookById(id) {
    return this.get(`/books/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
  }

  async getBookAuthors(bookId) {
    const items = await this.get(`/books/${bookId}/authors`);
    return items.map(item => item.author);
  }

  getBooks() {
    return this.get(`/books`);
  }

  getReviewById(reviewId) {
    return this.get(`/reviews/${reviewId}`).catch(
        err => err.message === "404: Not Found" && null
    );
  }

  getBookReviews(bookId) {
    return this.get(`/reviews?bookId=${bookId}`);
  }

  getUserById(id) {
    return this.get(`/users/${id}`).catch(
      err => err.message === "404: Not Found" && null
    );
  }
    
  async getUserLibrary(userId) {
    const items = await this.get(`/users/${userId}/books`);
    return items.map(item => item.book);
  }

  getUserReviews(userId) {
    return this.get(`/reviews?userId=${userId}`);
  }

  async getUser(username) {
    const [user] = await this.get(`/users?username=${username}`);
    return user;
  }
}

export default JsonServerApi;