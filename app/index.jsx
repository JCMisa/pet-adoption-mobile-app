import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full flex items-center justify-center p-10">
      <ScrollView>
        <Link href={'/login'}>
          <Text className="text-light">Login</Text>
        </Link>
      </ScrollView>

      <StatusBar backgroundColor="#222831" style="light" />
    </SafeAreaView>
  );
}
