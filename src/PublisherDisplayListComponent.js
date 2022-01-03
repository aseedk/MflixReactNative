import * as React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Caption, Headline, Text} from 'react-native-paper';
import firebase from "firebase/compat";


const PublisherDisplayPublishedListComponent = ({navigation, route}) => {
    const user = route.params?.user;
    const [multimediaList, setMultimediaList] = React.useState([]);
    const [multimediaKeyList, setMultimediaKeyList] = React.useState([]);
    const [initialization, setInitialization] = React.useState(true);
    React.useEffect(async ()=>{
        if (initialization){
            console.log("Hello");
            await firebase.database().ref('Users/' + user.uid + '/publishedMultimedia/').once('value',async function (snapshot) {
                const multimediaKeyList = snapshot.val();
                console.log(snapshot.val())
                const multimediaList = []
                if (multimediaKeyList === null) {
                    setMultimediaList([]);
                    setMultimediaKeyList([]);
                } else {
                    for (const listKey of multimediaKeyList) {
                        if (listKey!==undefined){
                            await firebase.database().ref('/MultimediaList/' + listKey + '/').once('value', function (snapshot2) {
                                multimediaList.push(snapshot2.val());
                                console.log(snapshot2.val())
                            });
                        }
                    }
                    setMultimediaList(multimediaList);
                    setMultimediaKeyList(multimediaKeyList)
                }
            })
            setInitialization(false);
        }

    })
    return (
        <View style={styles.container}>
            <Headline style={{textAlign:'center', fontWeight:'bold', padding:5, flex: 1}}>Publisher Movies/Tv Series List</Headline>
            <View style={{flexDirection:'row', borderWidth:1, padding:5,margin: 5}}>
                <Text style={{flex:3, fontWeight:'bold'}}>Name</Text>
                <Text style={{flex:1, fontWeight:'bold'}}>Genre</Text>
                <Text style={{flex:1, fontWeight:'bold'}}>Type</Text>
            </View>
            <View style={{flex:3}}>
                <ScrollView>
                    {multimediaList.map((value, index)=> {
                        return(
                            <TouchableOpacity
                                style={{flexDirection:'row', borderWidth:1, padding:5, margin: 5}}
                                key={index}
                                onPress={()=> {
                                    navigation.navigate('PublisherDisplayMultimedia', {
                                        data: value,
                                        key: multimediaKeyList[index],
                                        user: route.params?.user
                                    })
                                }}
                            >
                                <Text style={{flex:3}}>{value.name}</Text>
                                <Text style={{flex:1}}>{value.genre}</Text>
                                <Text style={{flex:1}}>{value.type}</Text>
                            </TouchableOpacity>
                        );})
                    }
                </ScrollView>
            </View>

            <View style={{flex:1, padding: 10}}>
                <Caption style={{textAlign: "center"}}>Developed by: Peepo Tech</Caption>
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
    textStyle:{
        textAlign:'center',
        marginTop:20
    },
    subTextStyle:{
        marginTop: 10
    }
});
export default PublisherDisplayPublishedListComponent;
