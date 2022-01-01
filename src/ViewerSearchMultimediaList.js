import * as React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Caption, Headline, Text, TextInput} from 'react-native-paper';
import firebase from "firebase/compat";


const ViewerSearchListComponent = ({navigation, route}) => {
    const [search, setSearch] = React.useState('');
    const [multimediaList, setMultimediaList] = React.useState([]);
    const [multimediaKeyList, setMultimediaKeyList] = React.useState([]);
    const [multimediaDisplayList, setMultimediaDisplayList] = React.useState([]);
    const [multimediaKeyDisplayList, setMultimediaKeyDisplayList] = React.useState([]);
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
                setMultimediaKeyList(list2);
                setMultimediaDisplayList(list);
                setMultimediaKeyDisplayList(list2);
            });
            setInitialization(false);
        }
    })
    /*React.useEffect(()=>{
        setMultimediaDisplayList(multimediaDisplayList.filter(value => value.name.includes(search)))
    })*/
    return (
        <View style={styles.container}>
            <TextInput
                label="Search"
                value={search}
                style={{textAlign:'center', padding:5, margin: 10}}
                mode={"outlined"}
                placeholder={"Search Movies/Tv Series"}
                onChangeText={search => setSearch(search)}
            />
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
export default ViewerSearchListComponent;
