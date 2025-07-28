import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  View,
  Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

// Toast type styles
const typeStyles = {
  success: {
    backgroundColor: '#4CAF50',
    textColor: '#fff',
  },
  warning: {
    backgroundColor: '#FFC107',
    textColor: '#000',
  },
  error: {
    backgroundColor: '#F44336',
    textColor: '#fff',
  },
  default: {
    backgroundColor: '#333',
    textColor: '#fff',
  },
};

const Toast = ({
  message,
  type = 'default',
  position = 'top',
  duration = 3000,
  animationType = 'slide',
  customComponent,
}) => {
  const translateAnim = useRef(new Animated.Value(position === 'top' ? -150 : 150)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const style = typeStyles[type] || typeStyles.default;

  useEffect(() => {
    const entryAnim =
      animationType === 'fade'
        ? Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          })
        : Animated.parallel([
            Animated.timing(translateAnim, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(fadeAnim, {
              toValue: 1,
              duration: 300,
              useNativeDriver: true,
            }),
          ]);

    const exitAnim =
      animationType === 'fade'
        ? Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 300,
            delay: duration,
            useNativeDriver: true,
          })
        : Animated.timing(translateAnim, {
            toValue: position === 'top' ? -150 : 150,
            duration: 300,
            delay: duration,
            useNativeDriver: true,
          });

    entryAnim.start(() => exitAnim.start());
  }, []);

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          top: position === 'top' ? 80 : undefined,         // Increased top space
          bottom: position === 'bottom' ? 80 : undefined,   // Increased bottom space
          backgroundColor: style.backgroundColor,
          transform: animationType === 'slide' ? [{ translateY: translateAnim }] : [],
          opacity: fadeAnim,
        },
      ]}
    >
      {customComponent ? (
        customComponent
      ) : (
        <View style={styles.row}>
          <Text style={[styles.text, { color: style.textColor }]}>{message}</Text>
        </View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,   // Increased vertical padding
    borderRadius: 12,
    zIndex: 999,
    maxWidth: width * 0.9,
    marginVertical: 30,    // Added margin for extra top/bottom space
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  text: {
    fontSize: 16,
    flexShrink: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Toast;
