import React from 'react';
import Index from './src';
import 'react-native-url-polyfill/auto';
import SignalRProvider from './src/providers/signalR.provider';
import ReduxProvider from './src/providers/redux.provider';
import LoadingProvider from './src/providers/loading.provider';
function App(): React.JSX.Element {
  return (
    <LoadingProvider>
      <SignalRProvider>
        <ReduxProvider>
          <Index />
        </ReduxProvider>
      </SignalRProvider>
    </LoadingProvider>);
}

export default App;
