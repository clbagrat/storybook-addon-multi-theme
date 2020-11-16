import React, {useMemo, useEffect, useState} from 'react'
import { useParameter, useAddonState, API } from '@storybook/api';
import { Icons, IconButton, WithTooltip, TooltipLinkList } from '@storybook/components';
import { Link } from '@storybook/components/dist/tooltip/TooltipLinkList';
import { ColorSwatch } from './ColorSwatch';
import { THEME_TOGGLE, THEME_SET } from '../constants';
import { getConfig } from '../configuration';
import { toggle } from '../shared'
import { useSelectedThemes } from '../useSelectedThemes';


const getTooltipList = (params: MultiThemeParams, selectedThemes: string[], api: API): Link[] => {
  if (!params.list) return [];
  return params.list.map((theme) => ({
    id: theme.name, title: theme.name,
    onClick: () => api.emit(THEME_TOGGLE, theme.name),
    value: theme.name,
    right: <ColorSwatch color={theme.iconColor} background={theme.backgroundColor} />,
    active: selectedThemes.includes(theme.name)
  }))
}

type ToggleProps = {
  api: API
}

export const Toggle = ({ api }: ToggleProps) => {
  const config = getConfig(api);
  const [selectedThemes, setSelectedThemes] = useSelectedThemes(config);

  const themeList = getTooltipList(config, selectedThemes, api);

  useEffect(() => {
    const fireEvent = (theme: string) => {
      const newSet = toggle(selectedThemes, theme);
      setSelectedThemes(newSet);
      api.emit(THEME_SET, newSet);
    };

    api.on(THEME_TOGGLE, fireEvent);

    return () => {
      api.off(THEME_TOGGLE, fireEvent);
    }

  }, [api, selectedThemes, setSelectedThemes])


  if (!config.list || !config.list.length) return null;

  return (
    <WithTooltip
      placement="top"
      trigger="click"
      tooltip={<TooltipLinkList links={themeList} />}
      closeOnClick
    >
      <IconButton
        key="theme"
        active={selectedThemes.length > 0}
        title="Change the theme"
      >
        <Icons icon="paintbrush" />
      </IconButton>
    </WithTooltip>
  )
}