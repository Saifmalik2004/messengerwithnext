import bcrypt from 'bcrypt';
import NextAuth,{AuthOptions} from 'next-auth';
import CredentialsProvider  from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prismadb from './prismadb';

export const authOptions:AuthOptions={
    adapter:PrismaAdapter(prismadb),
    providers:[
        GithubProvider({
            clientId:process.env.GITHUB_ID as string,
            clientSecret:process.env.GITHUB_SECRET as string
        }),
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:"credentials",
            credentials:{
                email: { label: "email", type: "text",  },
                password: { label: "password", type: "password" }
            },
            async authorize(credentials:any):Promise<any>  {
               if(!credentials?.email || !credentials?.password){
                throw new Error('Invalid Credential');
               }
                try {
                  const user=  await prismadb.user.findUnique({
                   where:{
                    email:credentials.email
                   }
                  });
    
                    if(!user || !user?.hashedPassword){
                        throw new Error("No user found with this email")
                    }
    
                    
                  const isPasswordCorrect=  await bcrypt.compare(credentials.password,user.hashedPassword)
    
                  if(isPasswordCorrect){
                   return user
                  }else{
                    throw new Error("Incorrect Password")
                  }

                  return user;
                } catch (err:any) {
                    throw new Error(err)
                }
            }
        })
    ],
    debug:process.env.NODE_ENV ==="development",
    session:{
        strategy:"jwt"
    },
    secret:process.env.NEXTAUTH_SECRET,
}
