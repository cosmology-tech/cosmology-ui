import { addons, types } from '@storybook/addons';
import { ADDON_ID, COLOR_MODE_TOOL_ID } from './color-mode/constants';
import { ColorModeTool } from './color-mode/ColorModeTools';

addons.register(ADDON_ID, () => {
  const match = ({ viewMode }: { viewMode?: string }) =>
    Boolean(viewMode && viewMode.match(/^(story)$/));

  addons.add(COLOR_MODE_TOOL_ID, {
    type: types.TOOL,
    title: 'Color Mode',
    render: ColorModeTool,
    match
  });
});
