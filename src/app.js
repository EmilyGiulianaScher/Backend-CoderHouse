/**npm administrador de paquetes */
const express = require('express');
const ProductManager = require('./main'); // Importar la clase ProductManager desde main.js

const app = express();
const PORT = 3000;

const productManager = new ProductManager(); // Crear una instancia de ProductManager

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
        const products = await productManager.getProducts(limit);
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Endpoint para obtener un producto por su id
app.get('/products/:pid', async (req, res) => {
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

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
