import * as React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Caption, Headline, Text} from 'react-native-paper';
import firebase from "firebase/compat";


const ViewerDisplayListComponent = ({navigation, route}) => {
    const [multimediaList, setMultimediaList] = React.useState([]);
    const [multimediaKeyList, setMultimediaKeyList] = React.useState([]);
    const [initialization, setInitialization] = React.useState(true);
    React.useEffect(async ()=>{
        if (initialization){
            await firebase.database().ref('/MultimediaList').once('value', function (snapshot) {
                const list = [];
                const list2 = [];
                for (let k in snapshot.val()) {
                    list.push(snapshot.val()[k]);
                    list2.push(k);
                }
                setMultimediaList(list);
                setMultimediaKeyList(list2)
            });
            setInitialization(false);
        }

    })
    return (
        <View style={styles.container}>
            <Headline style={{textAlign:'center', fontWeight:'bold',color:'#fff', padding:5, flex: 1}}>Movies/Tv Series List</Headline>
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
        marginTop:20,
        color:"#FFF"
    },
    subTextStyle:{
        marginTop: 10
    }
});
export default ViewerDisplayListComponent;
