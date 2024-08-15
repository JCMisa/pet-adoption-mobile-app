import { useUser } from "@clerk/clerk-expo";
import { Link, Redirect, router, useRootNavigationState } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useUser();
  const rootNavigationState = useRootNavigationState();

  useEffect(() => {
    checkNavLoaded();
  }, [])

  const checkNavLoaded = () => {
    if (!rootNavigationState?.key) {
      return null;
    }
  }

  return (
    <View className="flex">
      {
        user ? <Redirect href={'/(tabs)/home'} /> : <Redirect href={'/login'} />
      }
    </View>
  );
}
