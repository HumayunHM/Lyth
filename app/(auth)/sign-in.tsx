import { AuthButton } from "@/components/auth/AuthButton";
import { AuthInput } from "@/components/auth/AuthInput";
import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import { Link } from "expo-router";
import React, { useState } from "react";
import {
   Image,
   KeyboardAvoidingView,
   Platform,
   ScrollView,
   StyleSheet,
   useColorScheme,
   View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../context/AuthContext";

export default function SignIn() {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];
   const { signIn } = useAuth();

   const [formData, setFormData] = useState({
      email: "",
      password: "",
   });
   const [errors, setErrors] = useState({
      email: "",
      password: "",
   });

   const validateForm = () => {
      const newErrors = {
         email: "",
         password: "",
      };

      if (!formData.email.trim()) {
         newErrors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
         newErrors.email = "Email is invalid";
      }

      if (!formData.password) {
         newErrors.password = "Password is required";
      }

      setErrors(newErrors);
      return !Object.values(newErrors).some((error) => error !== "");
   };

   const handleSignIn = () => {
      if (validateForm()) {
         signIn();
      }
   };

   const updateField = (field: keyof typeof formData, value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when user starts typing
      if (errors[field]) {
         setErrors((prev) => ({ ...prev, [field]: "" }));
      }
   };

   return (
      <SafeAreaView
         style={[styles.container, { backgroundColor: colors.background }]}
      >
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardAvoidingView}
         >
            <ScrollView
               contentContainerStyle={styles.scrollContent}
               showsVerticalScrollIndicator={false}
               keyboardShouldPersistTaps="handled"
            >
               {/* Logo */}
               <View style={styles.logoContainer}>
                  <Image
                     source={require("@/assets/images/logovert.png")} // Update path to your logo
                     style={styles.logo}
                     resizeMode="contain"
                  />
               </View>

               {/* Title */}
               <ThemedText variant="title" style={styles.title}>
                  Sign In
               </ThemedText>

               {/* Form */}
               <View style={styles.form}>
                  <AuthInput
                     label="Email"
                     value={formData.email}
                     onChangeText={(text) => updateField("email", text)}
                     keyboardType="email-address"
                     error={errors.email}
                  />

                  <AuthInput
                     label="Password"
                     value={formData.password}
                     onChangeText={(text) => updateField("password", text)}
                     secureTextEntry
                     error={errors.password}
                  />

                  <AuthButton title="Sign In" onPress={handleSignIn} />

                  {/* Social login placeholder */}
                  <ThemedText style={styles.socialText}>
                     or Sign In with
                  </ThemedText>

                  <View style={styles.socialContainer}>
                     {/* Add social buttons here later */}
                     <View
                        style={[
                           styles.socialButton,
                           { backgroundColor: colors.h2text + "20" },
                        ]}
                     />
                     <View
                        style={[
                           styles.socialButton,
                           { backgroundColor: colors.h2text + "20" },
                        ]}
                     />
                  </View>

                  {/* Sign up link */}
                  <View style={styles.linkContainer}>
                     <ThemedText style={styles.linkText}>
                        Don't have an account?{" "}
                     </ThemedText>
                     <Link href="/(auth)/sign-up" asChild>
                        <ThemedText
                           style={[styles.link, { color: colors.secondary }]}
                        >
                           Sign Up
                        </ThemedText>
                     </Link>
                  </View>
               </View>
            </ScrollView>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
   keyboardAvoidingView: {
      flex: 1,
   },
   scrollContent: {
      flexGrow: 1,
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 20,
   },
   logoContainer: {
      alignItems: "center",
      marginTop: 60,
      marginBottom: 30,
   },
   logo: {
      width: 166,
      height: 165,
   },
   title: {
      fontSize: 32,
      textAlign: "center",
      marginBottom: 40,
   },
   form: {
      width: "100%",
      alignItems: "center",
   },
   socialText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: "center",
   },
   socialContainer: {
      flexDirection: "row",
      justifyContent: "center",
      gap: 20,
      marginBottom: 30,
   },
   socialButton: {
      width: 50,
      height: 50,
      borderRadius: 25,
   },
   linkContainer: {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 30,
   },
   linkText: {
      fontSize: 16,
   },
   link: {
      fontSize: 16,
   },
});
