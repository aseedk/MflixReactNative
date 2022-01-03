import * as React from 'react';
import { StyleSheet, View, ToastAndroid } from 'react-native';
import {
    Headline,
    Subheading,
    TextInput,
    HelperText,
    Checkbox,
    Text,
    Button,
    Paragraph,
    Caption
} from 'react-native-paper';
import * as SecureStore from 'expo-secure-store';
import firebase from "firebase/compat";

const LoginComponent = ({navigation}) => {
    const [initialization, setInitialization] = React.useState(true);
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [rememberMe, setRememberMe] = React.useState(false);
    const [eye, setEye] = React.useState(true);
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };
    React.useEffect(async ()=>{
        if (initialization){
            let email = await SecureStore.getItemAsync("email");
            let password = await SecureStore.getItemAsync("password");
            if (email && password){
                setEmail(email);
                setPassword(password)
            }
            setInitialization(false);
        }
    })
    return (
        <View style={styles.container}>
            <Headline style={[styles.textStyle, {fontWeight: 'bold'}]}>MFLIX</Headline>
            <Subheading style={styles.textStyle}>Login to your Account</Subheading>
            <TextInput
                label="Email"
                value={email}
                mode={"outlined"}
                placeholder={"Enter Your Email Account"}
                onChangeText={email => {
                    setEmail(email)
                    if (email === ''){
                        setEmailError(false);
                    }
                    else if (!validateEmail(email)){
                        setEmailError(true);
                    }else {
                        setEmailError(false);
                    }
                }}
                error={emailError}
            />
            <HelperText type="error" visible={emailError}>
                Email address is invalid!
            </HelperText>
            <TextInput
                label="Password"
                value={password}
                mode={"outlined"}
                placeholder={"Enter Your Password"}
                onChangeText={password => {
                    setPassword(password);
                    if (password === "") {
                        setPasswordError(false);
                    } else if (!validatePassword(password)) {
                        setPasswordError(true);
                    } else {
                        setPasswordError(false);
                    }
                }}
                secureTextEntry={eye}
                right={<TextInput.Icon name="eye"  onPress={()=>{setEye(!eye)}}/>}
                error={passwordError}
            />
            <HelperText type="error" visible={passwordError}>
                Password is invalid!
            </HelperText>
            <View style={{flexDirection:"row"}}>
                <Checkbox
                    status={rememberMe ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setRememberMe(!rememberMe);
                    }}
                />
                <Text style={styles.subTextStyle}>Remember Me?</Text>
            </View>
            <Button
                mode="contained"
                onPress={() => {
                    firebase.auth()
                        .signInWithEmailAndPassword(email, password)
                        .then(async (user) => {
                            ToastAndroid.show("Login Successful", ToastAndroid.SHORT)
                            console.log('User account created & signed in!');
                            console.log(user.user.uid);
                            if (rememberMe){
                                await SecureStore.setItemAsync("email", email);
                                await SecureStore.setItemAsync("password", password);
                            }
                            await firebase.database().ref('/Users/' + user.user.uid).once('value', function (snapshot){
                                let tempUser = snapshot.val();
                                if (tempUser.userType === "Visitor"){
                                    navigation.navigate('ViewerMainMenu', {
                                        user: user.user
                                    });
                                }
                                else {
                                    navigation.navigate('PublisherMainMenu', {
                                        user: user.user
                                    });
                                }
                            })

                        })
                        .catch(error => {
                            if (error.code === 'auth/user-not-found') {
                                ToastAndroid.show("User Doesnt Exists", ToastAndroid.SHORT)
                                console.log('User Doesnt Exists');
                            }
                            if (error.code === 'auth/invalid-email') {
                                ToastAndroid.show("That email address is invalid!", ToastAndroid.SHORT)
                                console.log('That email address is invalid!');
                            }
                            if (error.code === 'auth/wrong-password') {
                                ToastAndroid.show("Password entered is incorrect", ToastAndroid.SHORT)
                                console.log('Password entered is incorrect');
                            }
                            console.error(error);
                        });
                }}
            >
                Login
            </Button>
            <Paragraph
                style={styles.textStyle}
                onPress={() => navigation.navigate("Register")}>
                Dont have an account? SignUp Here
            </Paragraph>
            <Caption style={{textAlign: "center"}}>Developed by: Peepo Tech</Caption>
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

export default LoginComponent;
