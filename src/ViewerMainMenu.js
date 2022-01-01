import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Headline, Subheading, Caption, Button} from 'react-native-paper';
import firebase from "firebase/compat";
const ViewerMainMenuComponent = ({navigation, route}) => {
    return(
        <View style={[styles.container]}>
            <View style={{flex:2, marginTop:50}}>
                <Headline style={{textAlign:'center', fontWeight:'bold'}}>Viewer Main Menu</Headline>
                <Subheading  style={{textAlign:'center'}}>Welcome to viewer main menu</Subheading>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=> navigation.navigate("ViewerDisplayMultimediaList",{
                        user: route.params?.user
                    })}
                >
                    View Movies/Tv Series
                </Button>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=>{/*
                        const newMultimediaReference = firebase.database().ref('/MultimediaList').push();
                        newMultimediaReference.set({
                            name: "movie3",
                            genre: "Fiction",
                            type: "Movie",
                            cast: "Aseed,Ammar,Anas,Waleed",
                            plot: "Nice Plot"
                        }).then(()=> console.log("Data Added"))*/
                        navigation.navigate("ViewerDisplayFavoriteMultimediaList", {
                            user: route.params?.user
                        })
                    }}
                >
                    View Favorite Movies/Tv Series
                </Button>
            </View>
            <View style={[styles.buttonViewStyle]}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=>{
                        navigation.navigate("ViewerSearchMultimediaList", {
                            user: route.params?.user
                        })
                    }}
                >
                    Search Movies/Tv Series
                </Button>
            </View>
            <View style={{flex:2.5}}>
                <Caption style={{textAlign: "center", padding:10}}>Developed by: Peepo Tech</Caption>
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
    }
});
export default ViewerMainMenuComponent
