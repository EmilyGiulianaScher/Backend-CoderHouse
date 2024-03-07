const fs = require('fs').promises;
const UserManager = require('./ManagerUsuarios');

class ProductManager {
    constructor(path) {
        this.path = path;
        this.products = []; // Definición del arreglo de productos
        this.userManager = new UserManager('Usuarios.json');
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (this.validateFields(title, description, price, thumbnail, code, stock) && this.isCodeUnique(code)) {
            const product = {
                id: this.nextId++,
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            };
            this.products.push(product); // Agregar producto al arreglo de productos
            console.log("Producto agregado:", product);
        }
    }


    validateFields(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            console.log("Todos los campos son obligatorios.");
            return false;
        }
        return true;
    }

    isCodeUnique(code) {
        if (this.products.some(product => product.code === code)) {
            console.log("Ya existe un producto con ese código.");
            return false;
        }
        return true;
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const product = this.products.find(product => product.id === id);
        if (product) {
            return product;
        } else {
            console.log("Producto no encontrado.");
        }
    }
}

  
const productManager = new ProductManager();
productManager.addProduct("remeras", "top rosado talle M", 10, "imagen1.jpg", "ABC123", 23);
productManager.addProduct("shorts", "negro, talle S", 15, "imagen2.jpg", "DEF456", 36);

console.log("Todos los productos:", productManager.getProducts());
console.log("Producto con id 1:", productManager.getProductById(1));
console.log("Producto con id 3:", productManager.getProductById(3)); // Debería mostrar "Producto no encontrado."


module.exports = ProductManager;