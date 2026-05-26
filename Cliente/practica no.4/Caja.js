function agregarPedido(idProducto) {
    if (isNaN(idProducto)) {
        console.log("Error: Ingresa un ID numerico valido.");
        return false;
    }
    const producto = buscarProducto(idProducto);
    if (producto) {
        listaPedidos.push(producto);
        console.log("Producto '" + producto.nombre + "' agregado al pedido.");
        return true;
    }
    console.log("Error: El producto con ID " + idProducto + " no existe.");
    return false;
}

function calcularTotal() {
    const subtotal = listaPedidos.reduce((acum, { precio }) => acum + precio, 0);
    const iva = subtotal * 0.16;
    const total = subtotal + iva;
    return { subtotal, iva, total };
}

function procesarNotificacionCaja(estado, motivo, callback) {
    if (estado === "pedido listo") {
        callback("Caja notificada: Pedido completado y cobrado.");
    } else {
        callback("Caja notificada: Pedido cancelado debido a: " + motivo + ".");
    }
}
