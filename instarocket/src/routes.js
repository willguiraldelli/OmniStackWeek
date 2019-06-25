import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Image, View } from "react-native";
import Feed from "./pages/Feed";
import New from "./pages/New";

import logo from "../assets/logo.png";

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      defaultNavigationOptions: {
        headerTitle: (
          <View
            style={{
              flex: 1,
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 10
            }}
          >
            <Image source={logo} style={{}} />
          </View>
        ),
        headerTintColor: "#000",
        headerBackTitle: null
      },
      mode: "modal"
    }
  )
);
