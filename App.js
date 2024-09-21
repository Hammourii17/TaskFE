import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Import the Redux store
import AppNavigator from './navigation/AppNavigator';  // Import your main navigator



const AppWrapper = () => {

    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  
    return (
      <NavigationContainer>
        {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    );
  };
  const App = () => {
  return (
    <Provider store={store}>
      <AppWrapper />  
    </Provider>
  );
};

export default App;
