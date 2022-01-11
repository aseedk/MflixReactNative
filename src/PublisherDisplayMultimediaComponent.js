import * as React from 'react';
import {StyleSheet, View,Alert, ToastAndroid, Text} from 'react-native';
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
                <Subheading style={styles.sheading}>Type: {data.type}</Subheading>
                <Subheading style={styles.sheading}>Genre: {data.genre}</Subheading>
                <Subheading style={styles.sheading}>Cast: {data.cast}</Subheading>
                <Paragraph style={styles.sheading}>Plot: {data.plot}</Paragraph>
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
                    <Text style={{fontWeight:'bold'}}>Edit Multimedia</Text>
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
        padding:10,
        backgroundColor:'#f3ce13'
    },
    textStyle:{
        textAlign:'center',
        marginTop:20
    },
    subTextStyle:{
        marginTop: 10
    },
    sheading:{
        fontFamily: 'sans-serif-medium',
        fontWeight: 'bold',
    }
});
export default PublisherDisplayMultimediaComponent;
