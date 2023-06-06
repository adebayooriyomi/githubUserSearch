import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { client } from "./api/client";

import ProfileScreen from './screens/ProfileScreen';
import FollowersScreen from './screens/FollowersScreen';

const Stack = createStackNavigator();

const SearchScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if(!username)return
    try {
      const response = await client.get(`/users/${username}`);
      if (response.data) {
        setUser(response.data);
        setError(null);
      } else {
        setUser(null);
        setError('User not found');
      }
    } catch (error) {
      setUser(null);
      setError('Invalid Username');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter GitHub username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <Button title="Search" onPress={handleSearch} />
      {user ? (
        <View style={styles.userContainer}>
          <View style={styles.bioContainer}>
            <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
            <Text style={styles.username}>{user.login}</Text>
            {user.name && <Text style={styles.name}>{user.name}</Text>}
            {user.bio && <Text style={styles.description}>{user.bio}</Text>}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              style={styles.button}
              title={`Followers: ${user.followers}`}
              onPress={() => navigation.navigate('Followers', { user: user, title: 'Followers' })}
            />
            <Button
              style={styles.button}
              title={`Following: ${user.following}`}
              onPress={() => navigation.navigate('Followers', { user: user, title: 'Following' })}
            />
          </View>
        </View>
      ) : (
        <Text style={styles.errorText}>{error}</Text>
      )}
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" options={{ title: 'Search' }} component={SearchScreen} />
        <Stack.Screen name="Profile" options={{ title: 'Profile' }} component={ProfileScreen} />
        <Stack.Screen name="Followers" options={{ title: 'Followers' }} component={FollowersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  bioContainer: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 50
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '90%',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    padding: 10,
    marginBottom: 10,
  },
  userContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  name: {
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: 'center',
  },
  counts: {
    fontSize: 16,
    marginBottom: 5,
  },
  errorText: {
    textAlign: 'center',
    fontSize: 16,
    color: 'red',
    marginTop: 10,
  },
});

export default App;



