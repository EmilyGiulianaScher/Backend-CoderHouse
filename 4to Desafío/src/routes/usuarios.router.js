const express = require('express');
const router = express.Router();

import UsuariosModel from '../models/usuarios.model';

//listado de todos los usuarios

router.get("/", async (rec, res) =>{
    try {
        const usuarios = await UsuariosModel.find();
        res.json(usuarios)
    } catch (error) {
        res.status(500).json("Error en el servidor")
        
    }
})

//SUBIMOS NUEVO USUARIO POR POSTMAN
router.post("/", async (rec, res) =>{
    const usuarioNuevo = req.body;
    try {
        const usuario = new UsuariosModel(usuarioNuevo);
        await usuario.save();
        res.send({message: "Usuario creado exitosamente", usuario: usuario})
    } catch (error) {
        res.status(500).json("Error en el servidor")
        
    }
})


export default router;