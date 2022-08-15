import { ApolloError } from "apollo-server";
import { GraphQLScalarType } from "graphql";
import validator from "validator";

const DateTimeType = new GraphQLScalarType({
  name: "DateTime",
  description: "An ISO 8601-encoded UTC date string.",
  parseValue: value => {
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  },
  serialize: value => {
    if (validator.isISO8601(value)) {
      return value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  },
  parseLiteral: ast => {
    if (validator.isISO8601(ast.value)) {
      return ast.value;
    }
    throw new ApolloError("DateTime must be a valid ISO 8601 date string");
  }
});

export default DateTimeType;