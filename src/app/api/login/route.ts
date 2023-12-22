import { connect } from "@/dbconfig/connection"
import User from "@/Models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'


connect()

export  async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        console.log("userBody",reqBody);
        
        const { email, password } = reqBody
        const isUser = await User.findOne({ email })
        console.log(isUser);

        if (isUser) {
            const userFound = await bcryptjs.compare(password, isUser.password)
            if(userFound){

                const token = jwt.sign({user:email},process.env.SECRET_KEY,{ expiresIn: '1d' })
                console.log("token",token);
                return NextResponse.json({
                     found: true,
                     message: 'User  Found',
                     token
     
                 }, { status:200  })
            }


        } else {
           return NextResponse.json({
                found: false,
                message: 'User Not Found'

            },)
        }



    } catch (error: any) {
        console.log(error);
      
        
      return  NextResponse.json({
            found: false,
            message: error.message
        })



    }
}