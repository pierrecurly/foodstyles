import { createContext, useContext, useState } from 'react';
import FoodStylesStore, { FoodStylesStoreInteface } from '../../stores/FoodStyles.store';

// create hook for one store context
export const foodStyleContext = createContext(new FoodStylesStore());

const useFoodStyle = () => useContext(foodStyleContext)

export default useFoodStyle