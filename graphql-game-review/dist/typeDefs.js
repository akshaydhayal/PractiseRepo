export const typeDefs = `#graphql

    type Game{
        id:ID!,
        name:String!,
        platforms:[String!]!
    }
    type Author{
        id:ID!
        name:String!,
    }
    type Review{
        id:ID!,
        rating:Int,
        content:String
    }

    type Query{
        games:[Game!]
        authors:[Author!]
        reviews:[Review!]
    }
    
`;
