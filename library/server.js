const express = require('express');
const mongoose = require('mongoose');
const app = express();

const connect = () => {
    mongoose.connect('mongodb://127.0.0.1:27017/library', {
        useCreateIndex: true,
        useFindAndModify: false,
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
}
//first step create schema
// const userSchema = new mongoose.Schema({
//     movie_name: { type: String, required: true },
//     movie_genere: { type: String, required: true },
//     production_year: { type: Number, required: false, default: "Male" },
//    budget: { type: Number, required: true }
  
// })
// //second step is to create a model
// const User = mongoose.model('movies', userSchema)
app.use(express.json())

// app.get('/users', async (req, res) => {

//     try {
     
//         const users = await User.find().lean().exec();
//         res.send(users)
//     } catch (err) {
//         res.status(400).json({ status: "error", message: err.message })
//     }

// })
// app.get('/users/:id', async (req, res) => {
//     try {
     
//         const users = await User.find({ "_id": req.params.id }).lean().exec();
//         res.send(users)
//     } catch (err) {
//         console.log(err)
//     }
// })
// app.post('/users', async (req, res) => {
 
//     try {

//         const user = await User.create(req.body)
//         console.log(user)
//         res.status(201).json({ user })
//         // res.send({ user })
//         console.log("ranjan is posted")
//     } catch (err) {
//         res.status(400).json({ status: "error", message: err.message })
//     }

// })
// app.patch('/users/:id', async (req, res) => {

//     try {
//         const user = await User.findByIdAndUpdate(req.params.id, req.body,{new:true})

//         res.status(201).json({ user })
//     } catch (err) {
//         res.status(400).json({ status: "error", message: err.message })
//     }

// })

// app.delete('/users/:id', async (req, res) => {
//     try {
//         const user = await User.findByIdAndDelete(req.params.id, req.body)

//         res.status(201).json({ user })
//     } catch (err) {
//         res.status(400).json({ status: "error", message: err.message })
//     }

// })






// section
//Author section

const AuthorSchrma =new mongoose.Schema({
    first_name:{ type: String, required: true },
    last_name:{ type: String, required: true }
})
const User = mongoose.model('authors', AuthorSchrma)

const BookSchema =new  mongoose.Schema({
    Bookname:{type:String,required:true},
    body: { type: String, required: true },
    cheked: { type: Boolean, default:false},

    authorId: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'authors',
        required:true
    }],
    sectionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'sections',
        required:true
    }
})
const Books = mongoose.model('books', BookSchema)
const SectionSchema = new mongoose.Schema({
    title:{type:String,required:true},
  
})
const Section1 =mongoose.model("sections",SectionSchema)



// crud operations for author
// ---create aauthor
app.post("/authors", async (req, res) => {
    const user = await User.create(req.body)
    return res.status(201).json({ user })
})
app.get("/authors", async (req, res) => {
    const user = await User.find().lean().exec()

    return res.status(200).json({ user })
})
app.get("/authors:id", async (req, res) => {
    const user = User.find(req.params.id).lean().exec()
    return res.status(200).json({ user })
})

//book section
app.post("/books", async (req, res) => {
    const user = await Books.create(req.body)
    return res.status(201).json({ user })
})
app.get("/books", async (req, res) => {
    const user = await Books.find().populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ user })
})
app.get("/books/:id", async (req, res) => {
    const user = await Books.find({"authorId": {"_id": req.params.id } }).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ user })
})
//find book by section
app.get("/bysectionname/:id", async (req, res) => {
    const user = await Books.find({"sectionId": {"_id": req.params.id } }).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ user })
})
//find by checked 
app.get("/notchecked", async (req, res) => {
    const user = await Books.find({"cheked":false}).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ user })
})
app.get("/bysectionnamecheked/:id", async (req, res) => {
    const user = await Books.find({ $and: [{ "sectionId": { "_id": req.params.id } },{"cheked":false}]}).populate("authorId").populate("sectionId").lean().exec()
    return res.status(200).json({ user })
})



//
//section
app.post("/sections", async (req, res) => {
    const user = await Section1.create(req.body)
    return res.status(201).json({ user })
})
//find book by authirs name






//section

app.listen(3001, async () => {
    await connect();
    console.log("listening port 3001")
})



