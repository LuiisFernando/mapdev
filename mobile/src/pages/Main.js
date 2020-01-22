import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps'
import Geolocation from '@react-native-community/geolocation';

import Icon from 'react-native-vector-icons/MaterialIcons'

export default function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);


    async function loadInitialPosition() {
        Geolocation.getCurrentPosition(
            position => {
                //   const initialPosition = JSON.stringify(position);
                const { latitude, longitude } = position.coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                });
            },
            error => Alert.alert('Error', JSON.stringify(error)),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
        );
    }

    useEffect(() => {
        loadInitialPosition();
    }, []);

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                loadingEnabled={true}
                initialRegion={currentRegion}
            >
                <Marker coordinate={{ latitude: -23.5989551, longitude: -46.6019437 }}>
                    <Image style={styles.avatar} source={{ uri: 'https://avatars0.githubusercontent.com/u/1233361?s=460&v=4' }} />
                    <Callout onPress={() => { navigation.navigate('Profile', {github_username: 'luiisfernando' });
                    }}>
                        <View style={styles.callout}>
                            <Text style={styles.devName}>Luís Fernando</Text>
                            <Text style={styles.devBio}>FullStack</Text>
                            <Text style={styles.devTechs}>react-native reactjs nodejs c#</Text>
                        </View>
                    </Callout>
                </Marker>
            </MapView>
            <View style={styles.searchForm}>
                <TextInput
                    style={styles.searchInput} 
                    placeholder="Search devs by techs"
                    placeholderTextColor="#999"
                    autoCapitalize="words"
                    autoCorrect={false}
                />
                <TouchableOpacity style={styles.loadButton}>
                    <Icon name="my-location" size={20} color="#FFF" />
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    map: {
        ...StyleSheet.absoluteFillObject,
        flex: 1
    },
    avatar: {
        width: 54,
        height: 54,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#FFF'
    },
    callout: {
        width: 260
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16
    },
    devBio: {
        color: '#666',
        marginTop: 5
    },
    devTechs: {
        marginTop: 5
    },
    searchForm: {
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        zIndex: 5,
        flexDirection: 'row'
    },
    searchInput: {
        flex: 1,
        height: 50,
        backgroundColor: "#FFF",
        color: "#333",
        borderRadius: 25,
        paddingHorizontal: 20,
        fontSize: 16,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowOffset: {
            width: 4,
            height: 4
        },
        elevation: 2
    },
    loadButton: {
        width: 50,
        height: 50,
        backgroundColor: '#8e4dff',
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 15
    }
});