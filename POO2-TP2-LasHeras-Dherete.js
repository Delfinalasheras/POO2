function Empleado(nombre, apellido, dni){
    this.nombre = nombre;
    this.apellido = apellido;
    this.dni = dni;   
}

Empleado.prototype.nombreCompleto = function () {
    return this.nombre +","+ this.apellido +":"+ this.dni;
  }


function EmpleadoAdmin(nombre, apellido, dni, sueldo) {
    Empleado.call(this, nombre, apellido,dni );
    if(sueldo===0||sueldo<0){
        throw new Error("El sueldo no puede ser menor o igual a 0");
    }
    else{
        this.sueldo=sueldo;
    }     
}

EmpleadoAdmin.prototype = Object.create(Empleado.prototype);
EmpleadoAdmin.prototype.constructor = EmpleadoAdmin;

function EmpleadoTemporal(nombre,apellido,dni,horasTrabajadas,precioPorHora){
    Empleado.call(this, nombre, apellido,dni );
    if(horasTrabajadas<0 || precioPorHora<=0){
        throw new Error("Las horas trabajadas y/o el precio por hora no pueden ser menor o igual a 0");
    }
    
    this.horasTrabajadas=horasTrabajadas;
    this.precioPorHora=precioPorHora;
    
}

EmpleadoTemporal.prototype = Object.create(Empleado.prototype);
EmpleadoTemporal.prototype.constructor = EmpleadoTemporal;

EmpleadoTemporal.prototype.sueldoTemporal = function () {
    return (this.horasTrabajadas*this.precioPorHora);
}


function EmpleadoVentas(nombre,apellido,dni,cantVentas,comision){
    Empleado.call(this,nombre,apellido,dni);
    if(cantVentas<0 || comision<=0){
        throw new Error("Las ventas realizadas y/o la comision no pueden ser negativos");
    }
    this.cantVentas=cantVentas;
    this.comision=comision;
}
EmpleadoVentas.prototype = Object.create(Empleado.prototype);
EmpleadoVentas.prototype.constructor = EmpleadoVentas;

EmpleadoVentas.prototype.vender = function () {
    this.cantVentas=this.cantVentas+1;
    return (this.cantVentas);
}
EmpleadoVentas.prototype.sueldoComision = function () {
    return (this.cantVentas*this.comision).toFixed(2);
}

function EmpleadoVentasAntiguedad(nombre,apellido,dni,cantVentas,comision,sueldo){
    EmpleadoVentas.call(this,nombre,apellido,dni,cantVentas,comision);
    if(sueldo===0||sueldo<0){
        throw new Error("El sueldo no puede ser menor o igual a 0");
    }
    this.sueldo=sueldo;

}
EmpleadoVentasAntiguedad.prototype = Object.create(EmpleadoVentas.prototype);
EmpleadoVentasAntiguedad.prototype.constructor = EmpleadoVentasAntiguedad;

EmpleadoVentasAntiguedad.prototype.sueldoTotal = function () {
    return (this.sueldoComision() + this.sueldo);
}


var javier=new EmpleadoAdmin("Javier","Baez",112345678,1000);
var martin=new EmpleadoTemporal("Martin","Lopez",43829109,10,10);
var jose= new EmpleadoVentas("Jose","Gomez",4356829,15,0.3);
var sofia=new EmpleadoVentasAntiguedad("Sofia","Martinez",1840458,100,0.3,10000);

console.log("Empleado Administrativo: "+ javier.nombreCompleto()+" con sueldo de $"+javier.sueldo);
console.log("Empleado Temporal: "+martin.nombreCompleto()+" con cantidad de horas "+martin.horasTrabajadas+" por $"+martin.precioPorHora+ " la hora (sueldo total de $"+martin.sueldoTemporal()+")");
console.log("Empleado Ventas: "+jose.nombreCompleto()+" con comision de "+ jose.comision+" y un total de cantidad de ventas de "+jose.cantVentas+" su sueldo total es de $"+jose.sueldoComision());
console.log("Ahora José vende y cambia cantidad de ventas");
jose.vender();
console.log("Ahora su sueldo cambió a $"+ jose.sueldoComision());
console.log("Empleado Ventas Antiguo: "+sofia.nombreCompleto()+" con comision de "+ sofia.comision+" y un total de cantidad de ventas de "+sofia.cantVentas+ " y sueldo fijo de $"+sofia.sueldo+" su sueldo total es de $"+sofia.sueldoTotal());
console.log("Ahora Sofia vende y cambia cantidad de ventas");
sofia.vender();
sofia.vender();
sofia.vender();
console.log("Ahora su sueldo cambió a "+ sofia.sueldoTotal());




function Pieza(tipo,valor,stock){
    this.tipo=tipo
    if(valor<=0||stock<0){
        throw Error("El valor de la pieza no puede ser menor o igual a 0 y/o el stock no puede ser menor a 0");
    }
    this.stock=stock;
    this.valor=valor;
    
}
Pieza.prototype.hayStock=function(cantidad) {
    if(cantidad<this.stock){
        this.stock=this.stock-cantidad;         
    }
    else{
        throw Error("No hay stock para el producto "+ this.tipo);
    }
   
}

function Factura(id,vendedor,pieza,cantidad){
    this.id=id;
    if(!(vendedor instanceof EmpleadoVentasAntiguedad)|| !(vendedor instanceof EmpleadoVentas)){
        throw Error("Solo los empleados en ventas pueden crear factura");
    }

    this.vendedor=vendedor;
    this.pieza=pieza;
    var i=0;
    for(i=0;i<cantidad.length;i++){
        if(cantidad[i]<=0){
            throw Error("No se puede ingresar cantidad negativa de piezas o 0"); 
        }
    }
    this.cantidad=cantidad;
}

Factura.prototype.imprimirFactura=function(){
    let total=0;
    var i=0;
    console.log("\n----- Factura -----");
    console.log("Vendedor/a: ")
    console.log(this.vendedor.nombreCompleto());
    console.log("\nFactura Nro: "+ this.id);
    for (i=0;i<this.pieza.length;i++){
        this.pieza[i].hayStock(cantidad[i]);
        console.log(this.pieza[i].tipo+"................"+this.pieza[i].valor+"X"+this.cantidad[i]);
        total=total+this.pieza[i].valor*(this.cantidad[i]);
        
    }
    console.log("TOTAL:   $"+total);
    this.vendedor.vender();
}


var tijera=new Pieza("tijera",15,10);
var martillo=new Pieza("martillo",20,20);
var tornillo=new Pieza("Tornillo",40,100);


var Piezas = [tijera,martillo,tornillo];
var cantidad= [4,10,20];


var factura=new Factura(12,sofia,Piezas,cantidad);
factura.imprimirFactura();
