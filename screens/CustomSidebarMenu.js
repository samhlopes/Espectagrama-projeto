import React, { Component } from "react";
import { SafeAreaView, View, StyleSheet, Image } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import firebase from "firebase";

import {
    DrawerContentScrollView,
    DrawerItemList
} from "@react-navigation/drawer";

export default class CustomSidebarMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true
        };
    }

    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid)
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme;
            });
        this.setState({ light_theme: theme === "light" ? true : false });
    }

    render() {
        let props = this.props;
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: this.state.light_theme ? "white" : "black" //Seta a cor do background baseado no tema
                }} 
            >
                <Image
                    source={require("../assets/logo.png")} //Logo do icone do perfil
                    style={styles.sideMenuProfileIcon}
                ></Image>
                <DrawerContentScrollView {...props}>
                    <DrawerItemList {...props} //Renderiza os itens do drawer
                    /> 
                </DrawerContentScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    sideMenuProfileIcon: {
        //Estilos para o icone do perfil no drawer
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70),
        alignSelf: "center",
        marginTop: RFValue(60),
        resizeMode: "contain"
    }
});
