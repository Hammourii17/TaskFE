import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    students: [],
    loading: true,
};

const studentSlice = createSlice({
    
    name: 'students',
    initialState,
        reducers: {
            fetchStudentsSuccess: (state, action) => {
                state.students = action.payload;
                state.loading = false;
            },
            fetchStudentsStart: (state) => {            
                state.loading = true;
            },
            addStudent : (state, action) => {
                state.students.push(action.payload);
            },
            deleteStudent : (state, action) => {
                state.students = state.students.filter(student => student.id !== action.payload);
            },
            editStudent : (state, action) => {
                state.students = state.students.map(student => student.id === action.payload.id ? action.payload : student);
            },
        },  
});
            
export const { fetchStudentsSuccess, fetchStudentsStart, addStudent, deleteStudent, editStudent } = studentSlice.actions;

export default studentSlice.reducer;