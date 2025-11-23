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

interface AuthButtonProps {
   title: string;
   onPress: () => void;
   disabled?: boolean;
}

export function AuthButton({
   title,
   onPress,
   disabled = false,
}: AuthButtonProps) {
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
                  borderRadius: 15,
               },
            ]}
         />

         {/* Animated colored button */}
         <Pressable
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            onPress={onPress}
            disabled={disabled}
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
                     backgroundColor: disabled ? colors.h2text : colors.primary,
                     borderRadius: 15,
                  },
               ]}
            >
               <ThemedText style={[styles.buttonText, { color: "#FFFFFF" }]}>
                  {title}
               </ThemedText>
            </AnimatedView>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "relative",
      width: 216,
      height: 49,
      marginVertical: 20,
   },
   background: {
      position: "absolute",
      width: 216,
      height: 49,
      top: 6,
      left: 4,
   },
   pressable: {
      width: 216,
      height: 49,
   },
   button: {
      width: 216,
      height: 49,
      justifyContent: "center",
      alignItems: "center",
   },
   buttonText: {
      fontSize: 16,
      fontWeight: "400",
   },
});
