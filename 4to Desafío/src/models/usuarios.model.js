import { Mongoose } from "mongoose";

// definimos el esquiema: "schema"
const usuariosSchema = new Mongoose.Schema({
    nombre: String,
    apellido: String,
    email: String,
    edad: Number
})

// definir el modelo

const UsuariosModel = Mongoose.model("usuarios", usuariosSchema);

export default UsuariosModel;