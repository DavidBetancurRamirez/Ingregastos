const formatoCantidad = (cantidad) => {    
    return cantidad.toLocaleString("en-US")
    //return new Intl.NumberFormat({ style: 'currency', currency: 'JPY' }).format(cantidad);
}
 
export default formatoCantidad;