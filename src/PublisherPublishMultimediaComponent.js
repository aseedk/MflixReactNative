import React from 'react';
import {View, StyleSheet, ToastAndroid, Alert} from 'react-native';
import { Text, Title, TextInput,Card,Button,RadioButton } from 'react-native-paper';
import firebase from "firebase/compat";
export default function PublisherPublishMultimediaComponent({route}){
    let user = route.params?.user;
    const [name, setName] = React.useState('');
    const [genre, setGenre] = React.useState('');
    const [cast, setCast] = React.useState('');
    const [plot, setPlot] = React.useState('');
    const [imageURL, setImageURL] = React.useState('');
    const [type, setType] = React.useState('Movie')
    return(
        <View style={[styles.container,{backgroundColor:'white', padding: 10, margin: 10}]}>
            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18, flex:1}}>Name</Text>
                <TextInput
                    placeholder="Enter name of Movie"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={name}
                    onChangeText={setName}
                    style={{margin:10,height:30,width:200, flex:4}}
                />
            </View>
            <View style={{flexDirection:'row'}}>
                <Text style={{margin:20,fontWeight:'bold',fontSize:18, flex:1}}>Genre</Text>
                <TextInput
                    placeholder="(Comedy,Horror)"
                    mode='outlined'
                    activeOutlineColor='black'
                    value={genre}
                    onChangeText={setGenre}
                    style={{margin:10,height:30,width:200 , flex:4}}
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
                            const newMultimediaReference = firebase.database().ref('/MultimediaList').push();
                            newMultimediaReference.set({
                                name,
                                genre,
                                type ,
                                cast ,
                                plot,
                                imageURL,
                                publisherID: user.uid
                            }).then(async ()=> {
                                    let publishedMultimedia = [];
                                    await firebase.database().ref('/Users/'+ user.uid +'/publishedMultimedia').once('value', function (snapshot) {
                                        publishedMultimedia = snapshot.val();
                                    })
                                    if (publishedMultimedia === null){
                                        publishedMultimedia = [];
                                    }
                                    publishedMultimedia.push(newMultimediaReference.key);
                                    firebase.database()
                                        .ref('/Users/'+user.uid + '/')
                                        .update({
                                            publishedMultimedia,
                                        })
                                        .then(() => {
                                            {
                                                ToastAndroid.show("Multimedia Published", ToastAndroid.SHORT)
                                                console.log('Data updated.')
                                            }
                                        });
                                }
                            )
                        }
                        else{
                            ToastAndroid.show("Input fields are empty", ToastAndroid.SHORT)
                        }
                    }}

                >
                    <Text style={{fontWeight:'bold'}}>Publish</Text>
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
