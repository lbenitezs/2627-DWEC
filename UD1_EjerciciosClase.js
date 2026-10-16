/*console.log('Ejercicio 1: Variables y tipos');

const nombre = 'Maria';
const edad= 20;
const esEstudiante= true;

console.log(nombre, typeof nombre);
console.log(edad, typeof edad);
console.log(esEstudiante, typeof esEstudiante);

console.log('Ejercicio 2: Conversión y operadores');

const precioTexto = "45.90"; 

const precio= Number(precioTexto);
const precioIVA= precio*1.21;
const resultado = Math.round(precioIVA *100)/100;

console.log(resultado);

console.log('Ejercicio 3: Decisiones simples');

const nota = 7.5; 

  

if (nota < 5) { 

  console.log('Suspenso'); 

} else if (nota < 7) { 

  console.log('Aprobado'); 

} else if (nota < 9) { 

  console.log('Notable'); 

} else { 

  console.log('Sobresaliente'); 

} 
console.log('Ejercicio 4: Bucles');

const n=7;

for(let i=1;i<=10; i++){
    console.log(n+ 'x'+i+'='+(i*n));
}*/
console.log('Ejercicio 5- Combinando todo: FizzBuzz con acumulador');
let suma=0;

for(let i=1;i<=100; i++){

    const m3= i%3===0;
    const m5= i%5===0;

    if(m3 && m5){
        console.log(i+'FizzBuzz');
        suma +=i;
    }else if(m3){
        console.log(i+'Fizz');
        suma +=i;
    }else if(m5){
        console.log(i+'Buzz');
        suma +=i;
    }else{
        console.log(i);
    }
    
   
     

}
 console.log("suma total: "+suma);
