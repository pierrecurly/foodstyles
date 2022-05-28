import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import plusIcon from '../assets/images/plus-icon.png';
import useFoodStyle from '../libs/hooks/use-food-style';

const FoodStyleBottom = () => {
  const foodStyleStore = useFoodStyle();

  return (
    <View style={styles.bottomContainer}>
      <TouchableOpacity onPress={foodStyleStore.createFoodStyle}>
        <View style={styles.button}>
          <Image style={{ width: 35, height: 35 }} source={plusIcon} />
          <Text style={styles.foodText}>New Food Style</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    width: '100%',
    height: 56,
    padding: 18,
    zIndex: 1,
  },
  button: {
    height: 44,
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 6,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  foodText: {
    fontFamily: 'nova-bold',
    fontSize: 18,
  },
});

export default FoodStyleBottom;
