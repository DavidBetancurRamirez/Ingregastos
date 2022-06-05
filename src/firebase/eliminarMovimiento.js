import { db } from "./firebaseConfig"
import { doc, deleteDoc } from "firebase/firestore"

const eliminarMovimiento = async (id) => {
    try {
        await deleteDoc(doc(db, "movimientos", id))
    } catch (error) {
        console.log(error)
    }
}

export default eliminarMovimiento