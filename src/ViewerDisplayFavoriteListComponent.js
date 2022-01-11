import * as React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Caption, Headline, Text} from 'react-native-paper';
import firebase from "firebase/compat";


const ViewerDisplayFavoriteListComponent = ({navigation, route}) => {
    const user = route.params?.user;
    const [multimediaList, setMultimediaList] = React.useState([]);
    const [multimediaKeyList, setMultimediaKeyList] = React.useState([]);
    const [initialization, setInitialization] = React.useState(true);
    React.useEffect(async ()=>{
        if (initialization){
            await firebase.database().ref('Users/' + user.uid + '/favoriteMovies/').once('value',async function (snapshot) {
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
            <Headline style={{textAlign:'center', fontWeight:'bold',color:'#fff', padding:5, flex: 1}}>Favorite Movies/Tv Series List</Headline>
            <View style={{flex:5}}>
                <ScrollView>
                    {multimediaList.map((value, index)=> {
                        return(
                            <TouchableOpacity
                                style={{flexDirection:'column', borderWidth:1,borderColor:"#fff", padding:10, margin: 10, borderRadius: 25, backgroundColor: "#E50914"}}
                                key={index}
                                onPress={()=> {
                                    navigation.navigate('ViewerDisplayMultimedia', {
                                        data: value,
                                        key: multimediaKeyList[index],
                                        user: route.params?.user
                                    })
                                }}
                            >
                                <Headline style={{flex:3, color:"#fff"}}>{value.name}</Headline>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{flex:1, color: '#fff'}}>Genre: {value.genre}</Text>
                                    <Text style={{flex:1, color: '#fff'}}>Type: {value.type}</Text>
                                </View>
                            </TouchableOpacity>
                        );})
                    }
                </ScrollView>
            </View>

            <View style={{flex:1, padding: 10}}>
                <Caption style={{textAlign: "center", color:'#FFF'}}>Developed by: Peepo Tech</Caption>
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
    textStyle:{
        textAlign:'center',
        marginTop:20
    },
    subTextStyle:{
        marginTop: 10
    }
});
export default ViewerDisplayFavoriteListComponent;
