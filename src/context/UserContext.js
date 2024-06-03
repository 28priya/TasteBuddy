// src/context/UserContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Create a context for user data
const UserContext = createContext();

// Create a provider component
export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  // Function to update user data and save it to localStorage
  const updateUser = (newUserData) => {
    setUserData(newUserData);
    localStorage.setItem('userData', JSON.stringify(newUserData));
  };

  // Retrieve user data from localStorage when the component mounts
  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  // Provide userData and updateUser to the component tree
  return (
    <UserContext.Provider value={{ userData, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useUser = () => {
  return useContext(UserContext);
};
