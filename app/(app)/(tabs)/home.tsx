import { useAuth } from "@/app/context/AuthContext";
import { MainButton } from "@/components/home/MainButton";
import { ProButton } from "@/components/home/ProButton";
import { ProfileButton } from "@/components/home/ProfileButton";
import { StreakCalendar } from "@/components/home/StreakCalendar";
import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, StyleSheet, useColorScheme, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];
   const router = useRouter();
   const { signOut } = useAuth();

   // Mock data - replace with actual data from your backend
   const [userData, setUserData] = useState({
      name: "Alex", // This will come from user account
      streak: [true, true, false, true, true, false, true], // Example streak data
      lastSession: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      hasCompletedSession: true,
   });

   const handleDeStress = () => {
      // Navigate to the stress recalibration screen
      // router.push('/stress-recalibration');
      console.log("Navigate to stress recalibration");
   };

   const handleGoPro = () => {
      // Navigate to pro subscription screen
      // router.push('/pro-subscription');
      console.log("Navigate to pro subscription");
   };

   const handleProfile = () => {
      // Navigate to profile screen
      router.push("/(app)/(tabs)/profile");
   };

   const formatLastSession = (date: Date) => {
      const hours = Math.floor(
         (Date.now() - date.getTime()) / (1000 * 60 * 60)
      );
      if (hours < 1) {
         const minutes = Math.floor(
            (Date.now() - date.getTime()) / (1000 * 60)
         );
         return `Last De-Stress, ${minutes} minutes ago`;
      }
      return `Last De-Stress, ${hours} hours ago`;
   };

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background }]}
      >
         <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
         >
            {/* Header with Streak */}
            <StreakCalendar streakData={userData.streak} />

            {/* Welcome Message */}
            <View style={styles.welcomeContainer}>
               <ThemedText variant="title" style={styles.welcomeText}>
                  Ready to find your{"\n"}calm, {userData.name}?
               </ThemedText>
            </View>

            {/* Main CTA Button */}
            <MainButton onPress={handleDeStress} />

            {/* Last Session Info - Conditionally rendered */}
            {userData.hasCompletedSession && (
               <ThemedText
                  style={[styles.lastSession, { color: colors.h1text }]}
               >
                  {formatLastSession(userData.lastSession)}
               </ThemedText>
            )}

            {/* Pro Button - Conditionally rendered */}
            {userData.hasCompletedSession && (
               <ProButton onPress={handleGoPro} />
            )}
         </ScrollView>

         {/* Profile Button - Fixed position */}
         <View style={styles.profileButtonContainer}>
            <ProfileButton onPress={handleProfile} />
         </View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   scrollContent: {
      flexGrow: 1,
      alignItems: "center",
      paddingHorizontal: 20,
      paddingTop: 20,
   },
   welcomeContainer: {
      alignItems: "center",
      marginBottom: 40,
   },
   welcomeText: {
      fontSize: 32,
      textAlign: "center",
      lineHeight: 38,
      
   },
   lastSession: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: 10,
      marginBottom: 80,
   },
   profileButtonContainer: {
      position: "absolute",
      bottom: 100,
      right: 30,
   },
});
