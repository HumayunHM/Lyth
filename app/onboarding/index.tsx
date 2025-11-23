import { OnboardingText } from "@/components/onboarding/OnboardingText";
import { ProgressRing } from "@/components/onboarding/ProgressRing";
import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import { onboardingSteps } from "@/constants/onboarding-data";
import React, { useState } from "react";
import {
   Image,
   StyleSheet,
   TouchableOpacity,
   useColorScheme,
   View,
} from "react-native";
import Animated, { FadeIn, LinearTransition } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function OnboardingScreen() {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   const { completeOnboarding } = useAuth();

   const [currentStep, setCurrentStep] = useState(0);
   const totalSteps = onboardingSteps.length;

   const handleNext = () => {
      if (currentStep < totalSteps - 1) {
         setCurrentStep(currentStep + 1);
      } else {
         // Onboarding complete - navigate to main app
         completeOnboarding();
      }
   };

   const progress = (currentStep + 1) / totalSteps;

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background }]}
      >
         {/* Logo */}
         <Animated.View
            style={styles.logoContainer}
            entering={FadeIn.duration(800)}
         >
            <Image
               source={require("@/assets/images/logohor.png")}
               style={styles.logo}
               resizeMode="contain"
            />
         </Animated.View>

         {/* Text Content */}
         <View style={styles.textContainer}>
            <OnboardingText step={onboardingSteps[currentStep]} />
         </View>

         {/* Progress Ring with Arrow */}
         <Animated.View
            style={styles.footer}
            layout={LinearTransition.springify()}
         >
            <TouchableOpacity
               style={styles.ringButton}
               onPress={handleNext}
               activeOpacity={0.7}
            >
               <ProgressRing progress={progress} />

               {/* Arrow inside the ring */}
               <View style={styles.arrowContainer}>
                  <ThemedText style={[styles.arrow, { color: colors.h1text }]}>
                     →
                  </ThemedText>
               </View>
            </TouchableOpacity>
         </Animated.View>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: "space-between",
      alignItems: "center",
   },
   logoContainer: {
      marginTop: 60,
      alignItems: "center",
   },
   logo: {
      width: 199,
      height: 126,
   },
   textContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
   },
   footer: {
      marginBottom: 60,
      alignItems: "flex-end",
      width: "100%",
      paddingHorizontal: 32,
   },
   ringButton: {
      position: "relative",
      alignItems: "center",
      justifyContent: "center",
   },
   arrowContainer: {
      position: "absolute",
      alignItems: "center",
      justifyContent: "center",
   },
   arrow: {
      fontSize: 24,
      fontWeight: "bold",
   },
});
