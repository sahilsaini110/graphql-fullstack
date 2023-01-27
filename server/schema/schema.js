const graphql = require('graphql');
const lo = require('lodash');

const {GraphQLObjectType, 
    GraphQLString, 
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
}=graphql;

// dummy data

var books = [
    {name:'hello', genre:'kick',id:'1',authorid:"1"},
    {name:'hello2', genre:'kick1',id:'2',authorid:"2"},
    {name:'hello3', genre:'kick2',id:'3',authorid:"3"}
];

var authors = [
    {name:'hello11', age:55,id:'1'},
    {name:'hello12', age:25,id:'2'},
    {name:'hello13', age:33,id:'3'}
];
 


const BookType = new GraphQLObjectType({
    name:'Book',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        genre:{type: GraphQLString},
        author:{
            type: AuthorType,
            resolve(parent,args){
                return lo.find(author,{id:parent.authorid});
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name:'Author',
    fields:() =>({
        id:{type: GraphQLID},
        name:{type: GraphQLString},
        age:{type: GraphQLInt},
        book:{
            type: new GraphQLList(BookType),
            resolve(parent,args){
                return lo.filter(books,{authorid:parent.id});
            }
        }
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
        },

        author:{
            type: AuthorType,
            args:{id:{type:GraphQLID}},
            resolve(parent,args){
                return lo.find(authors, {id:args.id});
            }
        },

        books:{
            type:new GraphQLList(BookType),
            resolve(parent,args){
                return books;
            }
        },
        authors:{
            type:new GraphQLList(AuthorType),
            resolve(parent,args){
                return authors;
            }
        },
    }
});

module.export = new GraphQLSchema({
    query: RootQuery
});

// mongodb+srv://sahilsaini110:#Sahilsaini110@cluster0.qm4f15a.mongodb.net/?retryWrites=true&w=majority
//  sahilsaini110 user