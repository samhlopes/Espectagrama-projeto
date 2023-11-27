import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import firebase from "firebase";

export default class Logout extends Component {
    componentDidMount() {
        //No momento que o componente monta, ativa o procedimento de log-out
        firebase.auth().signOut();
    }
    render() {
        //O codigo simplesmente mostra uma visao de um texto indicando o log-out
        return (
            <View style={styles.container}>
                <Text>Logout</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //Estilos para estilizar o componente
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
});
