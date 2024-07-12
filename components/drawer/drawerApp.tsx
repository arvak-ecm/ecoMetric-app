import Drawer from "expo-router/drawer";
import { SafeAreaView, StyleSheet } from "react-native";
import HeaderDrawer from "./header";
import { DrawerItemList } from "@react-navigation/drawer";
import { useI18nContext } from "@/hooks/i18nContext";
import { TabBarIcon } from "../navigation/TabBarIcon";

export default function DrawerApp() {
  const { t } = useI18nContext();
  const drawerItems = require("@/data/drawerItems.json");
  return (
    <Drawer
      initialRouteName="(home)"
      screenOptions={{
        drawerPosition: "left",
        drawerType: "front",
        headerShown: false,
        drawerStyle: {
          backgroundColor: "#021520",
        },
        drawerInactiveBackgroundColor: "#021520",
        drawerLabelStyle: {
          color: "#fff",
        },
      }}
      drawerContent={(props) => {
        const filteredProps = {
          ...props,
          state: {
            ...props.state,
            routeNames: props.state.routeNames.filter(
              (routeName) => routeName !== "+not-found"
            ),
            routes: props.state.routes.filter(
              (route) => route.name !== "+not-found"
            ),
          },
        };
        return (
          <SafeAreaView>
            <HeaderDrawer />
            <DrawerItemList {...filteredProps} />
          </SafeAreaView>
        );
      }}
    >
      {drawerItems.map((item: any) => {
        return (
          <Drawer.Screen
            key={item.name}
            name={item.name}
            options={{
              drawerIcon: () =>
                TabBarIcon({ name: item.icon, style: styles.icon }),
              drawerLabel: t(item.options.label),
              title: t(item.options.title),
              headerShown: item.options.headerShown,
            }}
          />
        );
      })}
    </Drawer>
  );
}

const styles = StyleSheet.create({
  icon: {
    height: 24,
    width: 28,
    color: "#fff",
    marginBottom: 0,
    resizeMode: "contain",
  },
});
