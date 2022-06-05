import React, { useState } from "react";
import styled from "styled-components";
import theme from "../theme";
import {ReactComponent as IconoEditar} from '../img/IconoEditar.svg'
import {ReactComponent as IconoEliminar} from '../img/IconoEliminar.svg'
import Loader from '../img/Loader.gif'
import useObtenerMovimientos from "../hooks/useObtenerMovimientos";
import formatoCantidad from "../funciones/formatoCantidad";
import eliminarMovimiento from "../firebase/eliminarMovimiento";
import EditarMovimiento from './EditarMovimiento'

const Lista = styled.ul`
width: 95%;
border: 1px solid ${theme.grisOscuro};
border-radius: 10px;
margin: auto;
border-bottom: none;
margin-bottom: 10px;
`
const Movimiento = styled.li`
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
border-bottom: 1px dashed ${theme.grisOscuro};

&:last-child {
  border-radius: 10px;
}

svg {
  margin: 0 15px 0 5px;
  cursor: pointer;
}

.eliminar {
  transform: rotate(45deg);
}

p {
  font-weight: 600;
}
`
const Cantidad = styled.span`
background: ${(props) => {
    if(props.tipo === "Ingreso"){
        return theme.verde;
    } else if (props.tipo === "Gasto") {
        return theme.rojo;
    } else {
        return theme.grisOscuro;
    }
}};
margin-right: 5px;
border: none;
border-radius: 10px;
padding: 2px;
width: 150px;
text-align: center;
color: #fff;
`
const Cargando = styled.div`
display: flex;
justify-content: center;
align-items: center;
`

const Movimientos = () => {
    const [estadoMensaje, cambiarEstadoMensaje] = useState(false)
    const [titulo, cambiarTitulo] = useState("")
    const [idMovimiento, cambiarIdMovimiento] = useState("")

    const [movimientos] = useObtenerMovimientos();
    
    const editar = (id) => {
      cambiarEstadoMensaje(true)
      cambiarTitulo("Editar Movimiento")
      cambiarIdMovimiento(id)
    }

    return (
      <>
        {movimientos.length > 0 ?
            <Lista>
              {movimientos.map((movimiento) => (
                <Movimiento key={movimiento.id}>
                  <div>
                    <IconoEliminar className="eliminar" onClick={() => eliminarMovimiento(movimiento.id)} />
                    <IconoEditar onClick={() => editar(movimiento.id)} />
                  </div>
                  <p>{movimiento.nombre}</p>
                  <Cantidad tipo={movimiento.categoria}>{formatoCantidad(movimiento.cantidad)}</Cantidad>
                </Movimiento>
              ))}
            </Lista>
        :
            <Cargando>
              <img src={Loader} alt="Cargando..." />
            </Cargando>
        }

        {idMovimiento &&
          <EditarMovimiento estadoMensaje={estadoMensaje} titulo={titulo} idMovimiento={idMovimiento} cambiarEstadoMensaje={cambiarEstadoMensaje} />
        }
      </>
    );
}
 
export default Movimientos;