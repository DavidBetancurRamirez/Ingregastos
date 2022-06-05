import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useObtenerGastos = () => {
    const [gastos, cambiarGastos] = useState([])

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

    return [gastos];
}
 
export default useObtenerGastos;