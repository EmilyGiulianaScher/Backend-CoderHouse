/**npm administrador de paquetes */
const express = require('express');
const PORT = 8080;
const app = express();
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");


//Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));



//rutas
app.use("/api", productsRouter);
app.use("/api", cartsRouter);



app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
