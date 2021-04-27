import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const App = () => {
  const BASE_URL = 'https://api.github.com/search/repositories?q=yura0seredyuk';

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        setName(data.items[0].name);
        setAvatarUrl(data.items[0].owner.avatar_url);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{name}</Text>
      <Image
        style={styles.image}
        source={{
          uri: `${avatarUrl}`,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  text: {
    margin: 30,
    color: 'red',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default App;
