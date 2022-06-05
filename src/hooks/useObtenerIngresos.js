import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useObtenerIngresos = () => {
    const [ingresos, cambiarIngresos] = useState([])

    useEffect(() => {
        const consulta = query(
            collection(db, "movimientos"),
            orderBy('fecha', "desc"),
            where("categoria", "==", "Ingreso")
        )

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            cambiarIngresos(snapshot.docs.map((ingreso) => {
                return {...ingreso.data(), id: ingreso.id}
            }))
        }, (error) => {
            console.log(error)
        });

        return unsuscribe
    }, [])

    return [ingresos];
}
 
export default useObtenerIngresos;