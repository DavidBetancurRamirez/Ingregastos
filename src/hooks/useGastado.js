import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useGastado = () => {
    const [gastos, cambiarGastos] = useState([])
    const [gastado, cambiarGastado] = useState(0)

    useEffect(() => {
        const consulta = query(
            collection(db, "movimientos"),
            orderBy('fecha', "desc"),
            where("categoria", "==", "Gasto")
        )

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            cambiarGastos(snapshot.docs.map((gasto) => {
                return {...gasto.data(), id: gasto.id}
            }))
        }, (error) => {
            console.log(error)
        });

        return unsuscribe
    }, [])

    useEffect(() => {
        let valor = 0;

        if (gastos) {
            for(let i=0;i<gastos.length;i++) {
                valor += Number(gastos[i].cantidad);
            };
        }

        cambiarGastado(Number(valor))
    }, [gastos])

    return gastado;
}
 
export default useGastado;