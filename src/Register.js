import * as React from 'react';
import {StyleSheet, ToastAndroid, View} from 'react-native';
import {
    Headline,
    Subheading,
    TextInput,
    HelperText,
    RadioButton,
    Text,
    Button,
    Paragraph,
    Caption
} from 'react-native-paper';
import firebase from "firebase/compat";

const RegisterComponent = ({navigation}) => {
    const countryList = [
        "Afghanistan",
        "Albania",
        "Algeria",
        "American Samoa",
        "Andorra",
        "Angola",
        "Anguilla",
        "Antarctica",
        "Antigua and Barbuda",
        "Argentina",
        "Armenia",
        "Aruba",
        "Australia",
        "Austria",
        "Azerbaijan",
        "Bahamas (the)",
        "Bahrain",
        "Bangladesh",
        "Barbados",
        "Belarus",
        "Belgium",
        "Belize",
        "Benin",
        "Bermuda",
        "Bhutan",
        "Bolivia (Plurinational State of)",
        "Bonaire, Sint Eustatius and Saba",
        "Bosnia and Herzegovina",
        "Botswana",
        "Bouvet Island",
        "Brazil",
        "British Indian Ocean Territory (the)",
        "Brunei Darussalam",
        "Bulgaria",
        "Burkina Faso",
        "Burundi",
        "Cabo Verde",
        "Cambodia",
        "Cameroon",
        "Canada",
        "Cayman Islands (the)",
        "Central African Republic (the)",
        "Chad",
        "Chile",
        "China",
        "Christmas Island",
        "Cocos (Keeling) Islands (the)",
        "Colombia",
        "Comoros (the)",
        "Congo (the Democratic Republic of the)",
        "Congo (the)",
        "Cook Islands (the)",
        "Costa Rica",
        "Croatia",
        "Cuba",
        "Curaçao",
        "Cyprus",
        "Czechia",
        "Côte d'Ivoire",
        "Denmark",
        "Djibouti",
        "Dominica",
        "Dominican Republic (the)",
        "Ecuador",
        "Egypt",
        "El Salvador",
        "Equatorial Guinea",
        "Eritrea",
        "Estonia",
        "Eswatini",
        "Ethiopia",
        "Falkland Islands (the) [Malvinas]",
        "Faroe Islands (the)",
        "Fiji",
        "Finland",
        "France",
        "French Guiana",
        "French Polynesia",
        "French Southern Territories (the)",
        "Gabon",
        "Gambia (the)",
        "Georgia",
        "Germany",
        "Ghana",
        "Gibraltar",
        "Greece",
        "Greenland",
        "Grenada",
        "Guadeloupe",
        "Guam",
        "Guatemala",
        "Guernsey",
        "Guinea",
        "Guinea-Bissau",
        "Guyana",
        "Haiti",
        "Heard Island and McDonald Islands",
        "Holy See (the)",
        "Honduras",
        "Hong Kong",
        "Hungary",
        "Iceland",
        "India",
        "Indonesia",
        "Iran (Islamic Republic of)",
        "Iraq",
        "Ireland",
        "Isle of Man",
        "Israel",
        "Italy",
        "Jamaica",
        "Japan",
        "Jersey",
        "Jordan",
        "Kazakhstan",
        "Kenya",
        "Kiribati",
        "Korea (the Democratic People's Republic of)",
        "Korea (the Republic of)",
        "Kuwait",
        "Kyrgyzstan",
        "Lao People's Democratic Republic (the)",
        "Latvia",
        "Lebanon",
        "Lesotho",
        "Liberia",
        "Libya",
        "Liechtenstein",
        "Lithuania",
        "Luxembourg",
        "Macao",
        "Madagascar",
        "Malawi",
        "Malaysia",
        "Maldives",
        "Mali",
        "Malta",
        "Marshall Islands (the)",
        "Martinique",
        "Mauritania",
        "Mauritius",
        "Mayotte",
        "Mexico",
        "Micronesia (Federated States of)",
        "Moldova (the Republic of)",
        "Monaco",
        "Mongolia",
        "Montenegro",
        "Montserrat",
        "Morocco",
        "Mozambique",
        "Myanmar",
        "Namibia",
        "Nauru",
        "Nepal",
        "Netherlands (the)",
        "New Caledonia",
        "New Zealand",
        "Nicaragua",
        "Niger (the)",
        "Nigeria",
        "Niue",
        "Norfolk Island",
        "Northern Mariana Islands (the)",
        "Norway",
        "Oman",
        "Pakistan",
        "Palau",
        "Palestine, State of",
        "Panama",
        "Papua New Guinea",
        "Paraguay",
        "Peru",
        "Philippines (the)",
        "Pitcairn",
        "Poland",
        "Portugal",
        "Puerto Rico",
        "Qatar",
        "Republic of North Macedonia",
        "Romania",
        "Russian Federation (the)",
        "Rwanda",
        "Réunion",
        "Saint Barthélemy",
        "Saint Helena, Ascension and Tristan da Cunha",
        "Saint Kitts and Nevis",
        "Saint Lucia",
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",
        "Saint Vincent and the Grenadines",
        "Samoa",
        "San Marino",
        "Sao Tome and Principe",
        "Saudi Arabia",
        "Senegal",
        "Serbia",
        "Seychelles",
        "Sierra Leone",
        "Singapore",
        "Sint Maarten (Dutch part)",
        "Slovakia",
        "Slovenia",
        "Solomon Islands",
        "Somalia",
        "South Africa",
        "South Georgia and the South Sandwich Islands",
        "South Sudan",
        "Spain",
        "Sri Lanka",
        "Sudan (the)",
        "Suriname",
        "Svalbard and Jan Mayen",
        "Sweden",
        "Switzerland",
        "Syrian Arab Republic",
        "Taiwan",
        "Tajikistan",
        "Tanzania, United Republic of",
        "Thailand",
        "Timor-Leste",
        "Togo",
        "Tokelau",
        "Tonga",
        "Trinidad and Tobago",
        "Tunisia",
        "Turkey",
        "Turkmenistan",
        "Turks and Caicos Islands (the)",
        "Tuvalu",
        "Uganda",
        "Ukraine",
        "United Arab Emirates (the)",
        "United Kingdom of Great Britain and Northern Ireland (the)",
        "United States Minor Outlying Islands (the)",
        "United States of America (the)",
        "Uruguay",
        "Uzbekistan",
        "Vanuatu",
        "Venezuela (Bolivarian Republic of)",
        "Viet Nam",
        "Virgin Islands (British)",
        "Virgin Islands (U.S.)",
        "Wallis and Futuna",
        "Western Sahara",
        "Yemen",
        "Zambia",
        "Zimbabwe",
        "Åland Islands"
    ];
    const [name, setName] = React.useState('');
    const [nameError, setNameError] = React.useState(false);
    const [email, setEmail] = React.useState('');
    const [emailError, setEmailError] = React.useState(false);
    const [password, setPassword] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [eye, setEye] = React.useState(true);
    const [gender, setGender] = React.useState('Male');
    const [userType, setUserType] = React.useState('Visitor');
    const [country, setCountry] = React.useState('');
    const [countryError, setCountryError] = React.useState(false);
    const validateName = (name) => {
        const re = /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/;
        return re.test(name);
    };
    const validateEmail = (email) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    };
    const validatePassword = (password) => {
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return re.test(password);
    };
    const validateCountry = (country) => {
        return countryList.some(c=> JSON.stringify(c) === JSON.stringify(country));
    };
    return (
        <View style={styles.container}>
            <Headline style={[styles.textStyle, {fontWeight: 'bold'}]}>MFLIX</Headline>
            <Subheading style={styles.textStyle}>Register your Account</Subheading>
            <TextInput
                label="Name"
                value={name}
                mode={"outlined"}
                placeholder={"Enter Your Full Name"}
                onChangeText={name => {
                    setName(name);
                    if (name === ""){
                        setNameError(false);
                    }
                    else if(!validateName(name)){
                        setNameError(true);
                    }
                    else {
                        setNameError(false);
                    }
                }}
                error={nameError}
            />
            <HelperText type="error" visible={nameError}>
                Name is invalid!
            </HelperText>
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
                secureTextEntry={eye}
                right={
                    <TextInput.Icon name="eye" onPress={() => {setEye(!eye)}}/>
                }
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
                error={passwordError}
            />
            <HelperText type="error" visible={passwordError}>
                Password must contains 8 character and 1 digit!
            </HelperText>
            <TextInput
                label="Country"
                value={country}
                mode={"outlined"}
                placeholder={"Enter Your Country"}
                onChangeText={country => {
                    setCountry(country);
                    if (country === "") {
                        setCountryError(false);
                    } else if (!validateCountry(country)) {
                        setCountryError(true);
                    } else {
                        setCountryError(false);
                    }
                }}
                error={countryError}
            />
            <HelperText type="error" visible={countryError}>
                Country is invalid!
            </HelperText>
            <RadioButton.Group
                style={{flexDirection:'row'}}
                onValueChange={gender => setGender(gender)}
                value={gender}>
                <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    <Text style={[styles.subTextStyle, {fontWeight:'bold', textAlign:'left'}]}>Gender: </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Male</Text>
                        <RadioButton value="Male" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Female</Text>
                        <RadioButton value="Female" />
                    </View>
                </View>
            </RadioButton.Group>
            <RadioButton.Group
                style={{flexDirection:'row'}}
                onValueChange={userType => setUserType(userType)}
                value={userType}>
                <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
                    <Text style={[styles.subTextStyle, {fontWeight:'bold', textAlign:'left'}]}>User Type: </Text>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Visitor</Text>
                        <RadioButton value="Visitor" />
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.subTextStyle}>Publisher</Text>
                        <RadioButton value="Publisher" />
                    </View>
                </View>
            </RadioButton.Group>
            <Button
                mode="contained"
                onPress={() => {
                    if (!nameError && !emailError && !passwordError && !countryError){
                        firebase.auth()
                            .createUserWithEmailAndPassword(email, password)
                            .then((user) => {
                                console.log(user.user.uid);
                                firebase.database().ref('Users/'+ user.user.uid + '/').set({
                                    name,
                                    email,
                                    gender,
                                    userType,
                                    country,
                                }).then((data)=>{
                                    //success callback
                                    console.log('data ' , data)
                                    ToastAndroid.show("User Registered Successfully", ToastAndroid.SHORT)
                                    console.log('User account created & signed in!');
                                    if (userType === 'Visitor')
                                        navigation.navigate("ViewerMainMenu", {
                                            user: user.user
                                        })
                                    else {
                                        navigation.navigate('PublisherMainMenu', {
                                            user: user.user
                                        });
                                    }
                                }).catch((error)=>{
                                    //error callback
                                    console.log('error ' , error)
                                })
                            })
                            .catch(error => {
                                if (error.code === 'auth/email-already-in-use') {
                                    ToastAndroid.show("Email Already in Use", ToastAndroid.SHORT)
                                    console.log('That email address is already in use!');
                                }

                                if (error.code === 'auth/invalid-email') {
                                    ToastAndroid.show("Email Address is Invalid", ToastAndroid.SHORT)
                                    console.log('That email address is invalid!');
                                }
                                if (error.code === 'auth/weak-password') {
                                    ToastAndroid.show("Password is weak", ToastAndroid.SHORT)
                                    console.log('Password is weak');
                                }
                                console.error(error);
                            });
                    }
                }}
            >
                Register
            </Button>
            <Paragraph
                style={styles.textStyle}
                onPress={() => navigation.navigate("Login")}>
                Already have an account? SignIn Here
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

export default RegisterComponent;
