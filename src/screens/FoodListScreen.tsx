import { observer } from 'mobx-react';
import { useState } from 'react';
import { FlatList, RefreshControl, SafeAreaView, View } from 'react-native';
import FoodStyleBottom from '../components/FoodStyleBottom';
import FoodCard from '../components/FoodStyleCard';
import LogoHeader from '../components/FoodStyleHeader';
import FoodStyleModal from '../components/FoodStyleModal';
import LayoutGradiant from '../components/LayoutGradiant';
import useFoodStyle from '../libs/hooks/use-food-style';

const FoodListScreen = observer(() => {
  const [refreshing] = useState(false);
  const foodStyleStore = useFoodStyle();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LogoHeader />
      <LayoutGradiant />
      <View style={{ zIndex: 1, paddingHorizontal: 18, height: '80%' }}>
        <FlatList
          data={foodStyleStore.foodStyles}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={foodStyleStore.reloadFoodStyles} />}
          renderItem={({ item }) => <FoodCard food={item} />}
          keyExtractor={(item) => ('' + item.id) as string}
          showsVerticalScrollIndicator={false}
        />
      </View>
      <FoodStyleModal />
      <FoodStyleBottom />
    </SafeAreaView>
  );
});

export default FoodListScreen;
