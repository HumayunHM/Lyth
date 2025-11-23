import { useRouter } from "expo-router";
import { createContext, ReactNode, useContext, useState } from "react";

interface AuthContextType {
   isAuthenticated: boolean;
   hasCompletedOnboarding: boolean;
   completeOnboarding: () => void;
   signIn: () => void;
   signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);
   const router = useRouter();

   const completeOnboarding = () => {
      setHasCompletedOnboarding(true);
      router.replace("/(auth)/sign-up");
   };

   const signIn = () => {
      setIsAuthenticated(true);
      router.replace("/(app)/(tabs)/home");
   };

   const signOut = () => {
      setIsAuthenticated(false);
      router.replace("/(auth)/sign-in");
   };

   return (
      <AuthContext.Provider
         value={{
            isAuthenticated,
            hasCompletedOnboarding,
            completeOnboarding,
            signIn,
            signOut,
         }}
      >
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = () => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error("useAuth must be used within an AuthProvider");
   }
   return context;
};
