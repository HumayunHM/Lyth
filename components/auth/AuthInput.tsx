import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import React, { useState } from "react";
import { StyleSheet, TextInput, useColorScheme, View } from "react-native";

interface AuthInputProps {
   label: string;
   value: string;
   onChangeText: (text: string) => void;
   secureTextEntry?: boolean;
   autoCapitalize?: "none" | "sentences" | "words" | "characters";
   keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
   error?: string;
}

export function AuthInput({
   label,
   value,
   onChangeText,
   secureTextEntry = false,
   autoCapitalize = "none",
   keyboardType = "default",
   error,
}: AuthInputProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];
   const [isFocused, setIsFocused] = useState(false);

   return (
      <View style={styles.container}>
         <ThemedText style={styles.label}>{label}</ThemedText>
         <TextInput
            style={[
               styles.input,
               {
                  borderColor: isFocused ? colors.secondary : colors.h1text,
                  color: colors.h1text,
                  backgroundColor: colors.background,
               },
            ]}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            autoCapitalize={autoCapitalize}
            keyboardType={keyboardType}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholderTextColor={colors.h2text}
         />
         {error && <ThemedText style={styles.error}>{error}</ThemedText>}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      marginBottom: 20,
      width: 312,
   },
   label: {
      fontSize: 16,
      marginBottom: 8,
   },
   input: {
      height: 39,
      borderWidth: 1,
      borderRadius: 10,
      paddingHorizontal: 12,
      fontSize: 16,
   },
   error: {
      fontSize: 14,
      marginTop: 4,
      color: "#FF5252",
   },
});
