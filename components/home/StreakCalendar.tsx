import { ThemedText } from "@/components/ui/ThemedText";
import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

interface StreakCalendarProps {
   streakData: boolean[]; // Array of 7 booleans for the week
}

export function StreakCalendar({ streakData }: StreakCalendarProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   const days = ["S", "M", "T", "W", "T", "F", "S"];

   return (
      <View style={styles.container}>
         <ThemedText style={[styles.title, { color: colors.h1text }]}>
            Daily Streak
         </ThemedText>

         <View style={styles.calendar}>
            {streakData.map((completed, index) => (
               <View key={index} style={styles.dayContainer}>
                  <View style={[styles.ring, { borderColor: colors.h2text }]}>
                     <View
                        style={[
                           styles.circle,
                           {
                              backgroundColor: completed
                                 ? colors.secondary
                                 : colors.popupbg,
                           },
                        ]}
                     />
                  </View>
                  <ThemedText style={styles.dayLabel}>{days[index]}</ThemedText>
               </View>
            ))}
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      alignItems: "center",
      marginBottom: 40,
   },
   title: {
      fontSize: 24,
      marginBottom: 16,
   },
   calendar: {
      flexDirection: "row",
      justifyContent: "space-between",
      width: "100%",
      paddingHorizontal: 20,
   },
   dayContainer: {
      alignItems: "center",
   },
   ring: {
      width: 32,
      height: 32,
      borderRadius: 15,
      borderWidth: 2,
      justifyContent: "center",
      alignItems: "center",
      marginBottom: 4,
   },
   circle: {
      width: 26,
      height: 26,
      borderRadius: 13,
   },
   dayLabel: {
      fontSize: 12,
      marginTop: 4,
   },
});
