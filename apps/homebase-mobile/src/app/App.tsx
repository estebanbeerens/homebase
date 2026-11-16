import '../../global.css';
import { Text, View } from 'react-native';
import { ThemeProvider } from '@homebase/ui-atoms';

// Placeholder shell. The Rooms screen, drawer and add menu arrive in Phase 4.
export function App() {
  return (
    <ThemeProvider>
      <View className="flex-1 items-center justify-center bg-bg">
        <Text testID="heading" className="text-title text-text">
          Homebase
        </Text>
      </View>
    </ThemeProvider>
  );
}

export default App;
