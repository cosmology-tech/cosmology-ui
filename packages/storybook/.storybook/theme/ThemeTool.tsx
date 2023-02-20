import React, { Dispatch, useContext, useEffect } from 'react';
import {
  IconButton,
  WithTooltip,
  TooltipLinkList
} from '@storybook/components';
import { ThemeContext, themeList, ThemeListType } from '@cosmology-ui/react';
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
    channel.emit(EVENTS.CHANGE_THEME, selectedTheme.name); // add the event to handle theme
    setTheme(selectedTheme);
    localStorage.setItem('cosmology-ui-theme', selectedTheme.name);
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
  const { theme } = useContext(ThemeContext);
  const [themeTool, setThemeTool] = useAddonState(
    `${ADDON_ID}/current-theme`,
    themeList.filter(({ name }) => name === theme)[0]
  );

  // update theme button display when view mode changed
  useEffect(() => {
    const getTheme = themeList.filter(({ name }) => name === theme)[0];
    setThemeTool(getTheme);
  }, [theme]);

  return (
    <WithTooltip
      trigger="click"
      closeOnClick={true}
      tooltip={({ onHide }) => (
        <Tooltip theme={themeTool} onHide={onHide} setTheme={setThemeTool} />
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
            backgroundColor: themeTool.displayColor,
            overflow: 'hidden'
          }}
        ></div>
        {themeTool.name}
      </IconButton>
    </WithTooltip>
  );
};
