import React from 'react';

import {ReactComponent as IconoPlus} from '../img/IconoPlus.svg'
import {ReactComponent as IconoMenos} from '../img/IconoMenos.svg'

const IconoCategoria = ({id}) => {
    switch(id){
        case "Ingreso":
            return <IconoPlus />
        case "Gasto":
            return <IconoMenos />
        
        default:
            break
    }
}
 
export default IconoCategoria;