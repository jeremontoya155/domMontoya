//Constructors para las clases utilizadas
class Turno {
  constructor(dia, nombre, horario) {
    this.dia = dia;
    this.nombre = nombre;
    this.horario = horario;
  }

  comp() {
    return `${this.dia}${this.horario}`;
  }
  mostrar() {
    alert(`
      ${this.nombre}
      ${this.dia}
      ${this.horario}
      `);
  }
}

class Producto {
  constructor(id, nombreP, marca, precio) {
    this.id = id;
    this.nombreP = nombreP;
    this.marca = marca;
    this.precio = precio;
  }
  compa() {
    return `${this.nombreP}${this.marca}`;
  }
  muestreo() {
    alert(`

      ${this.id}
      ${this.nombreP}
      ${this.marca}
      ${this.precio}

    `);
  }
}

//Genero la variable que almacenaran los turnos

let turnos = [];
let productos = [];
const fragment = document.createDocumentFragment();
const tabla_productos = document.getElementById("tabla-productos");

let producto_uno = new Producto(1, "Cera", "Gran Bastardo", 700);
let producto_dos = new Producto(2, "Cera", "Mr Blonde", 850);
let producto_tres = new Producto(3, "Texturizador", "Mr Blonde", 1200);
let producto_cuatro = new Producto(4, "Texturizador", "Kuav", 1000);
let producto_cinco = new Producto(5, "Shampoo(bidon)", "Opcion", 1500);
let producto_seis = new Producto(6, "Shampoo(bidon)", "Sulkey", 1900);
let producto_siete = new Producto(7, "Filos", "Gillete", 2700);
let producto_ocho = new Producto(8, "Filos", "ELIOS", 3000);
let producto_nueve = new Producto(9, "Filos", "Super Max", 2450);

productos.push(
  producto_uno,
  producto_dos,
  producto_tres,
  producto_cuatro,
  producto_cinco,
  producto_seis,
  producto_siete,
  producto_ocho,
  producto_nueve
);

//Indico que se debe cargar cuando recargamos la pagina lo que tengamos en nuestra tabla de productos
//De esta manera la cargar un producto podemos hacer que se cargue directametne desde el array
document.addEventListener("DOMContentLoaded", () => {
  cargar_productos(productos);
});

//-------------------------
//Damos pie a todas las funciones, en cada una sigue el orden de
//ACCION auxiliar
//Llamada al boton
//agregamos accion al boton

function cargarTurnos() {
  let nombre = document.getElementById("nombre");
  let dia = document.getElementById("dia");
  let hora = document.getElementById("hora");

  let turn;
  if (nombre.value != null || dia.value != null || hora.value != null) {
    turn = new Turno(dia.value, nombre.value, hora.value);
  } else {
    turn = new Turno("nan", "nan", "nan");
  }

  return turn;
}

function agregar_tabla(turno) {
  let espacio = document.getElementById("agregar_contenido");
  let agregado = `<tr id="${turno.dia}-${turno.horario}">
  <td >${turno.nombre}</td>
  <td>${turno.dia}</td>
  <td>${turno.horario}</td>
  </tr>`;

  espacio.innerHTML += agregado;
}

function comparar(array, turno) {
  let ban = true;
  array.forEach((element) => {
    if (
      element.dia === turno.dia &&
      element.nombre === turno.nombre &&
      element.horario === turno.horario
    ) {
      ban = false;
    }

    if (ban == true) {
      array.push(turno);
      console.log("Se cargo el turno");
    } else {
      console.log("El turno ya estaba reservado");
    }
  });
}

function agendar(array) {
  let turno = cargarTurnos();

  if (turno.nombre != "nan") {
    comparar(array, turno);
  } else {
    alert("Falto cargar algun campo");
  }
}

let btnCarga = document.getElementById("btn_cargar");

