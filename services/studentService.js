import AsyncStorage from '@react-native-async-storage/async-storage';

const API_URL = 'http://192.168.137.123:5003';  


const getToken = async () => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    if (!token) {
      throw new Error('No token found');
    }
    return token;  
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const getStudents = async () => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/students`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to get students');
    }

    return data.students;  
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const addStudent = async (student) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/students`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to add student');
    }

    return data.student;  
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const editStudent = async (student) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/students/${student.id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to edit student');
    }

    return data.student;
  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const deleteStudent = async (studentId) => {
  try {
    const token = await getToken();
    const response = await fetch(`${API_URL}/students/${studentId}`, {
      method: 'DELETE',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to delete student');
    }

    return true;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// provide an explanation of the above code and how it works 
// The above code is a studentService.js file that contains functions to interact with the backend API for student-related operations.
// The functions in the file are:
// getToken: This function retrieves the user token from AsyncStorage, which is used for authentication in API requests.
// getStudents: This function fetches a list of students from the API using a GET request. It includes the user token in the request headers for authentication.
// addStudent: This function adds a new student to the API using a POST request. It includes the user token in the request headers for authentication.
// editStudent: This function updates an existing student in the API using a PUT request. It includes the user token in the request headers for authentication.
// deleteStudent: This function deletes a student from the API using a DELETE request. It includes the user token in the request headers for authentication.
// Each function handles errors by logging them to the console and throwing an error to be caught by the calling code.
// The functions ensure that the user is authenticated by retrieving the user token before making API requests. This helps secure the API endpoints and prevent unauthorized access.
// The functions use the fetch API to make HTTP requests to the backend API and handle the response data accordingly.
