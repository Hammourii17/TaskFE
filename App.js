import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';  // Import the Redux store
import { NavigationContainer } from '@react-navigation/native';  // Ensure this is imported
import AppNavigator from './navigation/AppNavigator';  // Import your main navigator
import { useSelector } from 'react-redux';
import AuthNavigator from './navigation/AuthNavigator';  // Ensure this path is correct




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
