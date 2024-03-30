const express = require('express');
const router = express.Router();
const ProductManager = require("../controllers/ProductManager");

//ruta al json porque de otra forma no me deja 
const path = require('path');
const productManager = new ProductManager(path.join(__dirname, '..', 'models', 'products.json'));


// Endpoint para obtener todos los productos
router.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su id
router.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

//3) Agregar un nuevo producto: 

router.post("/products", async (req, res) => {
    const nuevoProducto = req.body; 

    try {
        await productManager.addProduct(nuevoProducto);
        res.status(201).json({message: "Producto agregado exitosamente"});
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})


//4) Actualizar por ID

router.put("/products/:pid", async (req, res) => {
    const id = req.params.pid;
    const productoActualizado = req.body; 

    try {
        await productManager.updateProduct(parseInt(id), productoActualizado);
        res.json({
            message: "Producto actualizado correctamente"
        });
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})

//5) Eliminar producto: 

router.delete("/products/:pid", async (req, res) => {
    const id = req.params.pid; 

    try {
        await productManager.deleteProduct(parseInt(id));
        res.json({
            message: "Producto eliminado exitosamente"
        });
    } catch (error) {
        res.status(500).json({error: "Error interno del servidor"});
    }
})
module.exports = router;