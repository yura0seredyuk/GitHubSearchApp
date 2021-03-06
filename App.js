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
  Form,
  Item,
  Input,
  Label,
  Title,
} from 'native-base';

const App = () => {
  const [name, setName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [reposUrl, setReposUrl] = useState('');
  const [reposList, setReposList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchedUser, setSearchedUser] = useState('');
  const BASE_URL = `https://api.github.com/search/repositories?q=${searchedUser}`;

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
  }, [BASE_URL, reposUrl]);

  const handleSearchValue = value => {
    setSearchValue(value);
  };

  const handleSubmit = () => {
    setSearchedUser(searchValue);
  };

  function displayCard() {
    return reposList.map(repos => {
      return (
        <Card key={repos.id}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: `${avatarUrl}`}} />
              <Body>
                <Text>Name: {repos.name}</Text>
                <Text note>{name}</Text>
              </Body>
            </Left>
            <Right>
              <Button transparent>
                <Icon
                  type="MaterialIcons"
                  name="star-border"
                  style={styles.star}
                />
              </Button>
            </Right>
          </CardItem>

          <CardItem bordered>
            <Body>
              <Text>Description: {repos.description}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Body>
              <Text>Language: {repos.language}</Text>
            </Body>
          </CardItem>

          <CardItem>
            <Left>
              <Button transparent>
                <Icon type="MaterialIcons" name="star" />
                <Text>Stars: {repos.stargazers_count}</Text>
              </Button>
            </Left>
            <Body>
              <Button transparent>
                <Icon type="AntDesign" name="fork" />
                <Text>Forks : {repos.forks_count}</Text>
              </Button>
            </Body>
            <Right>
              <Text>Updated at: {repos.updated_at}</Text>
            </Right>
          </CardItem>
        </Card>
      );
    });
  }

  return (
    <Container>
      <Header>
        <Left />
        <Body>
          <Title>GitHub Search</Title>
        </Body>
        <Right>
          <Button transparent>
            <Icon name="search" />
          </Button>
        </Right>
      </Header>
      <Form>
        <Item floatingLabel>
          <Label>Username</Label>
          <Input value={searchValue} onChangeText={handleSearchValue} />
        </Item>
        <Button block light onPress={handleSubmit}>
          <Text>Search</Text>
        </Button>
      </Form>
      <Content>{displayCard()}</Content>
    </Container>
  );
};

const styles = StyleSheet.create({
  star: {
    fontSize: 35,
    color: 'orange',
  },
});

export default App;
