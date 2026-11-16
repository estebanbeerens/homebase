import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, View } from 'react-native';
import { ThemeProvider } from './ThemeProvider';

const meta = {
  title: 'Atoms/ThemeProvider',
  component: ThemeProvider,
} satisfies Meta<typeof ThemeProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <View className="flex-1 gap-3 bg-bg p-5">
        <Text className="text-title text-text">Homebase</Text>
        <Text className="text-body text-text-muted">
          Tokens and Gluestack theme are applied inside this provider.
        </Text>
      </View>
    ),
  },
};
