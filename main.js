const fs = require("fs").promises;

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.nextId = 1;
    this.loadProductsFromFile();
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    if (
      !this.validateFields(title, description, price, thumbnail, code, stock) ||
      !this.isCodeUnique(code)
    ) {
      return;
    }

    const id = this.nextId++;
    const product = {
      id,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(product);
    await this.saveProductsToFile();
    console.log("Producto agregado:", product);
  }

  async saveProductsToFile() {
    try {
      await fs.writeFile(
        this.path,
        JSON.stringify(this.products, null, 2),
        "utf-8"
      );
      console.log("Productos guardados en el archivo.");
    } catch (error) {
      console.error("Error al guardar productos en el archivo:", error);
    }
  }

  async loadProductsFromFile() {
    try {
      const data = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(data);
      const lastProduct = this.products[this.products.length - 1];
      if (lastProduct) {
        this.nextId = lastProduct.id + 1;
      }
      console.log("Productos cargados desde el archivo.");
    } catch (error) {
      if (error.code === "ENOENT") {
        console.warn("El archivo no existe. Se creará uno nuevo.");
        await this.saveProductsToFile();
      } else {
        console.error("Error al cargar productos desde el archivo:", error);
      }
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
    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un producto con ese código.");
      return false;
    }
    return true;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log("Producto no encontrado.");
    }
  }

  async updateProduct(id, updatedProduct) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.log(`Producto con ID "${id}" no encontrado.`);
      return;
    }

    this.products[index] = { ...this.products[index], ...updatedProduct };
    await this.saveProductsToFile();
    console.log(`Producto con ID "${id}" actualizado.`);
  }

  async deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index === -1) {
      console.log(`Producto con ID "${id}" no encontrado.`);
      return;
    }

    this.products.splice(index, 1);
    await this.saveProductsToFile();
    console.log(`Producto con ID "${id}" eliminado.`);
  }
}

//TESTING

function runTests() {
    const productManager = new ProductManager(
      "C:/Users/Giuli/Desktop/Backend/Primer-Desafio/masterproducts.json"
    );
  
    productManager
      .addProduct(
        "producto 1",
        "Este es un producto prueba",
        200,
        "Sin imagen",
        "abc123",
        25
      )
      .then(() => {
        console.log("Productos después de agregar:", productManager.products);
        const productId = productManager.products[0].id;
        return productManager.updateProduct(productId, {
          title: "Nuevo título",
          description: "Nueva descripción",
        });
      })
      .then(() => {
        const productId = productManager.products[0].id;
        console.log(
          "Producto actualizado:",
          productManager.getProductById(productId)
        );
        return productManager.deleteProduct(productId);
      })
      .then(() => {
        console.log(
          "Productos después de eliminar:",
          productManager.products
        );
        return productManager.addProduct(
          "producto 2",
          "Este es el producto 2",
          150,
          "Con imagen",
          "xyz987",
          10
        );
      })
      .then(() => {
        return productManager.addProduct(
          "producto 3",
          "Este es el producto 3",
          300,
          "Otra imagen",
          "def456",
          30
        );
      })
      .then(() => {
        console.log("Productos después de agregar más:", productManager.products);
      })
      .catch((error) => {
        console.error("Error en la ejecución de las pruebas:", error);
      });
  }
  
  runTests();
  
