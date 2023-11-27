//Importacoes para que as funcoes possam ser usadas
import React, { Component } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import StackNavigator from "./StackNavigator";
import Profile from "../screens/Profile";
import Logout from "../screens/Logout";
import firebase from "firebase";

import CustomSidebarMenu from "../screens/CustomSidebarMenu";

const Drawer = createDrawerNavigator();

export default class DrawerNavigator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            light_theme: true //Inicia o stado com o tema claro
        };
    }

    componentDidMount() {
        let theme;
        firebase
            .database()
            .ref("/users/" + firebase.auth().currentUser.uid) //Acessa o database do firebase pra ver o tema preferido do usuario
            .on("value", function (snapshot) {
                theme = snapshot.val().current_theme; // Recebe o tema atual do databse
            });
        this.setState({ light_theme: theme === "light" ? true : false }); //Seta o estado baseado no tema recebido
    }

    render() {
        let props = this.props;
        return (
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: "#e91e63", //Seta a cor quando o drawer esta ativo
                    inactiveTintColor: this.state.light_theme ? "black" : "white", // Seta a cor dos itens inativos baseado no tema
                    itemStyle: { marginVertical: 5 } // Estilo para cada item no drawer
                }}
                drawerContent={props => <CustomSidebarMenu {...props} />}
            >
                <Drawer.Screen
                    name="Tela Inicial" //Nome do drawer
                    component={StackNavigator} //Componente para carregar quando esse drawer for clicado
                    options={{ unmountOnBlur: true }} //Desmonta o componente quando fora de foco
                />
                <Drawer.Screen
                    name="Perfil"
                    component={Profile}
                    options={{ unmountOnBlur: true }}
                />
                <Drawer.Screen
                    name="Logout"
                    component={Logout}
                    options={{ unmountOnBlur: true }}
                />
            </Drawer.Navigator>
        );
    }
}
