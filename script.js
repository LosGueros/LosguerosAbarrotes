const productos = [
  { nombre: "Arroz", imagen: "d.jpeg", precio: 20 },
  { nombre: "Frijol", imagen: "c.jpeg", precio: 18 },
  { nombre: "Azúcar", imagen: "b.jpeg", precio: 22 },
  { nombre: "Aceite", imagen: "e.jpeg", precio: 45 },
  { nombre: "Sal", imagen: "f.jpeg", precio: 10 },
  { nombre: "Leche", imagen: "g.jpeg", precio: 25 },
  { nombre: "Huevos", imagen: "h.jpeg", precio: 40 },
  { nombre: "Tortillas", imagen: "i.jpeg", precio: 15 },
  { nombre: "Jabón", imagen: "j.jpeg", precio: 12 },
  { nombre: "Papel Higiénico", imagen: "k.jpeg", precio: 30 },
];

let carrito = [];

function login() {
  const usuario = document.getElementById("usuario").value;
  const contrasena = document.getElementById("contrasena").value;
  if (usuario === "Berrios" && contrasena === "12345") {
    document.getElementById("loginContainer").style.display = "none";
    document.getElementById("contenido").style.display = "block";
    mostrarProductos();
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

function mostrarProductos() {
  const contenedor = document.getElementById("listaProductos");
  productos.forEach((prod, i) => {
    contenedor.innerHTML += `
      <div>
        <img src="${prod.imagen}" width="100" />
        <p>${prod.nombre} - $${prod.precio}</p>
        <button onclick="agregar(${i})">Comprar</button>
      </div>
    `;
  });
}

function agregar(i) {
  carrito.push(productos[i]);
  actualizarCarrito();
}

function eliminar(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

function actualizarCarrito() {
  let html = "<h3>Tu Pedido:</h3>";
  carrito.forEach((p, index) => {
    html += `<p>${p.nombre} - $${p.precio} <button onclick="eliminar(${index})">Eliminar</button></p>`;
  });

  html += `<button onclick="enviarCorreo()">Enviar pedido</button>
           <button onclick="imprimirTicket()">Imprimir Ticket</button>`;

  document.getElementById("carrito").innerHTML = html;
}

function enviarCorreo() {
  alert("Pedido enviado a abarrotes2703@gmail.com");
}

async function imprimirTicket() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Ticket de Compra - Los Güeros", 10, 20);
  doc.setFontSize(12);

  let y = 30;
  let total = 0;

  carrito.forEach((p) => {
    doc.text(`${p.nombre} - $${p.precio}`, 10, y);
    y += 10;
    total += p.precio;
  });

  doc.line(10, y, 200, y);
  y += 10;
  doc.text(`Total: $${total}`, 10, y);
  y += 10;
  doc.text("Gracias por tu compra, Claudia Berrios", 10, y);

  doc.save("ticket-los-gueros.pdf");
}

