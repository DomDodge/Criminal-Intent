import React, { createContext, useContext, useState } from 'react';

export type Activity = {
  id: string;
  title: string;
  details: string;
  imageUri: string | null;
  date: number; // timestamp (ms)
  solved: boolean;
};

type ThemeContextType = {
  themeColor: string;
  setThemeColor: (color: string) => void;
  activities: Activity[];
  addActivity: (data: Omit<Activity, 'id'>) => void;
  updateActivity: (id: string, data: Omit<Activity, 'id'>) => void;
  getActivity: (id: string) => Activity | undefined;
};

const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#ffffff',
  setThemeColor: () => {},
  activities: [],
  addActivity: () => {},
  updateActivity: () => {},
  getActivity: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColor] = useState('#ffffff'); // Default: White
  const [activities, setActivities] = useState<Activity[]>([]);

  const addActivity = (data: Omit<Activity, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    setActivities((prev) => [...prev, { id, ...data }]);
  };

  const updateActivity = (id: string, data: Omit<Activity, 'id'>) => {
    setActivities((prev) => prev.map((a) => (a.id === id ? { id, ...data } : a)));
  };

  const getActivity = (id: string) => activities.find((a) => a.id === id);

  return (
    <ThemeContext.Provider
      value={{
        themeColor,
        setThemeColor,
        activities,
        addActivity,
        updateActivity,
        getActivity,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook for consuming theme state inside any screen
export function useTheme() {
  return useContext(ThemeContext);
}