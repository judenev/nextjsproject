import { connect } from "@/dbconfig/connection"
import User from "@/Models/userModel"
import { NextRequest, NextResponse } from "next/server"
import bycrptjs from 'bcryptjs'


connect()
export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { firstName, lastName, email, mob, password } = reqBody
        // if user Exists
        const isUser = await User.findOne({ email })
         console.log( "",isUser);
         
        if (isUser) {
           return NextResponse.json({
                error: "User Already Exist"
            }, { status: 400 })
        }
        //Hasing password
        const salt = await bycrptjs.genSalt(10)
        const hsd_psswd = await bycrptjs.hash(password, salt)
        const newUser = new User({
            firstName,
            lastName,
            email,
            mob,
            password: hsd_psswd
        })
        const svdUser = await newUser.save()
        console.log(svdUser);
        return NextResponse.json({
            message: "User Created Successfully",
            success:true
        }, { status: 201 })

    } catch (error: any) {
        return NextResponse.json({ error: "user Already Existed with this email and Phone number",success:false })

    }
}