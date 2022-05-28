import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { observer } from 'mobx-react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useFoodStyle from '../libs/hooks/use-food-style';
import { FoodStyleInterface } from '../types.d';

interface FoodStyleCardProps {
  food: FoodStyleInterface;
  isFromModal?: boolean;
}

const FoodStyleCard = observer((props: FoodStyleCardProps) => {
  const foodStyleStore = useFoodStyle();

  const onMenuPress = () => {
    foodStyleStore.foodSelection(props.food);
  };

  return (
    <View style={styles.foodCard}>
      <Text style={styles.food}>{props.food.name}</Text>
      {props.isFromModal ? (
        <>
          <TouchableOpacity onPress={() => foodStyleStore.resetSelection()}>
            <MaterialIcon size={24} color='#11b777' name='close-circle-outline' />
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity onPress={onMenuPress}>
          <MaterialIcon size={24} color='#11b777' name='dots-vertical-circle-outline' />
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  foodCard: {
    elevation: 1,
    minHeight: 52,
    width: '100%',
    borderRadius: 6,
    backgroundColor: '#fff',
    shadowColor: '#6f5d50',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 7,
    shadowOpacity: 1,
    paddingHorizontal: 18,
    paddingVertical: 14,
    marginBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  food: {
    fontFamily: 'nova-bold',
    fontSize: 18,
    color: '#6f5d50',
    width: '90%'
  },
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 18,
  },
});

export default FoodStyleCard;
