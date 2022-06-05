import {db} from './firebaseConfig'
import { doc, updateDoc } from 'firebase/firestore'

const agregarComunidad = async ({idMovimiento, nombre, categoria, cantidad, fecha}) => {
    const documento = doc(db, "movimientos", idMovimiento)
    
    return await updateDoc(documento, {
        nombre: nombre,
        categoria: categoria,
        cantidad: Number(cantidad),
        fecha: fecha
    })
}
 
export default agregarComunidad;