

console.log("Hola mundo JS desde el servidor");

let edad1 = 22
let edad2 = 33

console.log("Edad Promedio");
console.log((edad1 + edad2) / 2);

//medir tiempo de procesos

console.time("MiProceso")

    for (let i = 0; i < 1000000000; i++) {}

console.timeEnd("MiProceso")

//objetos tipo tabla:

let usuarios= [
    {nombre: "Jorge", edad: 21},
    {nombre: "Maria", edad: 22},
]
console.table(usuarios)

        
