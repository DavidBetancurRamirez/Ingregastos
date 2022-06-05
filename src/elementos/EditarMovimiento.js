import React, { useEffect, useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import {ReactComponent as IconoCerrar} from '../img/IconoCerrar.svg'
import {ReactComponent as IconoDown} from '../img/IconoDown.svg'
import {ReactComponent as IconoDoc} from '../img/IconoDoc.svg'
import {ReactComponent as IconoSaldo} from '../img/IconoSaldo.svg'
import IconoCategoria from "../elementos/IconoCategoria";
import useObtenerMovimiento from "../hooks/useObtenerMovimiento";
import editarMovimiento from '../firebase/editarMovimiento'
import getUnixTime from "date-fns/getUnixTime";

const PopUp = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
    transition: opacity 500ms;
    z-index: 100;
    &:target {
        visibility: visible;
        opacity: 1;
    }
`;
const ContPopUp = styled.div`
    margin: 80px auto;
    padding: 20px;
    padding-bottom: 10px;
    background: ${theme.grisClaro};
    border-radius: 5px;
    width: 700px;
    position: relative;
    transition: all 5s ease-in-out;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .texto { text-align: center; }
    .titulo {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
        border-bottom: 1px dashed #000;
        h2 {
            margin-top: 0;
            color: #333;
            font-weight: 800;
        }
        svg {
            cursor: pointer;
        }
    }
    button {
        width: 200px;
        margin: auto;
        font-weight: 500;
        color: #000;
        padding: 5px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 10px;
        cursor: pointer;
    }
`;
const Formulario = styled.form`
    width: 95%;
    margin: 20px auto;
    z-index: 1;
`
const Botones = styled.div`
    display: flex;
    justify-content: space-around;
    border-top: 1px dashed #000;
    padding-top: 20px;

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
        left: 280px;
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

const EditarMovimiento = ({idMovimiento, estadoMensaje, titulo, cambiarEstadoMensaje}) => {
    const [mostrarSelect, cambiarMostrarSelect] = useState(false)
    const [categoria, cambiarCategoria] = useState("Ingreso");
    const [nombre, cambiarNombre] = useState("")
    const [cantidad, cambiarCantidad] = useState("")

    const [movimiento] = useObtenerMovimiento(idMovimiento)

    const categorias = [
        {id: "Ingreso", texto: "Ingreso"},
        {id: "Gasto", texto: "Gasto"}
    ]

    useEffect(() => {
        if (movimiento) {
            cambiarCategoria(movimiento.data().categoria)
            cambiarNombre(movimiento.data().nombre)
            cambiarCantidad(movimiento.data().cantidad)
        }
    }, [movimiento])
  
    const handleClick = (e) => {
        cambiarCategoria(e.currentTarget.dataset.valor)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            await editarMovimiento({
                idMovimiento: idMovimiento,
                nombre: nombre,
                categoria: categoria,
                cantidad: cantidad,
                fecha: getUnixTime(new Date())
            })

            cambiarEstadoMensaje(!estadoMensaje)
        } catch (error) {
            console.log(error)
        }
    }
       
    return (
        <>
            {estadoMensaje &&
                <PopUp>
                    <ContPopUp>
                        <div className="titulo">
                            <h2>{titulo}</h2>
                            <IconoCerrar onClick={() => cambiarEstadoMensaje(!estadoMensaje)} />
                        </div>     

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
                                <button type="button" onClick={() => cambiarEstadoMensaje(!estadoMensaje)}>Cancelar</button>
                                <button type="submit" className="agregar">Editar Movimiento</button>
                            </Botones>
                        </Formulario>

                    </ContPopUp>
                </PopUp>
            }
        </>
    );
}
 
export default EditarMovimiento;