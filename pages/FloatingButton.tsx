import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useClickCount } from './ClickCountContext';

const FloatingButton: React.FC = () => {
  const { clickCount } = useClickCount();

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{clickCount}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'green',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 40,
  },
});

export default FloatingButton;
