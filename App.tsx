import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/navigation';

export default function App() {
  const [isLoaded] = useFonts({
    nova: require('./src/assets/fonts/FontsFree-Net-Proxima-Nova-1.ttf'),
    'nova-semi': require('./src/assets/fonts/FontsFree-Net-Proxima-Nova-SemiBold.ttf'),
    'nova-bold': require('./src/assets/fonts/FontsFree-Net-Proxima-Nova-Bold.otf'),
  });

  if (!isLoaded) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Navigation />
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
