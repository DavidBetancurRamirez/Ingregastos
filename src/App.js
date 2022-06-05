import React, {useEffect, useState} from "react";
import Header from "./componentes/Header";
import styled from "styled-components";
import Registro from "./componentes/Registro";
import Listado from "./componentes/Listado";
import Mensaje from "./elementos/Mensaje";
import useGastado from "./hooks/useGastado";
import useIngresado from "./hooks/useIngresado";

const ContenedorGrande = styled.div`
  width: 90%;
  margin: 30px auto;
  display: flex;
  justify-content: space-between;
`

const App = () => {
  const [titulo, cambiarTitulo] = useState("")
  const [mensaje, cambiarMensaje] = useState("")
  const [estadoMensaje, cambiarEstadoMensaje] = useState(false)

  const [saldoInicial, cambiarSaldoInicial] = useState(); 
  const [saldoFinal, cambiarSaldoFinal] = useState(0); 
  
  const ingresado = useIngresado();
  const gastado = useGastado();
  
  useEffect(() => {
    cambiarSaldoFinal(Number(saldoInicial) + (Number(ingresado) - Number(gastado)))
  }, [saldoInicial, ingresado, gastado])

  return (
    <>
      <Header saldoInicial={saldoInicial} cambiarSaldoInicial={cambiarSaldoInicial} saldoFinal={saldoFinal} />

      <ContenedorGrande>
        <Registro cambiarTitulo={cambiarTitulo} cambiarMensaje={cambiarMensaje} cambiarEstadoMensaje={cambiarEstadoMensaje} saldoInicial={saldoInicial} saldoFinal={saldoFinal}  />
   
        <Listado />
      </ContenedorGrande>

      <Mensaje titulo={titulo} mensaje={mensaje} estadoMensaje={estadoMensaje} cambiarEstadoMensaje={cambiarEstadoMensaje} />
    </>
  )
}
 
export default App;