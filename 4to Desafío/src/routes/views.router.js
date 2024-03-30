const express =  require("express");
const router = express.Router();


//ruta
router.get("/", (req, res) => {
    const usuario = {
        nombre: "mamiol",
        apellido: "demamiol"
    }
    res.render("index", {usuario, title: "Cuarta entrega"});
})

router.get("/contacto", (req, res) => {
    res.render("contacto");
})

module.exports = router;