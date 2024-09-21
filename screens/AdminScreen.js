import React, { useState, useEffect } from "react";
import { View, StyleSheet, Alert, Text } from "react-native"; 
import CustomButton from "../components/customButton";
import FormField from "../components/FormField";
import CustomModal from "../components/customModal";
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";

const AdminScreen = () => {
    const dispatch = useDispatch();
  const [students, setStudents] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newUserModalVisible, setNewUserModalVisible] = useState(false);
  const [newSubjectModalVisible, setNewSubjectModalVisible] = useState(false);
  const [assignSubjectModalVisible, setAssignSubjectModalVisible] = useState(false); 
  const [newUserData, setNewUserData] = useState({ username: "", email: "", password: "" });
  const [newSubjectData, setNewSubjectData] = useState({ subjectName: "", passMark: "" });
  const [editingStudent, setEditingStudent] = useState({ username: "", email: "", isActive: false });

  const fetchStudents = async () => {
    
    const mockData = [
      { id: "1", username: "john_doe", email: "john@example.com", isActive: true },
      { id: "2", username: "jane_doe", email: "jane@example.com", isActive: false }
    ];
    setStudents(mockData);
  };

  useEffect(() => {
    const fetchStudents = async () => {
      dispatch(fetchStudentsStart());
      try {
        const response = await studentService.getStudents();
        dispatch(fetchStudentsSuccess(response.data));
      } catch (error) {
        console.error('Failed to fetch students', error);
      }
      fetchSubjects(); 

    };

    fetchStudents();
  }, [dispatch]);

//   const handleAssignSubject = (student) => {
//         const studentUser = student.username;

//         if(selectedStudent && selectedSubject)

//         {




//     setAssignSubjectModalVisible(true);
//     };

  const handleEditStudent = (student) => {
    setEditingStudent(student);
    setModalVisible(true);
  };

  const saveEditedStudent = () => {
    setModalVisible(false);
    Alert.alert("Success", "Student details updated successfully");
  };

  const handleDeleteStudent = (studentId) => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete this student?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", onPress: () => deleteStudent(studentId) }
      ]
    );
  };

  const deleteStudent = async (studentId) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await fetch(`https://localhost:3000/students/${studentId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (response.ok) {
            setStudents(students.filter(student => student.id !== studentId));
            Alert.alert("Success", "Student deleted successfully");
        } else {
            Alert.alert("Error", "Failed to delete student");
        }
    } catch (error) {
        console.error(error);
        Alert.alert("Error", "An error occurred while deleting the student");
    }
};

  const handleCreateUser = () => {
    setStudents([...students, { id: Date.now().toString(), ...newUserData, isActive: false }]);
    setNewUserModalVisible(false);
    setNewUserData({ username: "", email: "", password: "" });
    Alert.alert("Success", "Student created successfully");
  };

  const handleCreateNewSubject = () => {
    setNewSubjectModalVisible(false);
    setNewSubjectData({ subjectName: "", passMark: "" });
    Alert.alert("Success", "New subject created successfully");
  };

 
  return (
    <View style={styles.container}>
      <DataTable
        columns={["Username", "Email", "Active"]} // Corrected the spelling of "columns"
        data={students.map(student => ({
          username: student.username,
          email: student.email,
          actions: (
            <View style={styles.actionButtons}>
              <CustomButton title="Edit" onPress={() => handleEditStudent(student)} />
              <CustomButton title="Delete" onPress={() => handleDeleteStudent(student.id)} />
            </View>
          )
        }))}
      />

      <CustomButton title="Create User" onPress={() => setNewUserModalVisible(true)} />
      <CustomButton title="Create New Subject" onPress={() => setNewSubjectModalVisible(true)} />

      {/* Edit Student Modal */}
      <CustomModal
        isVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        title="Edit Student"
      >
        <FormField
          label="Username"
          value={editingStudent.username}
          onChangeText={text => setEditingStudent({ ...editingStudent, username: text })}
          placeholder="Enter username"
        />
        <FormField
          label="Email"
          value={editingStudent.email}
          onChangeText={text => setEditingStudent({ ...editingStudent, email: text })}
          placeholder="Enter email"
        />
        <View style={styles.checkboxContainer}> 
          <Text>Active</Text>
          <CustomButton title={editingStudent.isActive ? "Active" : "Inactive"} 
            onPress={() => setEditingStudent({ ...editingStudent, isActive: !editingStudent.isActive })} />
        </View> 
        <CustomButton title="Save" onPress={saveEditedStudent} />
      </CustomModal>

      {/* New User Modal */}
      <CustomModal
        isVisible={newUserModalVisible}
        onClose={() => setNewUserModalVisible(false)}
        title="Create User"
      >
        <FormField
          label="Username"
          value={newUserData.username}
          onChangeText={text => setNewUserData({ ...newUserData, username: text })}
          placeholder="Enter username"
        />
        <FormField
          label="Email"
          value={newUserData.email}
          onChangeText={text => setNewUserData({ ...newUserData, email: text })}
          placeholder="Enter email"
        />
        <FormField
          label="Password"
          value={newUserData.password}
          onChangeText={text => setNewUserData({ ...newUserData, password: text })}
          placeholder="Enter password"
          secureTextEntry
        /> 
        <CustomButton title="Create" onPress={handleCreateUser} />
      </CustomModal>

      {/* New Subject Modal */}
      <CustomModal 
        isVisible={newSubjectModalVisible}
        onClose={() => setNewSubjectModalVisible(false)}
        title="Create New Subject"
      > 
        <FormField
          label="Subject Name"
          value={newSubjectData.subjectName}
          onChangeText={text => setNewSubjectData({ ...newSubjectData, subjectName: text })}
          placeholder="Enter subject name"
        />  
        <FormField
          label="Pass Mark"
          value={newSubjectData.passMark}
          onChangeText={text => setNewSubjectData({ ...newSubjectData, passMark: text })}
          placeholder="Enter pass mark"
        />  
        <CustomButton title="Create" onPress={handleCreateNewSubject} />
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 100,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});

export default AdminScreen;
