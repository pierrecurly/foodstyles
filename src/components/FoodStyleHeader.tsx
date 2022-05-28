import { Image, Platform, StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import logo from '../assets/images/logo.png';

const LogoHeader = () => {
  const statusBarHeight = Platform.select({
    ios: 20,
    android: StatusBar.currentHeight,
    default: 0,
  });

  return (
    <SafeAreaView style={{ marginTop: statusBarHeight }}>
      <View style={styles.header}>
        <Image style={{ height: 26, width: 22 }} source={logo} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },
});

export default LogoHeader;
