import * as React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";

import LoginScreen from "./screens/LoginScreen";
import LoadingScreen from "./screens/LoadingScreen";
import DashboardScreen from "./screens/DashboardScreen";

import * as firebase from "firebase";
import { firebaseConfig } from "./config";

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}

const AppSwitchNavigator = createSwitchNavigator({
    LoadingScreen: LoadingScreen, //Navegacao para o loading screen
    LoginScreen: LoginScreen, //Navegacao para o LoginScreen
    DashboardScreen: DashboardScreen //Navegacao para o DashboardScreen
})

const AppNavigator = createAppContainer(AppSwitchNavigator) //Colocando o switch navigator em um app container

export default function App() {
    return (
        <AppNavigator /> //Renderiza o AppNavigator
    )
}
