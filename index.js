const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

const contact = require("./models/contact_schema")

const url = `mongodb+srv://admin:admin@cluster0.etn6vsz.mongodb.net/?retryWrites=true&w=majority`

const PORT = 8090

mongoose.connect(url).then((success) => {
    console.log("connection successful")
}).catch((e) => {
    console.log(e, "connection not successful")
}).finally(() => {
    console.log("finally")
})

app.get('/', (req, res) => {
    res.send("App started")
})

app.post('/v1/contacts', async (req, res) => {
    try {
        const { firstName, lastName, email, phone } = req.body;
        console.log(req.body)
        if (!firstName) {
            return res.status(400).send({
                err: "please enter firstName"
            })
        }
        if (!lastName) {
            return res.status(400).send({
                err: "please enter lastName"
            })
        }
        if (!email) {
            return res.status(400).send({
                err: "please enter email"
            })
        }
        if (!phone) {
            return res.status(400).send({
                err: "please enter phone"
            })
        }
        const check_email = await contact.findOne({ email })
        console.log(check_email)
        if (check_email) {
            return res.status(400).send({
                err: "Email or phone no already exist"
            })
        }
        const contact_data = await contact.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        })
        return res.json({
            status: "success",
            message: "contact created successfully",
            contact_data
        })
    } catch (e) {
        return res.status(400).json({
            status: "Failed",
            message: e.message
        })
    }
})

app.get('/v1/contacts', async (req, res) => {
    try {
        const contact_data = await contact.find({})
        return res.json({
            status: "success",
            message: "data retrieved",
            contact_data
        })
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

app.get('/v1/contacts/:id', async (req, res) => {
    try {
        const contact_data = await contact.find({ _id: req.params.id })
        console.log(contact_data)
        if(!contact_data){
            return res.status(404).json({
                error: "There is no contact with that id"
            })
        }
        return res.json({
            status: "success",
            message: "data retrieved",
            contact_data
        })
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            error: "There is no contact with that id"
        })
    }
})

app.delete('/v1/contacts/:id', async (req, res) => {
    try {
        const contact_data = await contact.findByIdAndDelete({ _id: req.params.id })
        return res.status(204).end()
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

app.put('/v1/contacts/:id', async (req, res) => {
    try {
        const contact_data = await contact.findByIdAndUpdate({ _id: req.params.id }, req.body)
        console.log(contact_data)
        if(!contact_data){
            return res.status(404).json({
                error: "There is no contact with that id"
            })
        }
        return res.status(204).end()
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

app.patch('/v1/contacts/:id', async (req, res) => {
    try {
        const contact_data = await contact.findByIdAndUpdate({ _id: req.params.id }, req.body)
        if(!contact_data){
            return res.status(404).json({
                error: "There is no contact with that id"
            })
        }
        return res.status(204).end()
    } catch (e) {
        return res.status(400).json({
            status: "failed",
            message: e.message
        })
    }
})

app.listen(PORT, () => { console.log(`App is listening at ${PORT}`) })