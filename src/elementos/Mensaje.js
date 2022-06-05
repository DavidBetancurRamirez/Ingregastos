import React from "react";
import styled from "styled-components";
import {ReactComponent as IconoCerrar} from '../img/IconoCerrar.svg'

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
    background: #fff;
    border-radius: 5px;
    width: 450px;
    position: relative;
    transition: all 5s ease-in-out;
    display: flex;
    justify-content: center;
    flex-direction: column;
    .texto { text-align: center; }
    div {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 10px;
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
        margin-top: 30px;
        font-weight: 500;
        color: #000;
        padding: 5px;
        text-align: center;
        border: 1px solid #000;
        border-radius: 10px;
        cursor: pointer;
    }
`;

const Mensaje = ({estadoMensaje, titulo, mensaje, cambiarEstadoMensaje}) => {

    return (
        <>
            {estadoMensaje &&
                <PopUp>
                    <ContPopUp>
                        <div>
                            <h2>{titulo}</h2>
                            <IconoCerrar onClick={() => cambiarEstadoMensaje(!estadoMensaje)} />
                        </div>                    
                        <div className="texto">{mensaje}</div>
                        <button onClick={() => cambiarEstadoMensaje(!estadoMensaje)}>Volver</button>
                    </ContPopUp>
                </PopUp>
            }
        </>
    );
}
 
export default Mensaje;