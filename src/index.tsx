import React, { useEffect, useState } from 'react';
import { makeDecorator, addons } from '@storybook/addons';

import { PARAM_NAME, ADDON_ID, THEME_SET } from './constants';
import { useSelectedThemes } from './useSelectedThemes';

const channel = addons.getChannel();

const containerStyles: Record<string, string> = {
  display: `flex`,
  width: `100%`,
  height: `100%`,
  position: `absolute`,
  left: `0px`,
  top: `0px`
}

const itemStyles: Record<string, string> = {
  display: `flex`,
  flex: `1`,
  alignItems: `center`,
  justifyContent: `center`,
  overflow: `auto`
}


export const withMultiTheme = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_NAME,
  wrapper: (getStory, context, { parameters } : { parameters: MultiThemeParams }) => {
    const [themes, setThemes] = useSelectedThemes(parameters)
    const { list = [] } = parameters;

    const filteredList = list.filter(({name}) => themes.includes(name));

    useEffect(() => {
      channel.on(THEME_SET, setThemes);
      return () => {
        channel.off(THEME_SET, setThemes);
      }
    }, [setThemes])

    return <div style={containerStyles}>
      {filteredList.length === 0 && `Please, select a theme`}
      {filteredList.map((themeObject) => (
        <div key={themeObject.name} style={{backgroundColor: themeObject.backgroundColor, ...itemStyles}}>
          {getStory(context)}
        </div>
      ))}
    </div>
  }
})
