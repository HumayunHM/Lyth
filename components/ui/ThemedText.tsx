import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TextProps, useColorScheme } from "react-native";

type ThemedTextProps = TextProps & {
   variant?: "default" | "title" | "subtitle" | "body" | "caption";
   style?: any;
   children: React.ReactNode;
};

export function ThemedText({
   variant = "default",
   style,
   children,
   ...rest
}: ThemedTextProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   const variantStyle = styles[variant];

   return (
      <Text style={[variantStyle, { color: colors.h1text }, style]} {...rest}>
         {children}
      </Text>
   );
}

const styles = StyleSheet.create({
   default: {
      fontFamily: "PlusJakartaSans-Regular",
      fontSize: 16,
      lineHeight: 24,
   },
   title: {
      fontFamily: "PlusJakartaSans-Bold",
      fontSize: 32,
      lineHeight: 40,
   },
   subtitle: {
      fontFamily: "PlusJakartaSans-SemiBold",
      fontSize: 24,
      lineHeight: 32,
   },
   body: {
      fontFamily: "PlusJakartaSans-Regular",
      fontSize: 18,
      lineHeight: 26,
   },
   caption: {
      fontFamily: "PlusJakartaSans-Regular",
      fontSize: 14,
      lineHeight: 20,
      opacity: 0.7,
   },
});
