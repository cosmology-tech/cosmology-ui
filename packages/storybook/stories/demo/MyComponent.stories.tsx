import { ComponentStory } from '@storybook/react';
import React from 'react';

import { MyComponent } from './MyComponent';

export const MyComponentStory: ComponentStory<typeof MyComponent> = (args) => {
  return <MyComponent {...args} />;
};

MyComponentStory.args = {
  children: 'MyComponent example'
};

MyComponentStory.storyName = 'MyComponent';
