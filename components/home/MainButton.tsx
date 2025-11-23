import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import React from "react";
import { Pressable, StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

interface MainButtonProps {
   onPress: () => void;
}

export function MainButton({ onPress }: MainButtonProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];
   const translateY = useSharedValue(0);

   const animatedStyle = useAnimatedStyle(() => {
      return {
         transform: [{ translateY: translateY.value }],
      };
   });

   const handlePressIn = () => {
      translateY.value = withSpring(4, { damping: 10, stiffness: 200 });
   };

   const handlePressOut = () => {
      translateY.value = withSpring(0, { damping: 10, stiffness: 200 });
   };

   return (
      <View style={styles.container}>
         {/* Black background */}
         <View
            style={[
               styles.background,
               {
                  backgroundColor: colorScheme === "dark" ? "#333" : "#000",
                  borderRadius: 46, // Half of 92
               },
            ]}
         />

         {/* Animated colored button */}
         <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            style={({ pressed }) => [
               styles.pressable,
               { opacity: pressed ? 0.9 : 1 },
            ]}
         >
            <AnimatedView
               style={[
                  styles.button,
                  animatedStyle,
                  {
                     backgroundColor: colors.primary,
                     borderRadius: 46,
                  },
               ]}
            >
               <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
                  De-Stress
               </ThemedText>
            </AnimatedView>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "relative",
      width: 218,
      height: 92,
      marginVertical: 20,
   },
   background: {
      position: "absolute",
      width: 218,
      height: 92,
      top: 9,
      left: 4,
   },
   pressable: {
      width: 218,
      height: 92,
   },
   button: {
      width: 218,
      height: 92,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      fontSize: 24,
      fontWeight: "bold",
   },
});
