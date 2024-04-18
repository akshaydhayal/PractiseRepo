// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";

// export const authOptions={
//     providers:[
//         GoogleProvider({
//             clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//             clientSecret:process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY
//         })
//     ]
// }
// export default NextAuth(authOptions);





import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions={
    providers:[
        GoogleProvider({
            clientId:process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_GOOGLE_SECRET_KEY
        }),
        GithubProvider({
            clientId:process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID,
            clientSecret:process.env.NEXT_PUBLIC_GITHUB_SECRET_KEY
        })
    ]
}
export default NextAuth(authOptions);