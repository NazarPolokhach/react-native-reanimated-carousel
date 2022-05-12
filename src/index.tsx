import 'react-native-reanimated';
export type { TCarouselProps, ICarouselInstance } from './types';
import Carousel from './Carousel';

// @ts-ignore
global.__reanimatedWorkletInit = () => {};

export default Carousel;
