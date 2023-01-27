const graphql = require('graphql');

const {GraphQLObjectType, GraphqlQLString}=graphql;

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() =>({
        id:{type: GraphqlQLString},
        name:{type: GraphqlQLString},
        genre:{type: GraphqlQLString}
    })
});