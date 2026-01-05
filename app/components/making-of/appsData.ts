export interface AppDetail {
  id: string;
  name: string;
  descriptionKey: string;
  icon: string;
  color: string; // Color principal de la app
  platforms: ("ios" | "android")[];
  url?: string;
  iosUrl?: string;
  androidUrl?: string;

  // Información detallada para el modal
  overviewKey: string;
  techStack: string[];
  features: string[];
  architecture: {
    titleKey: string;
    items: string[];
  };
  screens: {
    titleKey: string;
    items: string[];
  };
  integrations: string[];
}

export const appsData: AppDetail[] = [
  {
    id: "buyvoice",
    name: "BuyVoice",
    descriptionKey: "makingOf.buyvoice.description",
    icon: "/app-icon.png",
    color: "#ff6b35",
    platforms: ["ios", "android"],
    url: "https://www.buyvoice.app",
    iosUrl: "https://apps.apple.com/app/voice-shopping-list/id6505125372",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.VoiceList",
    overviewKey: "makingOf.buyvoice.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "AsyncStorage", "TypeScript"],
    features: [
      "makingOf.buyvoice.features.voice",
      "makingOf.buyvoice.features.ai",
      "makingOf.buyvoice.features.offline",
      "makingOf.buyvoice.features.multilang"
    ],
    architecture: {
      titleKey: "makingOf.buyvoice.architecture.title",
      items: [
        "makingOf.buyvoice.architecture.contextApi",
        "makingOf.buyvoice.architecture.localStorage",
        "makingOf.buyvoice.architecture.aiIntegration"
      ]
    },
    screens: {
      titleKey: "makingOf.buyvoice.screens.title",
      items: [
        "makingOf.buyvoice.screens.home",
        "makingOf.buyvoice.screens.lists",
        "makingOf.buyvoice.screens.settings"
      ]
    },
    integrations: ["OpenAI API", "Expo Voice Recognition", "Local Storage"]
  },
  {
    id: "hundezonen",
    name: "Hundezonen",
    descriptionKey: "makingOf.hundezonen.description",
    icon: "/hnde.png",
    color: "#4a90e2",
    platforms: ["ios", "android"],
    url: "https://www.hundezonen.ch",
    iosUrl: "https://apps.apple.com/us/app/hundezonen/id6745336299",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.HundezonenSchweiz&pli=1",
    overviewKey: "makingOf.hundezonen.overview",
    techStack: ["React Native", "Expo SDK ~54", "React Native Maps", "Geolocation API", "PHP/MySQL Backend"],
    features: [
      "makingOf.hundezonen.features.map",
      "makingOf.hundezonen.features.gps",
      "makingOf.hundezonen.features.filters",
      "makingOf.hundezonen.features.offline"
    ],
    architecture: {
      titleKey: "makingOf.hundezonen.architecture.title",
      items: [
        "makingOf.hundezonen.architecture.maps",
        "makingOf.hundezonen.architecture.geolocation",
        "makingOf.hundezonen.architecture.backend"
      ]
    },
    screens: {
      titleKey: "makingOf.hundezonen.screens.title",
      items: [
        "makingOf.hundezonen.screens.map",
        "makingOf.hundezonen.screens.list",
        "makingOf.hundezonen.screens.details",
        "makingOf.hundezonen.screens.favorites"
      ]
    },
    integrations: ["Google Maps API", "PHP Backend", "MySQL Database", "Geolocation Services"]
  },
  {
    id: "foodscan",
    name: "FoodScan AI",
    descriptionKey: "makingOf.foodscan.description",
    icon: "/foof.png",
    color: "#00c853",
    platforms: ["ios", "android"],
    url: "https://www.foodscan-ai.com",
    iosUrl: "https://apps.apple.com/us/app/foodscan-ai/id6472478688",
    androidUrl: "https://play.google.com/store/apps/details?id=com.lwebch.foodmentoai",
    overviewKey: "makingOf.foodscan.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4 Vision", "Camera API", "AsyncStorage"],
    features: [
      "makingOf.foodscan.features.camera",
      "makingOf.foodscan.features.nutrition",
      "makingOf.foodscan.features.history",
      "makingOf.foodscan.features.multilang"
    ],
    architecture: {
      titleKey: "makingOf.foodscan.architecture.title",
      items: [
        "makingOf.foodscan.architecture.vision",
        "makingOf.foodscan.architecture.imageProcessing",
        "makingOf.foodscan.architecture.caching"
      ]
    },
    screens: {
      titleKey: "makingOf.foodscan.screens.title",
      items: [
        "makingOf.foodscan.screens.camera",
        "makingOf.foodscan.screens.analysis",
        "makingOf.foodscan.screens.history",
        "makingOf.foodscan.screens.profile"
      ]
    },
    integrations: ["OpenAI Vision API", "Expo Camera", "Expo Image Picker", "AsyncStorage"]
  },
  {
    id: "dogmentor",
    name: "DogMentor KI",
    descriptionKey: "makingOf.dogmentor.description",
    icon: "/dog.jpg",
    color: "#ff9800",
    platforms: ["ios"],
    url: "https://dog-mentor.com",
    iosUrl: "https://apps.apple.com/us/app/dogmentor/id6467635587",
    overviewKey: "makingOf.dogmentor.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "Context API", "AsyncStorage"],
    features: [
      "makingOf.dogmentor.features.chat",
      "makingOf.dogmentor.features.training",
      "makingOf.dogmentor.features.behavior",
      "makingOf.dogmentor.features.personalized"
    ],
    architecture: {
      titleKey: "makingOf.dogmentor.architecture.title",
      items: [
        "makingOf.dogmentor.architecture.chat",
        "makingOf.dogmentor.architecture.context",
        "makingOf.dogmentor.architecture.prompts"
      ]
    },
    screens: {
      titleKey: "makingOf.dogmentor.screens.title",
      items: [
        "makingOf.dogmentor.screens.chat",
        "makingOf.dogmentor.screens.dogProfile",
        "makingOf.dogmentor.screens.tips",
        "makingOf.dogmentor.screens.settings"
      ]
    },
    integrations: ["OpenAI Chat API", "AsyncStorage", "Push Notifications"]
  },
  {
    id: "ketorecipe",
    name: "KetoRecipeLab",
    descriptionKey: "makingOf.ketorecipe.description",
    icon: "/iconoapp.png",
    color: "#8e24aa",
    platforms: ["ios"],
    url: "https://keto-recipe.app",
    iosUrl: "https://apps.apple.com/us/app/ketorecipelab/id6757017200",
    overviewKey: "makingOf.ketorecipe.overview",
    techStack: ["React Native", "Expo SDK ~54", "OpenAI GPT-4", "RevenueCat", "PHP/MySQL Backend"],
    features: [
      "makingOf.ketorecipe.features.aiRecipes",
      "makingOf.ketorecipe.features.mealPlan",
      "makingOf.ketorecipe.features.nutrition",
      "makingOf.ketorecipe.features.favorites"
    ],
    architecture: {
      titleKey: "makingOf.ketorecipe.architecture.title",
      items: [
        "makingOf.ketorecipe.architecture.contexts",
        "makingOf.ketorecipe.architecture.services",
        "makingOf.ketorecipe.architecture.backend"
      ]
    },
    screens: {
      titleKey: "makingOf.ketorecipe.screens.title",
      items: [
        "makingOf.ketorecipe.screens.home",
        "makingOf.ketorecipe.screens.explore",
        "makingOf.ketorecipe.screens.favorites",
        "makingOf.ketorecipe.screens.nutrition",
        "makingOf.ketorecipe.screens.profile"
      ]
    },
    integrations: ["OpenAI API", "RevenueCat", "PHP Backend", "MySQL Database", "Image Upload"]
  },
  {
    id: "workti",
    name: "Work Ti",
    descriptionKey: "makingOf.workti.description",
    icon: "/workti.png",
    color: "#1976d2",
    platforms: ["ios"],
    url: "https://www.workti.app",
    iosUrl: "https://apps.apple.com/us/app/vixtime/id6745336262",
    overviewKey: "makingOf.workti.overview",
    techStack: ["React Native", "Expo SDK ~54", "AsyncStorage", "Charts Library", "Date Management"],
    features: [
      "makingOf.workti.features.tracking",
      "makingOf.workti.features.reports",
      "makingOf.workti.features.projects",
      "makingOf.workti.features.export"
    ],
    architecture: {
      titleKey: "makingOf.workti.architecture.title",
      items: [
        "makingOf.workti.architecture.timeTracking",
        "makingOf.workti.architecture.localStorage",
        "makingOf.workti.architecture.charts"
      ]
    },
    screens: {
      titleKey: "makingOf.workti.screens.title",
      items: [
        "makingOf.workti.screens.timer",
        "makingOf.workti.screens.projects",
        "makingOf.workti.screens.reports",
        "makingOf.workti.screens.settings"
      ]
    },
    integrations: ["AsyncStorage", "React Native Charts", "Date-fns", "Export to CSV"]
  }
];
