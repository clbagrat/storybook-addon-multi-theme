import { API } from '@storybook/api';

import { PARAM_NAME, ADDON_ID } from './constants';

const defaultParams: MultiThemeParams = {
  list: []
}

export const getConfig = (api: API): MultiThemeParams => {
  const data = api.getCurrentStoryData() as { parameters: Record<string, any> };

  return data?.parameters[PARAM_NAME] || defaultParams;
}