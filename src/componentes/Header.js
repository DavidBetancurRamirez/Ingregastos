import React, { useState } from "react";
import styled from "styled-components";
import logo from '../img/logo.jpg'
import {ReactComponent as IconoSaldo} from '../img/IconoSaldo.svg'
import formatoCantidad from "../funciones/formatoCantidad";

const Fondo = styled.div`
    background-color: #66B3BA;
    height: 80px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;

    div {
        display: flex;        
        align-items: center;        
        justify-content: space-between;
    }
`
const Nombre = styled.div`
    div {
        width: 160px;
        height: 80px;

        img {
            width: 100%;
            height: 100%;
            vertical-align: top;
        }
    }

    h1 {
        margin-left: 20px;
        font-weight: 800;
        font-size: 24px;
        color: #fff;
        text-shadow: 2px 5px 15px;
    }
`
const Saldo = styled.div`
    flex-direction: column;
    margin-right: 40px;
    color: #fff;

    p {
        font-weight: 300;
        font-size: 15px;
        margin-bottom: 5px;
    }

    div {
        border: 1px solid #fff;
        border-radius: 5px;
        padding: 2px 5px;
        display: flex;

        svg {
            margin-right: 5px;
            fill: currentColor !important;
            color: #fff;
            opacity: 0.8;
        }
    }
`
const Formulario = styled.form`
    input {
        border: none;
        border-radius: 5px;
        outline: none;
        padding: 3px;
        width: 190px;
    }
    button {
        padding: 3px 5px;
        border: none;
        border-radius: 5px;
        margin-left: 5px;
        background-color: #fff;
        cursor: pointer;
    }
`

const Header = ({saldoInicial, cambiarSaldoInicial, saldoFinal}) => {
    const [saldo, cambiarSaldo] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        cambiarSaldoInicial(saldo)
    }

    return (
        <Fondo>
            <Nombre>
                <div>
                    <img src={logo} alt="logo" />
                </div>
                <h1>Ingregastos</h1>
            </Nombre>

            <div>
                <Saldo>
                    <p>Saldo Inicial:</p>
                    {!saldoInicial ?
                        <Formulario onSubmit={handleSubmit}>
                            <input 
                                type="number"
                                placeholder="Ingrese su saldo inicial"
                                value={saldo}
                                onChange={(e) => cambiarSaldo(e.target.value)}
                            />
                            <button type="submit">Guardar</button>
                        </Formulario>
                    :
                        <div><IconoSaldo />$ {formatoCantidad(Number(saldoInicial))}</div>
                    }
                </Saldo>

                <Saldo>
                    <p>Saldo Final:</p>
                    {!saldoInicial ?
                        <div><IconoSaldo /></div>
                    :
                        <div><IconoSaldo />$ {formatoCantidad(saldoFinal)}</div>
                    }
                </Saldo>
            </div>
        </Fondo>
    );
}
 
export default Header;