// ==========================
// CARRITO RACK 51
// ==========================

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
// Actualizar contador del carrito
const contador = document.getElementById("contador");

if(contador){
    contador.innerHTML = carrito.length;
}

// Agregar productos
const botones = document.querySelectorAll(".agregar");

botones.forEach(boton => {

    boton.addEventListener("click", () => {

    const producto = {
    nombre: boton.dataset.nombre,
    precio: Number(boton.dataset.precio),
    imagen: boton.dataset.imagen,
    cantidad: 1
};

const existe = carrito.find(p => p.nombre === producto.nombre);

if(existe){
    existe.cantidad++;
}else{
    carrito.push(producto);
}

localStorage.setItem("carrito", JSON.stringify(carrito));

if(contador){
    contador.textContent = carrito.reduce((suma,p)=>suma+p.cantidad,0);
}

mostrarNotificacion(producto.nombre + " agregado al carrito 🛒");
    });

});

// Mostrar carrito
const contenedor = document.getElementById("productosCarrito");

if(contenedor){

    
let total = 0;

carrito.forEach((producto, indice)=>{

    total += producto.precio * producto.cantidad;

    contenedor.innerHTML += `
    <div class="producto">

        <img src="${producto.imagen}">

        <h3>${producto.nombre}</h3>

        <p>$${producto.precio.toLocaleString("es-AR")}</p>

        <div class="cantidad">

            <button onclick="restar(${indice})">➖</button>

            <span>${producto.cantidad}</span>

            <button onclick="sumar(${indice})">➕</button>

        </div>

        <button onclick="eliminar(${indice})">
            ❌ Eliminar
        </button>
        
    </div>
    `;
});

document.getElementById("total").textContent = total.toLocaleString("es-AR");


}

function eliminar(indice){

    carrito.splice(indice,1);

    localStorage.setItem("carrito",JSON.stringify(carrito));

    location.reload();

}
function sumar(indice){

    carrito[indice].cantidad++;

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

function restar(indice){

    if(carrito[indice].cantidad > 1){

        carrito[indice].cantidad--;

    }else{

        carrito.splice(indice,1);

    }

    localStorage.setItem("carrito", JSON.stringify(carrito));

    location.reload();

}

const finalizar = document.getElementById("finalizar");

if(finalizar){

finalizar.onclick=()=>{

let mensaje="Hola! Quiero realizar este pedido:%0A%0A";

let total=0;

carrito.forEach(producto=>{

mensaje += `• ${producto.nombre} x${producto.cantidad} - $${(producto.precio * producto.cantidad).toLocaleString("es-AR")}%0A`;

total += producto.precio * producto.cantidad;

});

mensaje+=`%0ATotal: $${total}`;

window.open("https://wa.me/5493875110498?text="+mensaje);

}

}
function mostrarNotificacion(texto){

    const aviso = document.createElement("div");

    aviso.className = "notificacion";

    aviso.innerText = texto;

    document.body.appendChild(aviso);

    setTimeout(()=>{
        aviso.classList.add("mostrar");
    },100);

    setTimeout(()=>{
        aviso.remove();
    },2500);
}
const arriba=document.getElementById("arriba");

if(arriba){

window.addEventListener("scroll",()=>{

if(window.scrollY>300){

arriba.style.display="block";

}else{

arriba.style.display="none";

}

});

arriba.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}
