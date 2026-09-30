import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  insertActivity,
  loadActivities,
  updateActivityRow,
} from '../db/activites';
import { getSetting, setSetting } from '../db/settings';

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

const THEME_KEY = 'themeColor';

const ThemeContext = createContext<ThemeContextType>({
  themeColor: '#ffffff',
  setThemeColor: () => {},
  activities: [],
  addActivity: () => {},
  updateActivity: () => {},
  getActivity: () => undefined,
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [themeColor, setThemeColorState] = useState('#ffffff'); // Default: White
  const [activities, setActivities] = useState<Activity[]>([]);

  // Load the saved theme and activities once on startup
  useEffect(() => {
    (async () => {
      try {
        const saved = await getSetting(THEME_KEY);
        if (saved) setThemeColorState(saved);
      } catch (e) {
        console.warn('Failed to load theme', e);
      }

      try {
        const saved = await loadActivities();
        setActivities(saved);
      } catch (e) {
        console.warn('Failed to load activities', e);
      }
    })();
  }, []);

  const setThemeColor = (color: string) => {
    setThemeColorState(color);
    setSetting(THEME_KEY, color).catch((e) =>
      console.warn('Failed to save theme', e)
    );
  };

  const addActivity = (data: Omit<Activity, 'id'>) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const activity: Activity = { id, ...data };
    setActivities((prev) => [...prev, activity]);
    insertActivity(activity).catch((e) =>
      console.warn('Failed to save activity', e)
    );
  };

  const updateActivity = (id: string, data: Omit<Activity, 'id'>) => {
    const activity: Activity = { id, ...data };
    setActivities((prev) => prev.map((a) => (a.id === id ? activity : a)));
    updateActivityRow(activity).catch((e) =>
      console.warn('Failed to update activity', e)
    );
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