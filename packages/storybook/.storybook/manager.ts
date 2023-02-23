import React from 'react';
import { addons, types } from '@storybook/addons';
import { ThemeTool } from './theme/ThemeTool';
import { ADDON_ID, TOOL_ID } from './theme/constants';

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
