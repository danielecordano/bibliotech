import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import validator from "validator";

const PasswordType = new GraphQLScalarType({
  name: "Password",
  description: "A strong password.",
  parseValue: value => {
    if (validator.isStrongPassword(value)) {
      return value;
    }
    throw new ApolloError("Password must be a minimum of 8 characters in length and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character");
  },
  serialize: value => {
    if (validator.isStrongPassword(value)) {
      return value;
    }
    throw new ApolloError("Password must be a minimum of 8 characters in length and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character");
  },
  parseLiteral: ast => {
    if (validator.isStrongPassword(ast.value)) {
      return ast.value;
    }
    throw new ApolloError("Password must be a minimum of 8 characters in length and contain 1 lowercase letter, 1 uppercase letter, 1 number, and 1 special character");
  }
});

export default PasswordType;