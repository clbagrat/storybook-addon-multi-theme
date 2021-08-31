# Storybook Addon Multi Theme

Multiple themes simultaneously

![Demo](demo.gif)


## Installation

```sh
npm i -D storybook-addon-multi-theme
```

## Getting started

```js
// .storybook/main.js
module.exports = {
  addons: [
    // ...otherAddons
    'storybook-addon-multi-theme'
  ],
};
```

```js
// .storybook/preview.js
import { ThemeProvider } from 'emotion-theming';

export const parameters = {
  multiTheme:
    {
      list: [
        {
          name: "Light",
          class: "light-theme", // this is handy if you set theme styles based on parent css class
          iconColor: "#fff",
          backgroundColor: `#fff`,
          selectedByDefault: true,
	  wrapperComponent: ({children}) => {
	    return <ThemeProvider theme={light}> {children} </ThemeProvider>
    	  }
        },
        {
          name: "Dark",
          class: "dark-theme",
          iconColor: "#1E2125",
          backgroundColor: `#1E2125`,
	  wrapperComponent: ({children}) => {
	    return <ThemeProvider theme={light}> {children} </ThemeProvider>
    	  }
        }
      ]
    }
}
```
