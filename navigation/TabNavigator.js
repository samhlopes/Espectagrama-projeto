import React, { Component } from 'react';
import { StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from "react-native-responsive-fontsize";

import Feed from "../screens/Feed";
import CreatePost from "../screens/CreatePost";

import firebase from "firebase";

const Tab = createMaterialBottomTabNavigator(); //Cria o bottomTabNavigator

export default class BottomTabNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true, //Estado para mudar o tema
            isUpdated: false// Estado para rastrear updates
        };
    }

    renderFeed = props => {
        //Funcao para renderizar o FeedScreen
        return <Feed setUpdateToFalse={this.removeUpdated} {...props} />;
    };

    renderPost = props => {
        //Funcao para renderizar o CreatePost screen
        return <CreatePost setUpdateToTrue={this.changeUpdated} {...props} />;
    };

    changeUpdated = () => {
        //Codigo para setar o isUpdated para true
        this.setState({ isUpdated: true });
    };

    removeUpdated = () => {
        //Codigo para setar o isUpdated para false
        this.setState({ isUpdated: false });
    };

    componentDidMount() {
        //Codigo para achar o tema no firebase quando o componente eh montado
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
        return (
            <Tab.Navigator
                labeled={false} // Esconde o label para a tab
                barStyle={this.state.light_theme ? styles.bottomTabStyleLight : styles.bottomTabStyle} //Estilo para o tab baseado no tema
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        //Custromiza o icone do tab bar baseado na rota e no estado de foco
                        let iconName;
                        if (route.name === "Feed") {
                            iconName = focused ? "home" : "home-outline";
                        } else if (route.name === "CreatePost") {
                            iconName = focused ? "add-circle" : "add-circle-outline";
                        }
                        return (
                            <Ionicons
                                name={iconName}
                                size={RFValue(25)}
                                color={color}
                                style={styles.icons}
                            />
                        );
                    }
                })}
                activeColor={"#ee8249"} //Cor do icon do tab quando ativo
                inactiveColor={"gray"} //Cor do icon do tab quando ativo
            >
                <Tab.Screen name="Feed" component={this.renderFeed} options={{ unmountOnBlur: true }} />
                <Tab.Screen name="Tela de Posts" component={this.renderPost} options={{ unmountOnBlur: true }} />
            </Tab.Navigator>
        );
    }
}

const styles = StyleSheet.create({
    //Definicoes de estilo para a bottom bar e icones
    bottomTabStyle: {
        backgroundColor: "#2a2a2a",
        height: "8%",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        overflow: "hidden",
        position: "absolute"
    },
    bottomTabStyleLight: {
        backgroundColor: "#eaeaea",
        height: "8%",
        borderTopLeftRadius: RFValue(30),
        borderTopRightRadius: RFValue(30),
        overflow: "hidden",
        position: "absolute"
    },
    icons: {
        width: RFValue(30),
        height: RFValue(30)
    }
});