btnCarga.addEventListener("click", () => {
  let turno = cargarTurnos();
  let ban = true;
  for (let t of turnos) {
    if (t.comp() == turno.comp()) {
      ban = false;
    }
  }

  if (ban) {
    turnos.push(turno);
    alert("Se reservo el turno");
    agregar_tabla(turno);
  } else {
    alert("El turno ya estaba reservado");
  }
});

function buscar(nom) {
  let resultado = turnos.find((tur) => tur.nombre === nom);
  return resultado;
}

let busqueda_nombre = document.getElementById("btn_nombre");

busqueda_nombre.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let devolucion = buscar(n.value);

  if (devolucion != null) {
    alert(`Si ${devolucion.nombre} tiene el siguiente turno`);
    devolucion.mostrar();
  } else {
    alert("La persona indicada no tiene ningun turno");
  }
});

function buscar_dia(d) {
  let auxA = turnos.filter((t) => t.dia == d);
  return auxA;
}

let btn_dia = document.getElementById("btn_dia");

btn_dia.addEventListener("click", () => {
  let d = prompt("Ingrese  el dia en el cual quiere ver los turnos que hay");
  let carga = buscar_dia(d);
  if (carga.length > 0) {
    for (let c of carga) {
      c.mostrar();
    }
  } else {
    console.log("No habia turnos en el dia indicado");
  }
});

function eliminar(salida) {
  if (salida.nombre != null) {
    let indice = turnos.indexOf(salida);
    turnos.splice(indice, 1);
    console.log("Se elimino el elemento buscado");
    let id_eliminar = salida.dia + "-" + salida.horario;
    let espacio_eliminado = document.getElementById(id_eliminar);
    espacio_eliminado.outerHTML = "";
  } else {
    alert(
      "No se pudo encontrar el turno para el nombre ingresado o no ingreso ningun nombre"
    );
  }
}

let btn_eliminar = document.getElementById("btn_eliminar");
btn_eliminar.addEventListener("click", () => {
  let n = document.getElementById("nombre");

  let salida = buscar(n.value);

  if (salida != null) {
    eliminar(salida);
  } else {
    alert("Caso fallido, revise si ingreso bien el nombre");
  }
});

function cargar_productos(productos) {
  tabla_productos.innerHTML = "";
  productos.forEach((element) => {
    let contenido = `
          <tr>
                    <th scope="row">${element.id}</th>
                    <td>${element.nombreP}</td>
                    <td>${element.marca}</td>
                    <td>${element.precio}</td>
           </tr>       
       
    `;
    tabla_productos.innerHTML += contenido;
  });
}

let btn_agregarP = document.getElementById("btn_agregarP");

function sumarALista(prod, productos) {
  let acum = 0;
  productos.forEach((element) => {
    if (prod.id === element.id) {
      acum++;
    }
  });
  if (acum !== 1) {
    productos.push(prod);
    cargar_productos(productos);
    alert("Se cargo el producto");
  } else {
    alert("El producto ya esta en la lista o ingreso mal un campo");
  }
}

btn_agregarP.addEventListener("click", () => {
  let id = parseInt(prompt("Ingrese el id del producto para agregar:"));
  let nombre = prompt("Ingrese el nombre del producto para agregar:");
  let marca = prompt("Ingrese la marcad del producto para agregar:");
  let precio = parseInt(prompt("Ingrese el precio del producto para:"));
  let prod = new Producto(id, nombre, marca, precio);

  sumarALista(prod, productos);
});

function buscar_producto(nombre_p, marca_p) {
  let aux = `${nombre_p}${marca_p}`;
  let producto = productos.find(
    (p) => p.compa().toLowerCase() === aux.toLowerCase()
  );
  if (producto != null) {
    producto.muestreo();
  } else {
    alert("No se encontro  ningun producto");
  }
}

let btn_producto = document.getElementById("btn_producto");

btn_producto.addEventListener("click", () => {
  let n = prompt("Ingrese el nombre del producto que desea buscar");
  let m = prompt("Ingrese la marca del producto");

  buscar_producto(n, m);
});
