const express = require('express');
const PORT = 8080;
const app = express();
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const socket = require("socket.io");
//modulo de express handlebars 
const exphbs = require("express-handlebars");
//import exphbs from express-handlebars

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static("./src/public"))


//rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);
app.use("/", viewsRouter);


//*************************************************************** */

//motor de plantillas config
app.engine("handlebars", exphbs.engine());
//le decimos a express que cuando vea un archivo de extension "handlebars" utilice el motor de plantillas: "handlebars"
app.set("view engine", "handlebars");
//nuevamente le decimos que la vista de nuestra aplicacion es desarrollada con handlebars 
app.set("views", "./src/views");
app.use("/", viewsRouter);

const httpServer = app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});


const io = socket (httpServer);


//Obtengo el array de productos: 
const ProductManager = require("./controllers/ProductManager.js");
const productManager = new ProductManager("./src/models/products.json");

io.on("connection", async (socket) => {
    console.log("un cliente se conecto");

    //Enviamos el array de productos al cliente: 
    socket.emit("products", await productManager.getProducts());

     //Recibimos el evento "eliminarProducto" desde el cliente: 
     socket.on("eliminarProduct", async (id) => {
        await productManager.deleteProduct(id);
        //Enviamos el array de productos actualizados: 
        socket.emit("products", await productManager.getProducts());
    })

    //Recibimos el evento "agregarProducto" desde el cliente: 
    socket.on("agregarProduct", async (product) => {
        await productManager.addProduct(product);
        socket.emit("products", await productManager.getProducts());
    })
})











// nos conectamos a MongoAtlas por medio de mongoose:

const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://emilygiulianascher:manchita@cluster0.hovlhnt.mongodb.net/MiTienda?retryWrites=true&w=majority&appName=Cluster0")
    .then(() => console.log("Conectados a la BD!!"))
    .catch((error) => console.log("Tenemos un error, VAMOS A MORIR: ", error))

