export type AppTheme = {
  name: string;
  primary: string;     // screen background
  secondary: string;   // top bar / header
  onPrimary: string;   // text on the background
  onSecondary: string; // text + icons on the header
};

export const THEMES: AppTheme[] = [
  { name: 'White',  primary: '#ffffff',   secondary: '#8e0d95ff', onPrimary: '#2e2e2eff', onSecondary: '#fffcfcff' },
  { name: 'Dark',   primary: '#1e1d1dff', secondary: '#000000', onPrimary: '#ffffff', onSecondary: '#ffffff' },
  { name: 'Teal',   primary: '#437770ff',   secondary: '#4FA383', onPrimary: '#000000', onSecondary: '#ffffffff' },
  { name: 'Green',  primary: '#2C5745',   secondary: '#1B3A2D', onPrimary: '#ffffff', onSecondary: '#ffffff' },
  { name: 'Blue',   primary: '#4D6787',   secondary: '#344863', onPrimary: '#ffffff', onSecondary: '#ffffff' },
  { name: 'Orange', primary: '#EB7D00',   secondary: '#B35E00', onPrimary: '#000000', onSecondary: '#ffffff' },
];

export const DEFAULT_THEME = THEMES[0];

// Look up a theme from the saved primary color (so existing saved settings still work)
export function getThemeByColor(color: string): AppTheme {
  return (
    THEMES.find((t) => t.primary.toLowerCase() === color.toLowerCase()) ??
    DEFAULT_THEME
  );
}