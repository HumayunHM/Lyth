import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";

export default function Index() {
   const router = useRouter();
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   useEffect(() => {
      // For now, always redirect to onboarding
      // Later you can add logic to check if user has completed onboarding
      router.replace("/onboarding");
   }, []);

   return (
      <View
         style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: colors.background,
         }}
      >
         <ActivityIndicator size="large" color={colors.primary} />
      </View>
   );
}
