import { StyleSheet, Text, View } from 'react-native';

export default function CommunitiesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Communities Screen</Text>
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