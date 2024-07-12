import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Suspense, useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useCreateDB from "@/hooks/useCreateDB";
import { SQLiteProvider } from "expo-sqlite/next";
import DrawerApp from "@/components/drawer/drawerApp";
import { I18nProvider } from "@/hooks/i18nContext";
import { getLocales } from "expo-localization";
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export const unstable_settings = {
  initialRouteName: "(home)",
};

export default function RootLayout() {
  const isCreateDatabase = useCreateDB("ecometric.db", false);
  const [locale, setLocale] = useState("");
  const translations = require("@/data/translations.json");
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  const checkLanguaje = () => {
    const deviceLocale = getLocales()[0].languageCode ?? "es";
    if (translations[deviceLocale]) {
      setLocale(deviceLocale);
    } else {
      setLocale("es");
    }
  };

  useEffect(() => {
    checkLanguaje();
    if (loaded && isCreateDatabase) {
      SplashScreen.hideAsync();
    }
  }, [loaded, isCreateDatabase, locale]);

  if (!loaded || !isCreateDatabase) {
    return null;
  }

  return (
    <I18nProvider translations={translations} langLocale={locale}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        <Suspense>
          <SQLiteProvider useSuspense={true} databaseName="ecometric.db">
            <GestureHandlerRootView style={{ flex: 1 }}>
              <DrawerApp />
            </GestureHandlerRootView>
          </SQLiteProvider>
        </Suspense>
      </ThemeProvider>
    </I18nProvider>
  );
}
