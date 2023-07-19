import { NativeBaseProvider } from "native-base";
import Toast from "react-native-toast-message";
import * as React from "react";
import { Provider } from "react-redux";
import { store } from "./src/store/store.js";
import Main from "./src/Main";

export default function App() {
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        {/* <NativeRouter> */}
        <Main />
        <Toast />
        {/* </NativeRouter> */}
      </NativeBaseProvider>
    </Provider>
  );
}
