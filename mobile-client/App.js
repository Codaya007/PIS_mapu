import { NativeBaseProvider } from "native-base";
import { NativeRouter } from "react-router-native";
import Main from "./src/screens/Main";
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NativeBaseProvider>
      <NativeRouter>
        <Main />
      </NativeRouter>
      <Toast/>
    </NativeBaseProvider>
  );
}
