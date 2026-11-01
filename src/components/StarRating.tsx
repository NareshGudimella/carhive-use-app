import React, { useEffect, useRef, useState } from 'react';
import { PanResponder, StyleProp, View, ViewStyle } from 'react-native';
import MaterialDesignIcons from '@react-native-vector-icons/material-design-icons';

const STAR_COLOR = '#f1c40f';

type StarRatingProps = {
  readonly?: boolean;
  startingValue?: number | string | false | null;
  imageSize?: number;
  ratingCount?: number;
  style?: StyleProp<ViewStyle>;
  onFinishRating?: (value: number) => void;
};

const toRating = (value: StarRatingProps['startingValue'], count: number) => {
  const n = Number(value);
  if (!isFinite(n) || n < 0) {
    return 0;
  }
  return Math.min(n, count);
};

const StarRating = ({
  readonly = false,
  startingValue = 0,
  imageSize = 40,
  ratingCount = 5,
  style,
  onFinishRating,
}: StarRatingProps) => {
  const [value, setValue] = useState(toRating(startingValue, ratingCount));
  const valueRef = useRef(value);
  const startX = useRef(0);
  const onFinishRef = useRef(onFinishRating);
  onFinishRef.current = onFinishRating;

  useEffect(() => {
    const next = toRating(startingValue, ratingCount);
    valueRef.current = next;
    setValue(next);
  }, [startingValue, ratingCount]);

  // Same rule as the old library: the touch position rounds up to a whole star.
  const ratingAt = (x: number) =>
    Math.min(ratingCount, Math.max(0, Math.ceil(x / imageSize)));

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: evt => {
        startX.current = evt.nativeEvent.locationX;
        valueRef.current = ratingAt(startX.current);
        setValue(valueRef.current);
      },
      onPanResponderMove: (_evt, gesture) => {
        valueRef.current = ratingAt(startX.current + gesture.dx);
        setValue(valueRef.current);
      },
      onPanResponderRelease: () => {
        onFinishRef.current?.(valueRef.current);
      },
    }),
  ).current;

  const stars = [];
  for (let i = 0; i < ratingCount; i++) {
    // Share of this star that is filled, 0..1 (supports fractional ratings).
    const fill = Math.min(1, Math.max(0, value - i));
    stars.push(
      <View key={i} style={{ width: imageSize, height: imageSize }}>
        <MaterialDesignIcons
          name="star-outline"
          size={imageSize}
          color={STAR_COLOR}
        />
        {fill > 0 && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: imageSize * fill,
              height: imageSize,
              overflow: 'hidden',
            }}
          >
            <MaterialDesignIcons
              name="star"
              size={imageSize}
              color={STAR_COLOR}
            />
          </View>
        )}
      </View>,
    );
  }

  return (
    <View pointerEvents={readonly ? 'none' : 'auto'} style={style}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        {...(readonly ? {} : panResponder.panHandlers)}
      >
        {stars}
      </View>
    </View>
  );
};

export default StarRating;
