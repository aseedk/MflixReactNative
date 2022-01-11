import * as React from 'react';
import {StyleSheet, View,Alert, ToastAndroid, Image} from 'react-native';
import {Paragraph, Headline, Subheading, Button, Text} from 'react-native-paper';
import firebase from "firebase/compat";

const ViewerDisplayMultimediaComponent = ({route})=>{
    const data = route.params?.data;
    const key = route.params?.key;
    const user = route.params?.user;
    return(
        <View style={styles.container}>
            <View style={{flex: 4}}>
                <Image
                    style={styles.image}
                    source={"https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_Homecoming_poster.jpg"}/>
                <Headline style={styles.textStyle}>Name: {data.name}</Headline>
                <Subheading style={styles.textStyle}>Type: {data.type}</Subheading>
                <Subheading style={styles.textStyle}>Genre: {data.genre}</Subheading>
                <Subheading style={styles.textStyle}>Cast: {data.cast}</Subheading>
                <Paragraph style={styles.textStyle}>Plot: {data.plot}</Paragraph>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={async ()=>{
                        console.log(user.uid);
                        let favoriteMovies = [];
                        await firebase.database().ref('/Users/'+ user.uid +'/favoriteMovies').once('value', function (snapshot) {
                            favoriteMovies = snapshot.val();
                        })
                        let k;
                        if (favoriteMovies === null){
                            k = undefined;
                            favoriteMovies = [];
                        }
                        else
                            k = favoriteMovies.find(k => k === key);
                        console.log(k);
                        if (k === undefined){
                            console.log("Key not found");
                            favoriteMovies.push(key);
                            firebase.database()
                                .ref('/Users/'+user.uid + '/')
                                .update({
                                    favoriteMovies: favoriteMovies,
                                })
                                .then(() => {
                                    {
                                        ToastAndroid.show("Favorite List Updated", ToastAndroid.SHORT)
                                        console.log('Data updated.')
                                    }
                                });
                        }else {
                            Alert.alert("Warning!", "Multimedia is already in your favorite list");
                        }

                    }}
                >
                    <Text style={styles.buttonTextStyle}>Favorite Movie</Text>
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
        backgroundColor: '#212121',
        justifyContent: 'center',
    },
    buttonTextStyle:{
        color:'#fff',
        fontWeight:"bold"
    },
    textStyle:{
        color:'#fff'
    },
    buttonViewStyle:{
        flex: 1,
    },
    buttonStyle:{
        padding:10,
        backgroundColor: "#E50914"
    },
    subTextStyle:{
        marginTop: 10
    },
    image:{
        alignSelf:'center',
        width:100,
        height: 100,
        padding:5,
        borderWidth:1,
        backgroundColor: '#fff'
    },
});
export default ViewerDisplayMultimediaComponent;
