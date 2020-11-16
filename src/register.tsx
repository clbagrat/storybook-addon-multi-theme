import React from 'react';
import addons, { types } from '@storybook/addons';
import { ADDON_ID } from './constants';
import {Toggle} from './components/Toggle';

addons.register(ADDON_ID, (api) => {
  addons.addPanel(ADDON_ID, {
    title: ADDON_ID,
    type: types.TOOL,
    match: ({ viewMode }) => viewMode === 'story' || viewMode === 'docs',
    render: () => <Toggle api={api}/>,
  });
});
