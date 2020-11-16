import React from 'react';
import {useTheme} from '@storybook/theming';

type ColorSwatchParams = {
  color: string,
  background: string,
}

export const ColorSwatch = (params: ColorSwatchParams) =>  {
  const theme:any = useTheme();

  return (
    <div style={{
      width: 15,
      height: 15,
      borderRadius: 15,
      border: `2px solid ${params.background}`,
      backgroundColor: params.color,
      boxShadow: `${theme.appBorderColor} 0 0 0 1px`,
    }} />
  )

}