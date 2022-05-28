import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

const LayoutGradiant = () => {
  return (
    <View style={styles.bgContainer}>
      <LinearGradient colors={['#fa7745', '#f3c442']} start={{ x: 0.5, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={{ height: 157 }} />
      <LinearGradient
        colors={['transparent', '#f7f7f7']}
        start={{ x: 0.5, y: 0.4 }}
        end={{ x: 0.5, y: 1 }}
        locations={[0.1, 1]}
        style={styles.mask}
      />
      <View style={styles.bgGreyed} />
    </View>
  );
};

const styles = StyleSheet.create({
  bgContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: -1,
  },
  mask: {
    height: 80,
    marginTop: -80,
  },
  bgGreyed: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

export default LayoutGradiant;
