import {db} from './firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'

const agregarMovimiento = ({categoria, nombre, cantidad, fecha, uuid}) => {

    return addDoc(collection(db, "movimientos"), {
        categoria: categoria,
        nombre: nombre,
        cantidad: Number(cantidad),
        fecha: fecha,
        uuid: uuid
    });
}
 
export default agregarMovimiento;