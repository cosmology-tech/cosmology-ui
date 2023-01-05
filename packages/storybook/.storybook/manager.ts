import React from 'react';
import { addons, types } from '@storybook/addons';
import { ThemeTool } from './theme/ThemeTool';
import { ADDON_ID, TOOL_ID } from './theme/constants';

// import {
//   ADDON_ID as COLOR_MODE_ADDON_ID,
//   COLOR_MODE_TOOL_ID
// } from './color-mode/constants';
// import { ColorModeTool } from './color-mode/ColorModeTools';

// addons.register(COLOR_MODE_ADDON_ID, () => {
//   const match = ({ viewMode }: { viewMode?: string }) =>
//     Boolean(viewMode && viewMode.match(/^(story)$/));

//   addons.add(COLOR_MODE_TOOL_ID, {
//     type: types.TOOL,
//     title: 'Color Mode',
//     render: ColorModeTool,
//     match
//   });
// });

addons.register(ADDON_ID, () => {
  const match = ({ viewMode }: { viewMode?: string }) =>
    Boolean(viewMode && viewMode.match(/^(story)$/));

  addons.add(TOOL_ID, {
    type: types.TOOL,
    title: 'Theme',
    match: match,
    render: ThemeTool
  });
});
