import Colors from "@/constants/Colors";
import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";
import Animated, {
   Easing,
   useAnimatedProps,
   useSharedValue,
   withTiming,
} from "react-native-reanimated";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface ProgressRingProps {
   progress: number; // 0 to 1
   size?: number;
   strokeWidth?: number;
}

export function ProgressRing({
   progress,
   size = 80,
   strokeWidth = 4,
}: ProgressRingProps) {
   const colorScheme = useColorScheme();
   const colors = Colors[colorScheme ?? "light"];

   const radius = (size - strokeWidth) / 2;
   const circumference = radius * 2 * Math.PI;
   const animatedProgress = useSharedValue(0);

   React.useEffect(() => {
      animatedProgress.value = withTiming(progress, {
         duration: 500,
         easing: Easing.out(Easing.ease),
      });
   }, [progress]);

   const animatedProps = useAnimatedProps(() => {
      const strokeDashoffset = circumference * (1 - animatedProgress.value);
      return {
         strokeDashoffset,
      };
   });

   return (
      <View style={[styles.container, { width: size, height: size }]}>
         <Svg width={size} height={size} style={styles.svg}>
            {/* Background ring */}
            <Circle
               cx={size / 2}
               cy={size / 2}
               r={radius}
               stroke={colors.h2text}
               strokeWidth={strokeWidth}
               fill="transparent"
               opacity={0.3}
            />
            {/* Progress ring */}
            <AnimatedCircle
               cx={size / 2}
               cy={size / 2}
               r={radius}
               stroke={colors.secondary}
               strokeWidth={strokeWidth}
               fill="transparent"
               strokeDasharray={circumference}
               animatedProps={animatedProps}
               strokeLinecap="round"
               rotation="-90"
               originX={size / 2}
               originY={size / 2}
            />
         </Svg>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      position: "relative",
   },
   svg: {
      transform: [{ rotate: "-90deg" }],
   },
});
