import React, {useState} from "react";
import styled from "styled-components";
import theme from "../theme";
import {ReactComponent as IconoDown} from '../img/IconoDown.svg'
import {ReactComponent as IconoDoc} from '../img/IconoDoc.svg'
import {ReactComponent as IconoSaldo} from '../img/IconoSaldo.svg'
import IconoCategoria from "../elementos/IconoCategoria";
import agregarMovimiento from "../firebase/agregarMovimiento";
import { v4 as uuidv4 } from 'uuid';
import getUnixTime from 'date-fns/getUnixTime'

const Contenedor = styled.div`
  width: 48%;
  height: 290px;
  border: 1px solid #000;
  border-radius: 10px;
`
const Titulo = styled.p`
  width: 100%;
  background-color: #66B3BA;
  border-radius: 10px 10px 0 0;
  padding: 6px;
  padding-left: 12px;
  color: #fff;
`
const Formulario = styled.form`
    width: 95%;
    margin: 20px auto;
    z-index: 1;
`
const Botones = styled.div`
    display: flex;
    justify-content: space-around;

    button {
        padding: 10px 25px;
        border: 1px solid #000;
        border-radius: 10px;
        background-color: #fff;
        font-weight: 300;  
        cursor: pointer;
    }

    .agregar { 
        background-color: #0072BB;
        color: #fff;
    }
`
const Pregunta = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    position: relative;

    p {
        font-weight: 600;
    }

    input {
        width: 350px;
        padding: 8px;
        border: none;
        border-radius: 5px;
        outline: none;
        padding-left: 35px;
        z-index: 2;
    }

    .icono {
        position: absolute;
        z-index: 3;
        left: 210px;
    }
`
const Lista = styled.div`
  background-color: #fff;
  opacity: .8;
  cursor: pointer;
  border-radius: 10px;
  border: 1px solid #fff;
  padding: 5px;
  width: 300px;
  height: 35px;  
  text-align: center;
  display: flex;
  align-items: center;  
  position: relative;
  transition: 1.5s ease all;
  z-index: 5;
  &:hover {
    background: ${theme.grisClaro};
  }
`;
const OpcionSeleccionada = styled.div`
    width: 100%;
    text-transform: uppercase;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-left: 10px;
    svg {
        width: 20px;
        height: 20px;
        fill: currentColor !important;
    }
`;
const Opciones = styled.div`
    background: #fff;
    position: absolute;
    top: 35px;
    left: 0;
    width: 100%;
    border-radius: 10px;
    max-height: 300px;
    overflow-y: auto;
`; 
const Opcion = styled.div`
    padding: 10px;
    display: flex;
    height: 40px;
    text-transform: uppercase;
    &:hover {
        background: ${theme.grisClaro};
    }

    svg {
        margin-right: 10px;
    }
`;

const Registro = ({cambiarTitulo, cambiarMensaje, cambiarEstadoMensaje, saldoInicial, saldoFinal}) => {
    const [mostrarSelect, cambiarMostrarSelect] = useState(false)
    const [categoria, cambiarCategoria] = useState("Ingreso");
    const [nombre, cambiarNombre] = useState("")
    const [cantidad, cambiarCantidad] = useState("")
  
    const categorias = [
        {id: "Ingreso", texto: "Ingreso"},
        {id: "Gasto", texto: "Gasto"}
    ]
  
    const handleClick = (e) => {
        cambiarCategoria(e.currentTarget.dataset.valor)
    }

    const handleClear = () => {
        cambiarCategoria("Ingreso")
        cambiarNombre("")
        cambiarCantidad("")
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (saldoInicial) {
            if (nombre !== "" && cantidad > 0 ){

                if (categoria === "Gasto" && 0 > (saldoFinal - cantidad)) { 
                    cambiarEstadoMensaje(true)
                    cambiarTitulo("Error")
                    cambiarMensaje("No cuenta con saldo suficiente para realizar este movimiento.")  

                } else {     
                    try {
                        await agregarMovimiento({
                            categoria: categoria,
                            nombre: nombre,
                            cantidad: cantidad,
                            fecha: getUnixTime(new Date()),
                            uuid: uuidv4()
                        })

                        cambiarEstadoMensaje(true)
                        cambiarTitulo("Registro Exitoso")
                        cambiarMensaje(`El ${categoria} fue agregado con exito`)

                        cambiarCategoria("Ingreso")
                        cambiarNombre("")
                        cambiarCantidad("")

                    } catch (error) {
                        console.log(error)
                    }
                }

            } else {
                cambiarEstadoMensaje(true)
                cambiarTitulo("Error")
                cambiarMensaje("Los datos ingresados no son validos.")
            }
        } else {
            cambiarEstadoMensaje(true)
            cambiarTitulo("Error")
            cambiarMensaje("Primero debe ingresar un saldo inicial")
        }
    }

    return (
        <Contenedor>
            <Titulo>Registro</Titulo>

            <Formulario onSubmit={handleSubmit}>
                <Pregunta>
                    <p>Tipo de movimiento:</p>
                    <Lista onClick={() => cambiarMostrarSelect(!mostrarSelect)}>
                        <OpcionSeleccionada>{categoria}<IconoDown /></OpcionSeleccionada>

                        {mostrarSelect && 
                            <Opciones>
                                {categorias.map((categoria) => {
                                    return <Opcion key={categoria.id} onClick={handleClick} data-valor={categoria.id}>
                                                <IconoCategoria id={categoria.id} />
                                                {categoria.texto}
                                            </Opcion>
                                })}
                            </Opciones>
                        }
                    </Lista>
                </Pregunta>

                <Pregunta>
                    <p>Nombre:</p> 
                    <IconoDoc className="icono" />
                    <input 
                        type="text"
                        value={nombre}
                        onChange={(e) =>cambiarNombre(e.target.value)}
                    />
                </Pregunta>

                <Pregunta>
                    <p>Cantidad:</p> 
                    <IconoSaldo className="icono" />
                    <input 
                        type="number" 
                        value= {cantidad}
                        onChange={(e) =>cambiarCantidad(e.target.value)}
                        min="0"
                    />
                </Pregunta>

                <Botones>
                    <button type="button" onClick={handleClear}>Cancelar</button>
                    <button type="submit" className="agregar">Agregar Movimiento</button>
                </Botones>

            </Formulario>
        </Contenedor>
    );
}
 
export default Registro;