const express =  require("express");
const router = express.Router();


const ProductManager = require("../controllers/ProductManager");
const productManager = new ProductManager("./src/models/products.json");

//ruta
router.get("/",  async (req, res) => {

    try {
        const products = await productManager.getProducts();    
        res.render("home", {products:products, title: "Cuarta entrega"});
    
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"})
    }
})

router.get("/contacto", (req, res) => {
    res.render("contacto");
})

router.get("/home", (req, res) => {
    res.render("home");
})

router.get("/realTimeProducts",  (req, res) => {
    res.render("realTimeProducts");
})


module.exports = router;