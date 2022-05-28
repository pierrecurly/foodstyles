import EvilIcons from '@expo/vector-icons/EvilIcons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { observer } from 'mobx-react';
import { Alert, Modal, Share, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useFoodStyle from '../libs/hooks/use-food-style';
import { FoodStyleInterface } from '../types.d';
import FoodStyleCard from './FoodStyleCard';

const FoodStyleModal = observer(() => {
  const foodStyleStore = useFoodStyle();
  const closeModal = () => foodStyleStore.resetSelection();

  const onDeleteFoodStyle = () => {
    Alert.alert('Confirm delete', 'This will delete the Food Style and all its settings', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          foodStyleStore.deleteFoodStyle();
        },
      },
    ]);
  };

  const onShareFoodStyle = async () => {
    const response = await foodStyleStore.shareFoodStyle();
    Share.share({ message: `https://cards.foodstyles.com/${response?.data?.shareCard}` });
  };

  return (
    <Modal animationType='slide' transparent={true} visible={!!foodStyleStore.selectedFood} onRequestClose={closeModal}>
      <View style={styles.modal}>
        <FoodStyleCard food={foodStyleStore.selectedFood as FoodStyleInterface} isFromModal={true} />
        <View style={styles.actionContainer}>
          <View style={styles.action}>
            <Text style={styles.text}>Share</Text>
            <TouchableOpacity onPress={onShareFoodStyle}>
              <View style={styles.circle}>
                <EvilIcons size={25} name='share-apple' color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <Text style={styles.text}>Duplicate</Text>
            <TouchableOpacity onPress={foodStyleStore.duplicateFoodStyle}>
              <View style={styles.circle}>
                <Ionicons size={20} name='documents-outline' color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.action}>
            <Text style={styles.text}>Delete</Text>
            <TouchableOpacity onPress={onDeleteFoodStyle}>
              <View style={styles.circle}>
                <Ionicons size={20} name='trash-outline' color={'#fff'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 18,
    paddingTop: '40%',
  },
  text: {
    color: '#11ce90',
    fontSize: 15,
    fontFamily: 'nova-semi',
    marginRight: 8,
  },
  actionContainer: {
    height: 140,
    width: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 9,
  },
  circle: {
    height: 40,
    width: 40,
    borderRadius: 40,
    backgroundColor: '#11ce90',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default FoodStyleModal;
