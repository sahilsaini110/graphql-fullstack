const graphql = require('graphql');
const lo = require('lodash');

const {GraphQLObjectType, 
    GraphqlQLString, 
    GraphQLSchema,
    GraphQLID
}=graphql;

// dummy data

var books = [
    {name:'hello', genre:'kick',id:'1'},
    {name:'hello2', genre:'kick1',id:'2'},
    {name:'hello3', genre:'kick2',id:'3'}
]

const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type: GraphqlQLString},
        genre:{type: GraphqlQLString}
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        book: {
            type:BookType,
            args:{id:{type: GraphQLID}},
            resolve(parent,args){
                // code to get data from db / other resources
               return lo.find(books,{id:args.id});
            }
        }
    }
});

module.export = new GraphQLSchema({
    query: RootQuery
});