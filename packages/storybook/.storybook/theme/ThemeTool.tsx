import React, { Dispatch, useEffect } from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList
} from '@storybook/components';
import { themeList, ThemeListType } from '@cosmology-ui/react';
import addons from '@storybook/addons';
import { useAddonState } from '@storybook/api';
import { ADDON_ID, EVENTS } from './constants';

// dropdown
const Tooltip = ({
  theme,
  onHide,
  setTheme
}: {
  theme: ThemeListType;
  onHide: () => void;
  setTheme: Dispatch<React.SetStateAction<ThemeListType>>;
}) => {
  const channel = addons.getChannel();

  function handleClick(selectedTheme: ThemeListType) {
    onHide(); // close dropdown
    sessionStorage.setItem('current-theme', selectedTheme.name); // update current theme in session
    channel.emit(EVENTS.CHANGE_THEME, selectedTheme.name); // add the event to handle theme
    setTheme(selectedTheme);
  }

  return (
    <TooltipLinkList
      links={themeList.map((data) => {
        return {
          id: data.name,
          title: data.name,
          active: data.name === theme.name,
          right: (
            <div
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '100%',
                padding: '1px',
                border: '1px solid',
                backgroundColor: data.displayColor,
                overflow: 'hidden'
              }}
            ></div>
          ),
          onClick: () => handleClick(data)
        };
      })}
    />
  );
};

export const ThemeTool = () => {
  const getCurrent =
    sessionStorage.getItem('current-theme') ||
    localStorage.getItem('chakra-ui-color-mode');
  const [theme, setTheme] = useAddonState(
    `${ADDON_ID}/current-theme`,
    themeList.filter(({ name }) => name === getCurrent)[0]
  );

  // update theme button display when view mode changed
  useEffect(() => {
    if (!sessionStorage.getItem('current-theme'))
      sessionStorage.setItem('current-theme', 'light');

    window.addEventListener('storage', () => {
      const current = sessionStorage.getItem('current-theme') || 'light';
      const getTheme = themeList.filter(({ name }) => name === current)[0];
      setTheme(getTheme);
    });
  }, []);

  return (
    <WithTooltip
      trigger="click"
      closeOnClick={true}
      tooltip={({ onHide }) => (
        <Tooltip theme={theme} onHide={onHide} setTheme={setTheme} />
      )}
    >
      <IconButton active={true}>
        <div
          style={{
            width: '14px',
            height: '14px',
            borderRadius: '100%',
            marginRight: '5px',
            padding: '1px',
            border: '1px solid',
            backgroundColor: theme.displayColor,
            overflow: 'hidden'
          }}
        ></div>
        {theme.name}
      </IconButton>
    </WithTooltip>
  );
};
