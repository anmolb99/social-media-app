import React from 'react';
import Routing from './Routing';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <NativeBaseProvider>
      <Routing />
    </NativeBaseProvider>
  );
};

export default App;
