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
            <Headline style={{textAlign:'center', fontWeight:'bold', padding:5, flex: 1}}>Movies/Tv Series List</Headline>
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
                                    navigation.navigate('ViewerDisplayMultimedia', {
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
export default ViewerDisplayListComponent;
