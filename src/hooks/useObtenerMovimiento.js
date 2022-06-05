import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useObtenerMovimiento = (idMovimiento) => {
    const [movimiento, establecerMovimiento] = useState("");

    useEffect(() => {
        const obtenerMovimiento = async () => {
            try {
                const documento = await getDoc(doc(db, "movimientos", idMovimiento));

                if (documento.exists) {
                    establecerMovimiento(documento)
                } else {
                    console.log("Hubo un problema al recuperar el movimiento, intentelo mas tarde")
                }
            } catch (error) {
                console.log(error)
            }
        }

        obtenerMovimiento()
    }, [idMovimiento]);

    return [movimiento];
}
 
export default useObtenerMovimiento;