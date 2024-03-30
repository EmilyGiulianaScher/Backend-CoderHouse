/**npm administrador de paquetes */
const express = require('express');
const PORT = 8080;
const app = express();
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(express.static("./src/public"))


//rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);





//*************************************************************** */
//modulo de express handlebars ahre
const exphbs = require("express-handlebars");
//import exphbs from express-handlebars

//motor de plantillas config
app.engine("handlebars", exphbs.engine());
//le decimos a express que cuando vea un archivo de extension "handlebars" utilice el motor de plantillas: "handlebars"
app.set("view engine", "handlebars");
//nuevamente le decimos que la vista de nuestra aplicacion es desarrollada con handlebars 
app.set("views", "./src/views");
 app.use("/", viewsRouter);

 
let arrayProductos =[]

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});