import { PracticeResolver } from '../practice/resolver.js';
import { CaseResolver } from '../case/resolver.js';
export const resolvers = {
    Query: {
        ...PracticeResolver.Query,
        ...CaseResolver.Query,
    },
    Mutation: {
        ...PracticeResolver.Mutation,
        ...CaseResolver.Mutation,
    },
};
