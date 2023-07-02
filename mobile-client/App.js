import { NativeBaseProvider } from "native-base";
import { NativeRouter } from "react-router-native";
import Main from "./src/screens/Main";

export default function App() {
  return (
    <NativeBaseProvider>
      <NativeRouter>
        <Main />
      </NativeRouter>
    </NativeBaseProvider>
  );
}
