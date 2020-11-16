import { useEffect, useState, Dispatch, SetStateAction } from 'react';

export const getSelectedThemes = (config: MultiThemeParams): string[] => config.list.filter(themeParam => themeParam.selectedByDefault).map(({name}) => name);

export const useSelectedThemes = (config: MultiThemeParams): [string[], (Dispatch<SetStateAction<string[]>>)] => {
  const [selectedThemes, setSelectedThemes] = useState(getSelectedThemes(config));
  useEffect(() => {
    setSelectedThemes(getSelectedThemes(config));
  }, [config.list]);
  return [selectedThemes, setSelectedThemes];
}