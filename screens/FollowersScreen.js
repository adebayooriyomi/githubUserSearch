import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
import { useApi } from '../api/useApi';

const FollowersScreen = ({ navigation, route }) => {
    const [refreshing, setRefreshing] = useState(false);
    const { user, title } = route.params;
    navigation.setOptions({ title: title });
    const { data, loading, error } = title === 'Followers' ? useApi(user.followers_url) : useApi(user.following_url.replace('{/other_user}', ''))

    const handleProfilePress = (follower) => {
        navigation.push('Profile', { user: follower });
    };

    const handleRefresh = () => {
        setRefreshing(true);
         // Fetch the latest data
        setRefreshing(false);
    };
    
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

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleProfilePress(item)} style={styles.follower}>
            <Image style={styles.avatar} source={{ uri: item.avatar_url }} />
            <Text>{item.login}</Text>
        </TouchableOpacity>
    )
        
    return (
        <View style={styles.container}>
        <FlatList
            style={styles.listContainer}
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
        />
        </View>
    );
    };

    const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    listContainer: {
        width: '100%',
        marginTop: 10
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    follower: {
        flex: 1,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgray'
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 20,
        marginRight: 10,
    },
});

export default FollowersScreen;
