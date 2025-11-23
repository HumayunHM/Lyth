import Colors from "@/constants/Colors";
import React from "react";
import {
   Image,
   Pressable,
   StyleSheet,
   useColorScheme,
   View,
} from "react-native";
import Animated, {
   useAnimatedStyle,
   useSharedValue,
   withSpring,
} from "react-native-reanimated";

const AnimatedView = Animated.createAnimatedComponent(View);

interface ProfileButtonProps {
   onPress: () => void;
}

export function ProfileButton({ onPress }: ProfileButtonProps) {
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
                  borderRadius: 37.5, // Half of 75
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
                     borderRadius: 37.5,
                  },
               ]}
            >
               <Image
                  source={require("@/assets/images/profile-icon.png")} // Update path to your profile icon
                  style={styles.icon}
                  resizeMode="contain"
               />
            </AnimatedView>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "relative",
      width: 75,
      height: 75,
   },
   background: {
      position: "absolute",
      width: 75,
      height: 75,
      top: 4,
      left: 3,
   },
   pressable: {
      width: 75,
      height: 75,
   },
   button: {
      width: 75,
      height: 75,
      justifyContent: "center",
      alignItems: "center",
   },
   icon: {
      width: 35,
      height: 35,
   },
});
