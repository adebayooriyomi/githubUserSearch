import React from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { useApi } from '../api/useApi';

const ProfileScreen = ({ route }) => {
  const { user } = route.params;
  const { data, loading, error } = useApi(`/users/${user.login}`);

  if (loading) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="gray" />
        </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
    {data ? (
    <>
      <Image style={styles.avatar} source={{ uri: user.avatar_url }} />
      <Text style={styles.username}>{data.login}</Text>
      <Text style={styles.name}>{data.name}</Text>
      <Text style={styles.description}>{data.bio}</Text>
      <View style={styles.row}>
      <Text style={styles.counts}>Followers: {data.followers}</Text>
      <Text style={styles.counts}>Following: {data.following}</Text>
      </View>
    </>
      ) : (
        <Text style={styles.errorText}>User Not Found</Text>
    )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  row: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderBottomColor: 'lightgray'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 100,
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
  },
  counts: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
