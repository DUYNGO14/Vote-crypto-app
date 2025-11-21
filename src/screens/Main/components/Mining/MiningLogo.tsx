import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
  withDelay,
  Easing,
} from 'react-native-reanimated';

interface BubbleProps {
  delay: number;
  size: number;
  depth: number;
}

const Bubble = React.memo(({ delay, size, depth }: BubbleProps) => {
  const translateY = useSharedValue(0);
  const translateX = useSharedValue(0);
  const opacity = useSharedValue(0);

  // Random values
  const randomValues = useMemo(() => ({
    left: 20 + Math.random() * 60,
    drift: (Math.random() - 0.5) * 40,
    duration: 7000 + depth * 1000,
  }), [depth]);

  // Animation style
  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    bottom: 0,
    width: size,
    height: size,
    borderRadius: 999,
    left: `${randomValues.left}%`,
    backgroundColor: '#FFD700',
    transform: [
      { translateY: translateY.value },
      { translateX: translateX.value },
    ],
    opacity: opacity.value,
    zIndex: 3 - depth,
  }));

  // Start animation
  React.useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-420, { duration: randomValues.duration, easing: Easing.out(Easing.quad) }),
        -1,
        false
      )
    );
    translateX.value = withDelay(
      delay,
      withRepeat(
        withTiming(randomValues.drift, { duration: randomValues.duration, easing: Easing.inOut(Easing.sin) }),
        -1,
        true
      )
    );
    const maxOpacity = depth === 0 ? 0.8 : depth === 1 ? 0.5 : 0.3;
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(maxOpacity, { duration: randomValues.duration }),
        -1,
        true
      )
    );
  }, [delay, depth, randomValues, translateY, translateX, opacity]);

  return <Animated.View style={style} />;
});

interface FlyingBoxProps {
  delay: number;
  depth: number;
  index: number;
  total: number;
}

const FlyingBox = React.memo(({ delay, depth, index, total }: FlyingBoxProps) => {
  const translateY = useSharedValue(0);
  const opacity = useSharedValue(0);

  const boxConfig = useMemo(() => ({
    size: depth === 0 ? 120 : depth === 1 ? 90 : 60,
    maxOpacity: depth === 0 ? 1 : depth === 1 ? 0.7 : 0.5,
    leftPosition: (index / Math.max(1, total - 1)) * 80 + 10,
    duration: 4500 + depth * 800,
  }), [depth, index, total]);

  const style = useAnimatedStyle(() => ({
    position: 'absolute',
    bottom: 0,
    left: `${boxConfig.leftPosition}%`,
    marginLeft: -(boxConfig.size / 2),
    width: boxConfig.size,
    height: boxConfig.size,
    transform: [{ translateY: translateY.value }],
    opacity: opacity.value,
    zIndex: 3 - depth,
  }));

  React.useEffect(() => {
    translateY.value = withDelay(
      delay,
      withRepeat(
        withTiming(-450, { duration: boxConfig.duration, easing: Easing.linear }),
        -1,
        false
      )
    );
    opacity.value = withDelay(
      delay,
      withRepeat(
        withTiming(boxConfig.maxOpacity, { duration: boxConfig.duration }),
        -1,
        true
      )
    );
  }, [delay, boxConfig, translateY, opacity]);

  return (
    <Animated.Image
      source={require('@assets/images/box-fly.png')}
      style={style}
      resizeMode="contain"
    />
  );
});

interface MiningLogoProps {
  isMining: boolean;
}

const MiningLogo: React.FC<MiningLogoProps> = ({ isMining }) => {
  const bubbles = useMemo(() => [
    ...Array.from({ length: 6 }, (_, i) => ({ id: `near-${i}`, delay: i * 800, size: 8, depth: 0 })),
    ...Array.from({ length: 7 }, (_, i) => ({ id: `mid-${i}`, delay: i * 700 + 200, size: 5, depth: 1 })),
    ...Array.from({ length: 9 }, (_, i) => ({ id: `far-${i}`, delay: i * 600 + 100, size: 3, depth: 2 })),
  ], []);

  const flyingBoxes = useMemo(() => [
    ...Array.from({ length: 4 }, (_, i) => ({ id: `box-near-${i}`, delay: i * 1500, depth: 0, index: i, total: 3 })),
    ...Array.from({ length: 4 }, (_, i) => ({ id: `box-mid-${i}`, delay: i * 1400 + 300, depth: 1, index: i, total: 3 })),
    ...Array.from({ length: 5 }, (_, i) => ({ id: `box-far-${i}`, delay: i * 1200 + 600, depth: 2, index: i, total: 4 })),
  ], []);

  const logo = useMemo(() => 
    isMining
      ? require('@assets/images/bg-mining.png')
      : require('@assets/images/farming_logo.png'),
    [isMining]
  );

  return (
    <View className="w-full h-[360px] relative justify-center items-center">
      <Image source={logo} className="w-full h-full" resizeMode="contain" />
      <View className="absolute inset-0 overflow-hidden pointer-events-none">
        {bubbles.map(b => <Bubble key={b.id} {...b} />)}
        {isMining && flyingBoxes.map(box => <FlyingBox key={box.id} {...box} />)}
      </View>
    </View>
  );
};

export default React.memo(MiningLogo, (prev, next) => prev.isMining === next.isMining);