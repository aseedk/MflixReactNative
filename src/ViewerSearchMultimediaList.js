import * as React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {Caption, Headline, Text, TextInput} from 'react-native-paper';
import firebase from "firebase/compat";


const ViewerSearchListComponent = ({navigation, route}) => {
    const [search, setSearch] = React.useState('');
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
                setMultimediaKeyList(list2);
            });
            setInitialization(false);
        }
    })
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
            <View style={{flex:3}}>
                <ScrollView>
                    {multimediaList.map((value, index)=> {
                        if (value.name.toLowerCase().includes(search.toLowerCase())){
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
                            )
                        }})
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
export default ViewerSearchListComponent;
