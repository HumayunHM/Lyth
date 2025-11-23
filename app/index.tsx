import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, useColorScheme, View } from "react-native";
import { useAuth } from "./context/AuthContext";

export default function Index() {
   const router = useRouter();
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];
   const { hasCompletedOnboarding, isAuthenticated } = useAuth();

   useEffect(() => {
      // Check auth state and redirect accordingly
      if (!hasCompletedOnboarding) {
         router.replace("/onboarding");
      } else if (!isAuthenticated) {
         router.replace("/(auth)/sign-up");
      } else {
         router.replace("/(app)/(tabs)/home");
      }
   }, [hasCompletedOnboarding, isAuthenticated]);

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
