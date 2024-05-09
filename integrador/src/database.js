import mongoose from "mongoose";

mongoose.connect("mongodb+srv://emilygiulianascher:manchita@cluster0.hovlhnt.mongodb.net/coderest?retryWrites=true&w=majority&appName=Cluster0")

    .then( () => console.log("conectado a MONGO"))
    .catch( (error) => console.log("tenemos un error ayudaaa", error))

