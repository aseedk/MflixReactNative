import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import { Headline, Subheading, Caption, Button, Text} from 'react-native-paper';
const ViewerMainMenuComponent = ({navigation, route}) => {
    return(
        <View style={[styles.container]}>
            <View style={{flex:2, marginTop:50}}>
                <Headline style={{textAlign:'center', fontWeight:'bold',color:'#fff'}}>Viewer Main Menu</Headline>
                <Subheading  style={{textAlign:'center',color:'#fff'}}>Welcome to viewer main menu</Subheading>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=> navigation.navigate("ViewerDisplayMultimediaList",{
                        user: route.params?.user
                    })}
                >
                    <Text style={styles.buttonTextStyle}>View Movies/Tv Series</Text>
                </Button>
            </View>
            <View style={styles.buttonViewStyle}>
                <Button
                    style={styles.buttonStyle}
                    mode="contained"
                    onPress={()=>{
                        navigation.navigate("ViewerDisplayFavoriteMultimediaList", {
                            user: route.params?.user
                        })
                    }}
                >
                    <Text style={styles.buttonTextStyle}>View Favorite Movies/Tv Series</Text>
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
                    <Text style={styles.buttonTextStyle}>Search Movies/Tv Series</Text>
                </Button>
            </View>
            <View style={{flex:2.5}}>
                <Caption style={{textAlign: "center", padding:10,color:'#fff'}}>Developed by: Peepo Tech</Caption>
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
    buttonViewStyle:{
        flex: 1,
    },
    buttonStyle:{
        padding:10,
        backgroundColor: "#E50914"
    }
});
export default ViewerMainMenuComponent
