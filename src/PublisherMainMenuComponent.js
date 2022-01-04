import React from 'react';
import { View, StyleSheet} from 'react-native';
import { Text,Button } from 'react-native-paper';

export default function PublisherMainMenuComponent({ navigation, route}) {
    return(
        <View style={styles.container}>
            <Button mode="contained"
                    onPress={()=>navigation.navigate('PublisherPublishMultimedia', {
                        user: route.params?.user
                    })}
                    style={{backgroundColor:'#f3ce13',width:300,margin:10,borderWidth:2}}>
                <Text style={{fontWeight:'bold'}}>Add Movies</Text>
            </Button>

            <Button mode="contained"
                    onPress={()=>navigation.navigate('PublisherDisplayPublishedMultimediaList', {
                        user: route.params?.user
                    })}
                    style={{backgroundColor:'#f3ce13',width:300,margin:10,borderWidth:2}}>
                <Text style={{fontWeight:'bold'}}>View Published Movies</Text>
            </Button>

            <Button mode="contained"
                    onPress={()=>navigation.navigate('PublisherSearchPublishedMultimediaList', {
                        user: route.params?.user
                    })}
                    style={{backgroundColor:'#f3ce13',width:300,margin:10,borderWidth:2}}>
                <Text style={{fontWeight:'bold'}}>Search Movies</Text>
            </Button>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }

});
