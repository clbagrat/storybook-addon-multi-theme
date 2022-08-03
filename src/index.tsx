import React, { CSSProperties, useEffect } from "react";
import { makeDecorator, addons } from "@storybook/addons";

import { PARAM_NAME, ADDON_ID, THEME_SET } from "./constants";
import { useSelectedThemes } from "./useSelectedThemes";

const channel = addons.getChannel();

const defaultItemStyles: CSSProperties = {
  display: `flex`,
  flex: `1`,
  alignItems: `center`,
  justifyContent: `center`,
  overflow: `auto`,
  padding: `20px`,
};

export const withMultiTheme = makeDecorator({
  name: ADDON_ID,
  parameterName: PARAM_NAME,
  wrapper: (
    getStory,
    context,
    { parameters }: { parameters: MultiThemeParams }
  ) => {
    const [themes, setThemes] = useSelectedThemes(parameters, channel);
    const { list = [], disabled } = parameters;
    const filteredList = list.filter(({ name }) => themes.includes(name));

    useEffect(() => {
      channel.on(THEME_SET, setThemes);
      return () => {
        channel.off(THEME_SET, setThemes);
      };
    }, [setThemes]);

    if (disabled) return getStory(context);
    return (
      <>
        {/* yes yes this is a css inside jsx. don't want to add a bundler just for this small thing */}
        <style>
          {`
            .sb_multi_theme_container {
              display: flex;
              max-width: 100vw;
              min-height: 100vh;
              position: relative;
            }
            .sb-main-padded .sb_multi_theme_container {
              max-width: calc(100vw - 2rem);
              min-height: calc(100vh - 2rem);
            }
            .sbdocs .sb_multi_theme_container {
              max-width: auto;
              min-height: auto
            }
          `}
        </style>
        <div className="sb_multi_theme_container">
          {filteredList.length === 0 && `Please, select a theme`}
          {filteredList.map((themeObject) => (
            <div
              key={themeObject.name}
              className={themeObject.class}
              style={{
                backgroundColor: themeObject.backgroundColor,
                ...(themeObject.itemStyles || defaultItemStyles),
              }}
            >
	      {themeObject.wrapperComponent && themeObject.wrapperComponent({children: getStory(context)})}
              {!themeObject.wrapperComponent && getStory(context)}
            </div>
          ))}
        </div>
      </>
    );
  },
});
