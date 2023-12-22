import mongoose from "mongoose";
export async function connect() {
    try {

        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection
        connection.on('connected', () => {
            console.log("DataBase Connected");

        })
        connection.on('error', (err) => {
            console.log("MongoDB not Running" + err);
            process.exit()


        })
    } catch (error) {
        console.log(error);



    }
}