/*socket.io lado del cliente*/
const socket = io();

socket.emit("mensaje", "hola mundo! soy el cliente");

socket.on("products", (data) => {
    renderProducts(data);
})

const renderProducts = (products) => {
    const contenedorProducts = document.getElementById("contenedorProducts");
    contenedorProducts.innerHTML = "";

    products.forEach(item => {
        const card = document.createElement("div");
        card.innerHTML = `
                            <p> ID: ${item.id} </p>
                            <p> Titulo:  ${item.title} </p>
                            <p> Precio: ${item.price} </p>
                            <button> Eliminar producto </button>
                        `;
        contenedorProducts.appendChild(card);
    
        //Agregamos el evento al boton de eliminar producto: 
        card.querySelector("button").addEventListener("click", () => {
            eliminarProduct(item.id)
        }) 
    })
}

//Eliminar producto: 

const eliminarProduct = (id) => {
    socket.emit("eliminarProduct", id);
}

//Agregar producto: 

document.getElementById("btnEnviar").addEventListener("click", () => {
    agregarProduct();
})

const agregarProduct = () => {
    const product = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        price: document.getElementById("price").value,
        img: document.getElementById("img").value,
        code: document.getElementById("code").value,
        stock: document.getElementById("stock").value,
        category: document.getElementById("category").value,
        status: document.getElementById("status").value === "true"
    };
    socket.emit("agregarProduct", product);
}