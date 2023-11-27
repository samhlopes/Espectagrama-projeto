import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import PostScreen from "../screens/PostScreen";

const Stack = createStackNavigator(); //Cria um stackNavigator

const StackNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="Home" //Seta a rota inicial quando o navegador eh carregado
            screenOptions={{
                headerShown: false //Esconde o "header" para todos os screeens nesse navigator
            }}
        >
            <Stack.Screen name="Tela Inicial" //Da o nome da primeira screen no stack 
            component={TabNavigator} // Componente para carregar na screen (TabNavigator)
             />
            <Stack.Screen name="Tela de Posts" component={PostScreen} />  
            
        </Stack.Navigator>
    );
};

export default StackNavigator; //Exporta o StackNavigator para outros files
