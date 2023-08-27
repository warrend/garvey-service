import { ApolloServer } from '@apollo/server';
import pg from 'pg';
import { startStandaloneServer } from '@apollo/server/standalone';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/index.js';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';
const { Pool } = pg;
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'garvey-service',
    user: 'daniel',
    password: 'password',
});
// const resolvers = {
//   Query: {
// locations: () => [],
// cases: () => [],
// patients: () => [],
// doctors: () => [],
//   practiceName: () => data.practiceName,
//   getPatient: (_, { id }, context) =>
//     data.patients.filter((p) => p.id === id),
//   getDoctor: (_, { id }, context) => data.doctors.filter((d) => d.id === id),
//   getCaseById: (_, { id }, context) => {
//     return data.cases.find((c) => c.id === id);
//   },
//   getCasesArrivingToday: () =>
//     data.cases.filter((c) => c.status === 'ARRIVED'),
// },
// Mutation: {
//   createPatient: (_, { input }, context) => {
//     const newPatient = {
//       ...input,
//       id: '1234',
//     };
//     data.patients.push(newPatient);
//     return newPatient;
//   },
//   updateCase: (_, { input, id }, context) => {
//     return {
//       error: {
//         message: 'There was an error',
//         inputErrors: {
//           createdAt: 'Must be a date',
//         },
//       },
//     };
//   },
//   },
// };
const typeDefs = loadSchemaSync('./**/*.graphql', {
    loaders: [new GraphQLFileLoader()],
});
const schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});
const server = new ApolloServer({
    // schema: addMocksToSchema({
    //   schema,
    // }),
    schema,
});
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context: async () => ({
        pool,
    }),
});
console.log(`🚀  Server ready at: ${url}`);
