import mongoose from "mongoose";
const url = "mongodb+srv://isabellematielobg022_db_user:pjMFAu4rexgGNPxr@cluster0.nnaix8u.mongodb.net/?appName=Cluster0"
const conexao = await mongoose.connect(url)

export default conexao