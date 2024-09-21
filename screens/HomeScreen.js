import React from "react";
import {View , StyleSheet} from "react-native";
import DataTable from "../components/DataTable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const HomeScreen = () => {
     
    const [userData , setUserData] = useState({username:'',email:''});
    const [subjects , setSubjects] = useState([]);

    const fetchUserData = async () => {
try {
        const token = await AsyncStorage.getItem('userToken');
        const response = await fetch('https://localhost:3000/user-data', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        const data = await response.json();
        setUserData({username: data.username , email : data.email});
        setSubjects(data.subjects);
    }
    catch (error) {
        console.error(error);
    }
};

useEffect(() => {
    fetchUserData();
}, []);

const userColumns = ['Username', 'Email'];
const subjectColumns = ['Subject', 'Mark Obtained' , 'Pass Mark'];

return ( 
    <View style={styles.container}>
        <DataTable data={[userData]} columns={userColumns} />
        <DataTable  columns={subjectColumns} data={subjects.map(subject => ({
            'Subject': subject.subject,
            'Mark Obtained': subject.mark,
            'Pass Mark': subject.passMark,
        }))} />
    </View>
);
};
const styles = StyleSheet.create({
container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    },
});

export default HomeScreen;