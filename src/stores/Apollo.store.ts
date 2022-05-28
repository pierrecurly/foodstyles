import { DocumentNode } from "graphql";
import { action, makeObservable, observable } from 'mobx';
import initClient from "../libs/apollo/client";

class ApolloGraphQL {
  client = initClient();

  constructor() {
    makeObservable(this, {
      client: observable,
      query: action,
      mutation: action
    })
  }

  async query(query: DocumentNode, variables = {}) {
    return await this.client.query({ query, fetchPolicy: "network-only", variables });
  };

  async mutation(mutation: DocumentNode, variables = {}) {
    return await this.client.mutate({ mutation, variables });
  };
}

export default ApolloGraphQL;
