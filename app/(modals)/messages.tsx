import { StyleSheet, Text, View } from 'react-native';
import Colors from '../../constants/Colors';

export default function MessagesScreen() {
  return (
    <View style={[styles.container, { backgroundColor: Colors.background }]}>
      <Text style={[styles.text, { color: Colors.text }]}>Messages Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
}); 