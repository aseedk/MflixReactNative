import * as React from 'react';
import {StyleSheet, View,Alert, ToastAndroid} from 'react-native';
import {Paragraph, Headline, Subheading, Button} from 'react-native-paper';
import firebase from "firebase/compat";

const ViewerDisplayMultimediaComponent = ({route})=>{
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
                    Favorite Movie
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
export default ViewerDisplayMultimediaComponent;
