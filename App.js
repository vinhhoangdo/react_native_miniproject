import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";



import Login from "./src/components/Login";
import Photos from "./src/components/Photos";
import Details from "./src/components/Detail";

const MainNavigator = createStackNavigator(
  {Photos: { screen: Photos },
    Login: { screen: Login },
    
    Details: {screen: Details}
    
    
  },
  {
    headerMode: "none",
    navigationOptions: {
      headerVisible: false,
    },
  }
);

const App = createAppContainer(MainNavigator);

export default App;
