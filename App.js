import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  Right,
} from 'native-base';

const App = () => {
  const BASE_URL = 'https://api.github.com/search/repositories?q=yura0seredyuk';

  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [reposList, setReposList] = useState('');

  useEffect(() => {
    fetch(BASE_URL)
      .then(response => response.json())
      .then(data => {
        setName(data.items[0].name);
        setAvatarUrl(data.items[0].owner.avatar_url);
        setReposUrl(data.items[0].owner.repos_url);
      });

    fetch(reposUrl)
      .then(response => response.json())
      .then(data => {
        setReposList(data);
      });
  }, []);

  function displayCard() {
    return reposList.map(repos => {
      return (
        <Card>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: `${avatarUrl}`}} />
              <Body>
                <Text>{repos.name}</Text>
                <Text note>{name}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem>
            <Left>
              <Button transparent>
                <Text>12 Likes</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Text>4 Comments</Text>
              </Button>
            </Body>
            <Right>
              <Text>11h ago</Text>
            </Right>
          </CardItem>
        </Card>
      );
    });
  }

  return (
    <Container>
      <Header />
      <Content>{displayCard()}</Content>
    </Container>
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
