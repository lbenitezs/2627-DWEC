/*Ejercicio 1 — Objeto artículo (constructor + métodos)
Crea un objeto mediante una función constructora llamada obj_articulo, con las propiedades desc, codigo y
valor asignadas directamente con this.
El objeto debe tener dos métodos:
● iva(): calcula y devuelve el IVA del artículo (21% de valor).
● total(reb): calcula y devuelve el precio final (valor + iva) restando un posible descuento reb pasado
como parámetro. Si no se indica descuento, debe funcionar igualmente (descuento 0).
Crea un artículo de prueba y muestra por consola su IVA, su total sin descuento y su total aplicando un
descuento de 5€. */

function obj_articulo(desc, codigo, valor){
    this.desc=desc;
    this.codigo=codigo;
    this.valor= valor;

    this.iva= function(){
        return this.valor*0.21;
    };

    this.total=function(reb){
        reb= reb || 0;
        /*if (!reb){
            reb=0;
        }*/
        return (this.valor +this.iva()) -reb;

    };
}
    const articulo= new obj_articulo("Teclado", "T123",45);

    console.log ("IVA", articulo.iva());
    console.log ("Total sin descuento", articulo.total());
    console.log ("Total con descuento", articulo.total(5));

    /*Ejercicio 2 — Jerarquía Persona / Estudiante / Profesor
Utilizando funciones constructoras y prototipos (call() y Object.create()), define la siguiente jerarquía:
● Persona: propiedades nombre, edad y género; método obtDetalles() que muestra por consola esas
propiedades.
● Estudiante (hereda de Persona): añade las propiedades curso y grupo; método registrar() que muestra
un mensaje indicando que el alumno está matriculado.
● Profesor (hereda de Persona): añade las propiedades asignatura y nivel; método asignar() que muestra
un mensaje indicando qué asignatura imparte y en qué nivel.
Crea al menos un Estudiante y un Profesor de prueba, y comprueba que ambos pueden usar obtDetalles()
(heredado) además de su propio método.*/ 

function Persona(nombre, edad, genero){
    this.nombre=nombre;
    this.edad=edad;
    this.genero= genero;
}
Persona.prototype.objDetalles=function(){
    console.log(this.nombre+ ' - '+this.edad+ " aÃ±os- "+this.genero);
};

function Estudiante(nombre,edad,genero,curso,grupo){
    Persona.call(this, nombre,edad, genero);
    this.curso=curso;
    this.grupo=grupo;
}

Estudiante.prototype=Object.create(Persona.prototype);
Estudiante.prototype.registrar=function(){
   console.log (this.nombre+ " matriculado en "+this.curso+ this.grupo);
};


function Profesor(nombre,edad,genero,asignatura,nivel){
    Persona.call(this, nombre,edad, genero);
    this.asignatura=asignatura;
    this.nivel=nivel;
}

Profesor.prototype=Object.create(Persona.prototype);
Profesor.prototype.asignar=function(){
   console.log (this.nombre+ " imparte "+this.asignatura+  
    " en "+this.nivel);
};

const alumno= new Estudiante("Juan", 20, "M", "2Âº", "DAW");
alumno.objDetalles();
alumno.registrar();

const profesora = new Profesor ("Ana", 40, "F", 
    "Despliegue", "2ÂºDAW");
profesora.objDetalles();
profesora.asignar();

/* Ejercicio 3 — El juego del 7 y medio
Simula una partida del juego del 7 y medio entre un jugador y la banca. Recuerda las reglas:
● La baraja no tiene cartas 8 ni 9 (40 cartas: 1-7, sota, caballo y rey, en 4 palos).
● Las cartas del 1 al 7 valen su propio número; sota, caballo y rey valen 0.5 puntos.
● Cada jugador pide cartas mientras su puntuación no supere 7.5. Si la supera, "se pasa" y pierde
automáticamente.
● Gana quien más se acerque a 7.5 sin pasarse. En caso de empate, gana la banca.
Modela al jugador como un objeto (con constructor y métodos, igual que en el ejercicio 3) con su mano de
cartas y su puntuación. El turno de cada jugador debe pedir cartas de forma automática mientras su
puntuación sea menor o igual que 4.5. Muestra por consola cada carta que se pide y el resultado final de la
partida. */

function Jugador(nombre) { 

  this.nombre = nombre; this.mano = []; this.puntuacion = 0; 

} 

Jugador.prototype.pedirCarta = function(carta) { 

  this.mano.push(carta); this.puntuacion += carta.valorPuntos; 

}; 

Jugador.prototype.seHaPasado = function() { 

  return this.puntuacion > 7.5; 

}; 

  

// Baraja sin 8 ni 9: 1-7, sota(10), caballo(11), rey(12) 

const palos = ['oros', 'copas', 'espadas', 'bastos']; 

const rangos = [1,2,3,4,5,6,7,10,11,12]; 

  

let baraja = []; 

for (let p = 0; p < palos.length; p++) { 

  for (let r = 0; r < rangos.length; r++) { 

    const rango = rangos[r]; 

    const valorPuntos = rango >= 10 ? 0.5 : rango; 
    //poner con if

    baraja.push({ rango, palo: palos[p], valorPuntos }); 

  } 

} 

  

function extraerCarta(mazo) { 

  const indice = Math.floor(Math.random() * mazo.length); 
  //Math.floor(5.95)-->5

  return mazo.splice(indice, 1)[0]; 

} 

  

// Turno: pide carta mientras la puntuaciÃ³n sea <= 4.5 

function jugarTurno(jugador, mazo) { 

  while (jugador.puntuacion <= 4.5 && mazo.length > 0) { 

    const carta = extraerCarta(mazo); 

    jugador.pedirCarta(carta); 

    console.log(jugador.nombre, carta, jugador.puntuacion); 

  } 

} 

  

const jugador = new Jugador('Jugador'); 

const banca = new Jugador('Banca'); 

jugarTurno(jugador, baraja); 

if (!jugador.seHaPasado()) jugarTurno(banca, baraja); 

  

// Decidir ganador 

if (jugador.seHaPasado()) { 

  console.log('Gana la banca'); 

} else if (banca.seHaPasado()) { 

  console.log('Gana el jugador'); 

} else if (banca.puntuacion >= jugador.puntuacion) { 

  console.log('Gana la banca'); 

} else { 

  console.log('Gana el jugador'); 

} 

