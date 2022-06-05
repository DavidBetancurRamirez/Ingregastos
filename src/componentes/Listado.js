import React, { useState, useEffect } from "react";
import styled from "styled-components";
import theme from '../theme'
import {ReactComponent as IconoBuscar} from '../img/IconoBuscar.svg'
import useObtenerMovimientos from "../hooks/useObtenerMovimientos";
import Movimientos from '../elementos/Movimientos'
import Ingresos from '../elementos/Ingresos'
import Gastos from '../elementos/Gastos'
import {ReactComponent as IconoEditar} from '../img/IconoEditar.svg'
import {ReactComponent as IconoEliminar} from '../img/IconoEliminar.svg'
import Loader from '../img/Loader.gif'
import formatoCantidad from "../funciones/formatoCantidad";
import eliminarMovimiento from "../firebase/eliminarMovimiento";
import EditarMovimiento from '../elementos/EditarMovimiento'

const Contenedor = styled.div`
  width: 48%;
  border: 1px solid #000;
  border-radius: 10px;
`
const Titulo = styled.div`
  width: 100%;
  background-color: #66B3BA;
  border-radius: 10px 10px 0 0;
  padding: 6px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;

  div {
    background-color: #48ACF0;
    padding: 4px 20px;
    color: #fff;
    border: none;
    border-radius: 10px;
    font-weight: 600;
  }
`
const Filtros = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 95%;
  margin: 15px auto;

  div {
    display: flex;
    align-items: center;
  }

  button {
    position: relative;
    right: 150px;
    padding: 2px 8px;
    font-weight: 300;
    color: #fff;
    background-color: ${theme.principal};
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`
const Buscador = styled.form`
  position: relative;
  width: 45%;
  display: flex;
  align-items: center;

  svg {
    position: absolute;
    left: 6px;
  }

  input {
    width: 100%;
    border: 1px solid #000;
    border-radius: 40px;
    padding: 5px;
    padding-left: 35px;
    outline: none;
  }
`
const Botones = styled.div`
  width: 50%;
  justify-content: space-between;

  input { cursor: pointer; }
  label {
    margin-left: -30px;
    cursor: pointer;

    &:hover {
      border-bottom: 1px solid ${theme.principal};
    }
  }
`
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

const Listado = () => {
  const [filtro, cambiarFiltro] = useState("todos")
  const [busqueda, cambiarBusqueda] = useState("")
  const [coincidencias, cambiarCoincidencias] = useState([])
  const [coincidencias2, cambiarCoincidencias2] = useState([])
  const [buscando, cambiarBuscando] = useState(false)

  const [estadoMensaje, cambiarEstadoMensaje] = useState(false)
  const [titulo, cambiarTitulo] = useState("")
  const [idMovimiento, cambiarIdMovimiento] = useState("")

  const [movimientos] = useObtenerMovimientos();

  useEffect(() => {
    cambiarCoincidencias2(movimientos)
  }, [movimientos])

  useEffect(() => {
    filtrar(busqueda)

    if (busqueda === "") {
      cambiarBuscando(false)
    }
  }, [busqueda])

  
  const handleChange = (e) => {
    cambiarFiltro(e.target.value)
  }

  const editar = (id) => {
    cambiarEstadoMensaje(true)
    cambiarTitulo("Editar Movimiento")
    cambiarIdMovimiento(id)
  }

  const filtrar = (filtrar) => {
    let resultadoBusqueda = coincidencias2.filter((elemento) => {
      if (elemento.nombre.toString().toLowerCase().includes(filtrar.toLowerCase())) {
        return elemento
      }

      return null;
    });

    cambiarCoincidencias(resultadoBusqueda)
  }

  const buscar = (e) => {     
    cambiarBuscando(true)
    cambiarBusqueda(e.target.value)
  }  

  return (
      <Contenedor>
          <Titulo>
            <p>Listado de Movimientos</p>
            <div>{movimientos.length}</div>
          </Titulo>

          <Filtros>
            <Buscador onSubmit={(e) => e.preventDefault()}>
              <IconoBuscar /><input type="text"
                                    value={busqueda}
                                    onChange={buscar}
                                  />
            </Buscador>

            {buscando ? 
              <button onClick={() => cambiarBusqueda("")}>Limpiar busqueda</button>
            :
              <Botones onChange={(e) => handleChange(e)}>
                <input type="radio" id="radio-1" name="tabs" value="todos" defaultChecked /><label htmlFor="radio-1">Todos</label>
                <input type="radio" id="radio-2" name="tabs" value="ingresos" /><label htmlFor="radio-2">Ingresos</label>
                <input type="radio" id="radio-3" name="tabs" value="gastos" /><label htmlFor="radio-3">Gastos</label>
              </Botones>
            }
          </Filtros>

          {buscando ? 
            <>
              {coincidencias.length > 0 ?
                <Lista>
                  {coincidencias.map((coincidencia) => (
                    <Movimiento key={coincidencia.id}>
                      <div>
                        <IconoEliminar className="eliminar" onClick={() => eliminarMovimiento(coincidencia.id)} />
                        <IconoEditar onClick={() => editar(coincidencia.id)} />
                      </div>
                      <p>{coincidencia.nombre}</p>
                      <Cantidad tipo={coincidencia.categoria}>{formatoCantidad(coincidencia.cantidad)}</Cantidad>
                    </Movimiento>
                  ))}
                </Lista>
              :
                <Cargando>
                  <img src={Loader} alt="Cargando..." />
                </Cargando>
              }
            </>
          :
            <>
              {filtro === "todos" && <Movimientos /> }
              {filtro === "ingresos" && <Ingresos /> }
              {filtro === "gastos" && <Gastos /> }
            </>
          }

          {idMovimiento &&
            <EditarMovimiento estadoMensaje={estadoMensaje} titulo={titulo} idMovimiento={idMovimiento} cambiarEstadoMensaje={cambiarEstadoMensaje} />
          }

      </Contenedor>
  );
}
 
export default Listado;