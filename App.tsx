import React from 'react';
import Index from './src';
import 'react-native-url-polyfill/auto';
import SignalRProvider from './src/providers/signalR';
import ReduxProvider from './src/providers/redux';
function App(): React.JSX.Element {
  return (
    <SignalRProvider>
      <ReduxProvider>
        <Index />
      </ReduxProvider>
    </SignalRProvider>);
}

export default App;
