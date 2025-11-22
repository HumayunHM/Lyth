export interface OnboardingStep {
   id: number;
   title: string;
   subtitle: string;
}

export const onboardingSteps: OnboardingStep[] = [
   {
      id: 1,
      title: "Tired of feeling overwhelmed?",
      subtitle:
         "Modern life is designed to keep your stress response constantly switched on.",
   },
   {
      id: 2,
      title: "A Smarter Way to Find Calm",
      subtitle:
         "Lyth uses neuroscience to retrain your brain's response to stress, not just help you escape it.",
   },
   {
      id: 3,
      title: "Your Space to Decompress",
      subtitle:
         "Just 5 minutes a day can build the unshakable calm you're looking for. Ready to find your Lyth?",
   },
];
