import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginComponent from "./Login";
import RegisterComponent from "./Register";
import ViewerMainMenuComponent from "./ViewerMainMenu";
import ViewerDisplayListComponent from "./ViewerDisplayListComponent"
import ViewerDisplayMultimediaComponent from "./ViewerDisplayMultimediaComponent";
import ViewerSearchMultimediaList from "./ViewerSearchMultimediaList";
import ViewerDisplayFavoriteListComponent from "./ViewerDisplayFavoriteListComponent";
import PublisherMainMenuComponent from "./PublisherMainMenuComponent"
import PublisherPublishMultimediaComponent from "./PublisherPublishMultimediaComponent";
import PublisherDisplayPublishedListComponent from "./PublisherDisplayListComponent";
import PublisherDisplayMultimediaComponent from "./PublisherDisplayMultimediaComponent";
import PublisherEditMultimediaComponent from "./PublisherEditMultimediaComponent";
const Stack = createNativeStackNavigator();

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName={"Login"}>
                <Stack.Screen name="Login" component={LoginComponent} options={{headerShown: false}}/>
                <Stack.Screen name="Register" component={RegisterComponent} options={{headerShown: false}}/>
                <Stack.Screen name="ViewerMainMenu" component={ViewerMainMenuComponent} options={{title: "Viewer Main Menu"}}/>
                <Stack.Screen name="ViewerDisplayMultimediaList" component={ViewerDisplayListComponent} options={{title: "View Movies/Tv Series List"}}/>
                <Stack.Screen name="ViewerDisplayMultimedia" component={ViewerDisplayMultimediaComponent} options={{title: "View Multimedia Details"}}/>
                <Stack.Screen name="ViewerDisplayFavoriteMultimediaList" component={ViewerDisplayFavoriteListComponent} options={{title: "Favorite Multimedia List"}}/>
                <Stack.Screen name="ViewerSearchMultimediaList" component={ViewerSearchMultimediaList} options={{title: "Search Multimedia List"}}/>
                <Stack.Screen name="PublisherMainMenu" component={PublisherMainMenuComponent} options={{title: "Publisher Home"}}/>
                <Stack.Screen name="PublisherPublishMultimedia" component={PublisherPublishMultimediaComponent} options={{title: "Publish Multimedia"}}/>
                <Stack.Screen name="PublisherDisplayPublishedMultimediaList" component={PublisherDisplayPublishedListComponent} options={{title: "View Published Multimedia"}}/>
                <Stack.Screen name="PublisherDisplayMultimedia" component={PublisherDisplayMultimediaComponent} options={{title: "View Published Details"}}/>
                <Stack.Screen name="PublisherEditMultimedia" component={PublisherEditMultimediaComponent} options={{title: "Edit Published Multimedia"}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default App;


