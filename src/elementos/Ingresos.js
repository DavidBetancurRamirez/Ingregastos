import React from "react";
import styled from "styled-components";
import theme from "../theme";
import {ReactComponent as IconoEditar} from '../img/IconoEditar.svg'
import {ReactComponent as IconoEliminar} from '../img/IconoEliminar.svg'
import Loader from '../img/Loader.gif'
import useObtenerIngresos from "../hooks/useObtenerIngresos";
import formatoCantidad from "../funciones/formatoCantidad";

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
    
    svg {
        margin: 0 15px 0 5px;
        cursor: pointer;
    }
    
    &:last-child { border-radius: 10px; }
    .eliminar { transform: rotate(45deg); }
    p { font-weight: 600; }
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

const Ingresos = () => {
    const [ingresos] = useObtenerIngresos();
    
    return (
        ingresos.length > 0 ?
            <Lista>
              {ingresos.map((ingreso) => (
                <Movimiento key={ingreso.id}>
                  <div>
                    <IconoEliminar className="eliminar" />
                    <IconoEditar />
                  </div>
                  <p>{ingreso.nombre}</p>
                  <Cantidad tipo={ingreso.categoria}>{formatoCantidad(ingreso.cantidad)}</Cantidad>
                </Movimiento>
              ))}
            </Lista>
        :
            <Cargando>
              <img src={Loader} alt="Cargando..." />
            </Cargando>
    );
}
 
export default Ingresos;