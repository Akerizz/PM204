import {View, Text, Button} from "react-native";
import react,{useState} from "react";

export const Perfil = ({nombre,carrera,materia,cuatri}) =>{
    const[mostrar,setMostrar]= useState(false);

    return(

        <View>
            <Text>{nombre}</Text>

            {mostrar &&
            <>
            <Text>{carrera}</Text>
            <Text>{materia}</Text>
            <Text>{cuatri}</Text>
            </>
            }
            <Button title="Ver/Perfil" onPress={()=> setMostrar(!mostrar)}/>
        </View>
    )
}