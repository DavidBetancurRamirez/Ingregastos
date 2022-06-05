import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";

const useObtenerMovimientos = () => {
    const [movimientos, cambiarMovimientos] = useState([])

    useEffect(() => {
        const consulta = query(
            collection(db, "movimientos"),
            orderBy('fecha', "desc")
        )

        const unsuscribe = onSnapshot(consulta, (snapshot) => {
            cambiarMovimientos(snapshot.docs.map((movimiento) => {
                return {...movimiento.data(), id: movimiento.id}
            }))
        }, (error) => {
            console.log(error)
        });

        return unsuscribe
    }, [])

    return [movimientos];
}
 
export default useObtenerMovimientos;