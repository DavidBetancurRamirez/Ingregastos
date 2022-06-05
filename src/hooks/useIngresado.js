import {useEffect, useState} from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, onSnapshot, orderBy, query, where } from "firebase/firestore";

const useIngresado = () => {
    const [ingresos, cambiarIngresos] = useState([])
    const [ingresado, cambiarIngresado] = useState(0)

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

    useEffect(() => {
        let valor = 0;

        if (ingresos) {
            for(let i=0;i<ingresos.length;i++) {
                valor += Number(ingresos[i].cantidad);
            };
        }

        cambiarIngresado(Number(valor))
    }, [ingresos])

    return ingresado;
}
 
export default useIngresado;