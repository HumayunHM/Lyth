import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, TouchableOpacity, useColorScheme } from "react-native";

interface ProButtonProps {
   onPress: () => void;
}

export function ProButton({ onPress }: ProButtonProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   return (
      <TouchableOpacity
         style={[
            styles.button,
            {
               backgroundColor: colors.accent,
               borderColor: colors.h1text,
            },
         ]}
         onPress={onPress}
         activeOpacity={0.8}
      >
         <ThemedText style={[styles.topText, { color: colors.h1text }]}>
            Get Lyth Pro
         </ThemedText>
         <ThemedText style={[styles.bottomText, { color: colors.h1text }]}>
            Unlimited De-Stressing
         </ThemedText>
      </TouchableOpacity>
   );
}

const styles = StyleSheet.create({
   button: {
      width: 317,
      height: 67,
      borderWidth: 2,
      borderRadius: 15,
      justifyContent: "center",
      alignItems: "center",
      marginVertical: 20,
   },
   topText: {
      fontSize: 24,
      fontWeight: "bold",
   },
   bottomText: {
      fontSize: 14,
      fontWeight: "bold",
      marginTop: 2,
   },
});
