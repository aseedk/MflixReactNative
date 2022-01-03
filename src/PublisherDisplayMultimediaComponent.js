import * as React from 'react';
import {StyleSheet, View,Alert, ToastAndroid} from 'react-native';
import {Paragraph, Headline, Subheading, Button} from 'react-native-paper';
import firebase from "firebase/compat";

const PublisherDisplayMultimediaComponent = ({navigation,route})=>{
    const data = route.params?.data;
    const key = route.params?.key;
    const user = route.params?.user;
    return(
        <View style={styles.container}>
            <View style={{flex: 4}}>
                <Headline>Name: {data.name}</Headline>
                <Subheading>Type: {data.type}</Subheading>
                <Subheading>Genre: {data.genre}</Subheading>
                <Subheading>Cast: {data.cast}</Subheading>
                <Subheading>Key: {key}</Subheading>
                <Paragraph>Plot: {data.plot}</Paragraph>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=>{
                        navigation.navigate('PublisherEditMultimedia', {
                            data: data,
                            key: key,
                            user: user
                        })
                    }}
                >
                    Edit Multimedia
                </Button>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin:"1%",
        padding:"5%",
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    buttonViewStyle:{
        flex: 1,
    },
    buttonStyle:{
        padding:10
    },
    textStyle:{
        textAlign:'center',
        marginTop:20
    },
    subTextStyle:{
        marginTop: 10
    }
});
export default PublisherDisplayMultimediaComponent;
