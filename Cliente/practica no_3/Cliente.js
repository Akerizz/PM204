function mostrarMenu() {
    console.log("\n--- MENÚ DEL DÍA ---");
    if (catalogo.length === 0) {
        console.log("El catálogo está vacío.");
    } else {
        const menuFormateado = catalogo.map(p => `[${p.id}] ${p.nombre} (${p.categoria}) -> $${p.precio}`);
        menuFormateado.forEach(item => console.log(item));
    }
}

function mostrarPromociones() {
    console.log("\n--- PROMOCIONES Y FILTROS ---");
    
    const baratos = obtenerProductosBaratos(50);
    console.log("Productos accesibles (<= $50):");
    baratos.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));

    const bebidas = obtenerPorCategoria("bebida");
    console.log("\nBebidas disponibles:");
    bebidas.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));

    const postres = obtenerPorCategoria("postre");
    console.log("\nPostres disponibles:");
    postres.forEach(p => console.log(` - ${p.nombre}: $${p.precio}`));
}

function mostrarPedidos() {
    console.log("\n--- TICKET DE CAJA ---");
    if (listaPedidos.length === 0) {
        console.log("No hay pedidos registrados.");
    } else {
        listaPedidos.forEach(({ nombre, precio }) => {
            console.log(`* ${nombre} -> $${precio}`);
        });
        
        const { subtotal, iva, total } = calcularTotal();
        console.log("------------------------");
        console.log(`SUBTOTAL: $${subtotal.toFixed(2)}`);
        console.log(`IVA:      $${iva.toFixed(2)}`);
        console.log(`TOTAL:    $${total.toFixed(2)}`);
    }
}