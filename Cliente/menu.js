// --- Sección cliente ---
function mostrarMenu() {
    console.log(\n =================================);
    console.log(`          MENÚ DEL DÍA           `);
    console.log(=================================);

    if (catalogo.length === 0) {
        console.log(` El catálogo está vacío.`);
    } else {
        for (let i = 0; i < catalogo.length; i++) {
            console.log(` [${catalogo[i].id}] ${catalogo[i].nombre} -> $${catalogo[i].precio}`);
        }
    }
    console.log(=================================\n);
}

function mostrarPedidos() {
    console.log(\n---------------------------------);
    console.log(`          TICKET DE CAJA         `);
    console.log(---------------------------------);

    if (listaPedidos.length === 0) {
        console.log(` No hay pedidos registrados.`);
    } else {
        for (let i = 0; i < listaPedidos.length; i++) {
            console.log(` * ${listaPedidos[i].nombre} -> $${listaPedidos[i].precio}`);
        }
    }

    console.log(---------------------------------);
    console.log(` TOTAL A PAGAR: $${totalAcumulado}`);
    console.log(---------------------------------\n);
}