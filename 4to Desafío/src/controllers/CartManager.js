const fs = require("fs").promises;

class CartManager {
    constructor(path) {
        this.carts = [];
        this.path = path;
        this.ultId = 0;

        this.cargarCarritos();
    }

    async cargarCarritos() {
        try {
            const data = await fs.readFile(this.path, "utf-8");
            this.carts = JSON.parse(data);
            if (this.carts.length > 0) {
                this.ultId = Math.max(...this.carts.map(cart => cart.id));
            }
        } catch (error) {
            console.log("Error al crear los carritos: ", error);
            await this.guardarCarritos();
        }
    }

    async guardarCarritos() {
        await fs.writeFile(this.path, JSON.stringify(this.carts, null, 2));
    }

    async crearCarrito() {
        const nuevoCarrito = {
            id: ++this.ultId,
            products: []
        }

        this.carts.push(nuevoCarrito);

        await this.guardarCarritos();
        return nuevoCarrito;
    }

    async getCarritoById(carritoId) {
        try {
            const carrito = this.carts.find(c => c.id === carritoId);

            if (!carrito) {
                console.log("No hay carrito con ese id");
                return;
            }

            return carrito;
        } catch (error) {
            console.log("Error al obtener un carrito por id: ", error);
        }
    }

    async agregarProductAlCarrito(carritoId, productId, quantity = 1) {
        if (typeof carritoId !== 'number' || typeof productId !== 'number') {
            throw new Error('Los IDs del carrito y del producto deben ser números.');
        }
        const carrito = await this.getCarritoById(carritoId);
        const existeProduct = carrito.products.find(p => p.product === productId);

        if (existeProduct) {
            existeProduct.quantity += quantity;
        } else {
            carrito.products.push({ product: productId, quantity });
        }

        await this.guardarCarritos();
        return carrito;
    }
}

module.exports = CartManager;