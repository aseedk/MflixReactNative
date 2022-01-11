import React from 'react';
import {View, StyleSheet, ToastAndroid, Alert} from 'react-native';
import { Text, Title, TextInput,Card,Button,RadioButton } from 'react-native-paper';
import firebase from "firebase/compat";
export default function PublisherEditMultimediaComponent({route}){
    let user = route.params?.user;
    let key = route.params?.key;
    const [name, setName] = React.useState(route.params?.data.name);
    const [genre, setGenre] = React.useState(route.params?.data.genre);
    const [cast, setCast] = React.useState(route.params?.data.cast);
    const [plot, setPlot] = React.useState(route.params?.data.plot);
    const [imageURL, setImageURL] = React.useState(route.params?.data.imageURL);
    const [type, setType] = React.useState(route.params?.data.type);
    return(
        <View style={[styles.container,{backgroundColor:'white'}]}>
            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18,flex:1}}>Name</Text>
                <TextInput
                    placeholder="Enter name of Movie"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={name}
                    onChangeText={setName}
                    style={{margin:10,height:30,width:200,flex:4}}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18,flex:1}}>Genre</Text>
                <TextInput
                    placeholder="(Comedy,Horror)"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={genre}
                    onChangeText={setGenre}
                    style={{margin:10,height:30,width:200,flex:4}}
                />
            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18,flex:1}}>Cast</Text>
                <TextInput
                    placeholder="Add Cast names with commas(,)"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={cast}
                    onChangeText={setCast}
                    style={{margin:10,height:30,width:200,flex:4}}
                />
            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18,flex:1}}>Plot</Text>
                <TextInput
                    placeholder="Enter plot of movie"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={plot}
                    onChangeText={setPlot}
                    style={{margin:10,height:30,width:200,flex:4}}
                />
            </View>

            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18,flex:1}}>Image</Text>
                <TextInput
                    placeholder="Enter URL of image here"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={imageURL}
                    onChangeText={setImageURL}
                    style={{margin:10,height:30,width:210,flex:4}}
                />
            </View>

            <RadioButton.Group
                style={{flexDirection:'row'}}
                onValueChange={type => setType(type)}
                value={type}>
                <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    <Text style={[styles.subTextStyle, {fontWeight:'bold'}]}>Type: </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Movie</Text>
                        <RadioButton value="Movie" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Tv Series: </Text>
                        <RadioButton value="TV Series" />
                    </View>
                </View>
            </RadioButton.Group>
            <View style={styles.container1}>
                <Button
                    mode="contained"
                    style={{backgroundColor:'#f3ce13',width:200,margin:10,borderWidth:2,alignItems:'center',justifyContent:'center'}}
                    onPress={()=>{
                        if (name !== '' && genre !== '' && cast  !== '' && plot  !== '' && imageURL  !== ''){
                            firebase.database()
                                .ref('/MultimediaList/'+key + '/')
                                .update({
                                    name,
                                    genre,
                                    cast,
                                    plot,
                                    imageURL,
                                    type
                                })
                                .then(() => {
                                    {
                                        ToastAndroid.show("Multimedia Updated Successfully", ToastAndroid.SHORT)
                                        console.log('Data updated.')
                                    }
                                });
                        }
                        else{
                            ToastAndroid.show("Input fields should not be empty", ToastAndroid.SHORT)
                        }
                    }}

                >
                    <Text style={{fontWeight:'bold'}}>Update </Text>
                </Button>
            </View>
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
