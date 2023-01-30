const { ApolloServer } = require('apollo-server-express');
const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');
const { loadFiles } = require('@graphql-tools/load-files');

const resolvers = require('./resolvers');

const useGraphql = async (app) => {
    const typeDefs = [
        ...await loadFiles('./src/**/*.graphql'),
    ];

    const server = new ApolloServer({
        typeDefs,
        resolvers,
        playground: true,
        plugins: [ ApolloServerPluginLandingPageGraphQLPlayground ],
    });

    await server.start();
    server.applyMiddleware({ app });
}

module.exports = useGraphql;