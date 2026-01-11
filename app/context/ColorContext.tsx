import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

export type ColorScheme = "orange" | "blue" | "green" | "purple" | "red" | "cyan" | "pink";

interface ColorSchemeData {
  name: string;
  primary: string;
  secondary: string;
  accent: string;
}

const COLOR_SCHEMES: Record<ColorScheme, ColorSchemeData> = {
  orange: {
    name: "Orange",
    primary: "#ff6b35",
    secondary: "#ff8c42",
    accent: "#ffa366",
  },
  blue: {
    name: "Blue",
    primary: "#2563eb",      // Azul vibrante
    secondary: "#3b82f6",    // Azul medio
    accent: "#60a5fa",       // Azul claro
  },
  green: {
    name: "Green",
    primary: "#10b981",      // Verde esmeralda
    secondary: "#34d399",    // Verde claro
    accent: "#6ee7b7",       // Verde pastel
  },
  purple: {
    name: "Purple",
    primary: "#8b5cf6",      // Púrpura vibrante
    secondary: "#a78bfa",    // Púrpura claro
    accent: "#c4b5fd",       // Lavanda
  },
  red: {
    name: "Red",
    primary: "#ef4444",      // Rojo vibrante
    secondary: "#f87171",    // Rojo cálido
    accent: "#fca5a5",       // Rojo claro
  },
  cyan: {
    name: "Cyan",
    primary: "#06b6d4",      // Cyan vibrante
    secondary: "#22d3ee",    // Cyan brillante
    accent: "#67e8f9",       // Cyan claro
  },
  pink: {
    name: "Pink",
    primary: "#ec4899",      // Rosa vibrante
    secondary: "#f472b6",    // Rosa cálido
    accent: "#f9a8d4",       // Rosa claro
  },
};

interface ColorContextType {
  color: ColorScheme;
  setColor: (color: ColorScheme) => void;
  mounted: boolean;
  colors: typeof COLOR_SCHEMES;
}

const ColorContext = createContext<ColorContextType | undefined>(undefined);

interface ColorProviderProps {
  children: ReactNode;
}

export function ColorProvider({ children }: ColorProviderProps) {
  const [color, setColorState] = useState<ColorScheme>("cyan");
  const [mounted, setMounted] = useState(false);

  // Solo en cliente: cargar color guardado
  useEffect(() => {
    const savedColor = localStorage.getItem("portfolio-color") as ColorScheme | null;
    // Validar que el color guardado existe en el esquema, si no, usar cyan
    if (savedColor && COLOR_SCHEMES[savedColor]) {
      setColorState(savedColor);
    } else {
      // Si no hay color guardado o es inválido, usar cyan por defecto
      setColorState("cyan");
      localStorage.setItem("portfolio-color", "cyan");
    }
    setMounted(true);
  }, []);

  // Aplicar colores al documento
  useEffect(() => {
    if (mounted) {
      localStorage.setItem("portfolio-color", color);
      const scheme = COLOR_SCHEMES[color];

      // Actualizar CSS variables
      document.documentElement.style.setProperty('--color-primary', scheme.primary);
      document.documentElement.style.setProperty('--color-secondary', scheme.secondary);
      document.documentElement.style.setProperty('--color-accent', scheme.accent);
      document.documentElement.style.setProperty(
        '--shadow-glow',
        `0 0 40px ${scheme.primary}66`
      );

      // Actualizar meta theme-color para la barra del navegador
      const metaThemeColor = document.querySelector('meta[name="theme-color"]');
      if (metaThemeColor) {
        metaThemeColor.setAttribute('content', scheme.primary);
      }
    }
  }, [color, mounted]);

  const setColor = (newColor: ColorScheme) => {
    if (COLOR_SCHEMES[newColor]) {
      setColorState(newColor);
    }
  };

  return (
    <ColorContext.Provider value={{ color, setColor, mounted, colors: COLOR_SCHEMES }}>
      {children}
    </ColorContext.Provider>
  );
}

export function useColor() {
  const context = useContext(ColorContext);
  if (context === undefined) {
    throw new Error("useColor must be used within a ColorProvider");
  }
  return context;
}
