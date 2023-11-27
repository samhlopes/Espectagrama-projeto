import React, { Component } from "react";
import {
    View,
    ActivityIndicator
} from "react-native";
import firebase from "firebase";

export default class LoadingScreen extends Component {

    componentDidMount() {
        //Checa a autenticacao do usuario quando o componente monta
        this.checkIfLoggedIn()
    }

    checkIfLoggedIn = () => {
        //Metodo para checar a estado de autenticacao do usuario 
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                //Se um usuario eh encontrado, navegue para o DahboardCsreen
                this.props.navigation.navigate('DashboardScreen')
            } else {
                //Se nenhum usuario for encontrado, navegue para o LoginScreen
                this.props.navigation.navigate('LoginScreen')
            }
        })
    }

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center"
                }}
            >
                <ActivityIndicator size="large" 
                //Mostra o indicador de atividade
                />
            </View>
        )
    }
}
