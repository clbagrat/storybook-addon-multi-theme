import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import { Channel } from '@storybook/addons'
import { THEME_SET } from './constants'

const getSelectedThemes = (config: MultiThemeParams): string[] => config.list.filter(themeParam => themeParam.selectedByDefault).map(({name}) => name);

export const useSelectedThemes = (config: MultiThemeParams, channel?: Channel): [string[], (Dispatch<SetStateAction<string[]>>)] => {
  let last:string[] = null;

  if (channel) {
    last = channel.last(THEME_SET) && channel.last(THEME_SET)[0]
  }

  const [selectedThemes, setSelectedThemes] = useState(last || getSelectedThemes(config));

  useEffect(() => {
    setSelectedThemes(last || getSelectedThemes(config));
  }, [config.list]);

  return [selectedThemes, setSelectedThemes];
}