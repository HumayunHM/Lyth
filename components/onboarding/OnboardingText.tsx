import { OnboardingStep } from "@/app/onboarding/onboarding-data";
import { ThemedText } from "@/components/ui/ThemedText";
import React from "react";
import { StyleSheet } from "react-native";
import Animated, { FadeIn, FadeOut, LinearTransition } from "react-native-reanimated";

interface OnboardingTextProps {
   step: OnboardingStep;
   key: number;
}

export function OnboardingText({ step, key }: OnboardingTextProps) {
   return (
      <Animated.View
         style={styles.container}
         key={key}
         entering={FadeIn.duration(600)}
         exiting={FadeOut.duration(400)}
         layout={LinearTransition.springify()}
      >
         <ThemedText variant="title" style={styles.title}>
            {step.title}
         </ThemedText>
         <ThemedText variant="subtitle" style={styles.subtitle}>
            {step.subtitle}
         </ThemedText>
      </Animated.View>
   );
}

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      paddingHorizontal: 24,
   },
   title: {
      fontSize: 32,
      textAlign: "center",
      marginBottom: 16,
      lineHeight: 38,
   },
   subtitle: {
      fontSize: 24,
      textAlign: "center",
      lineHeight: 32,
      opacity: 0.8,
   },
});
