import { createSlice } from '@reduxjs/toolkit'

const taskSlice = createSlice({
    name: 'tasks',
    initialState: {
        data: [],
    },
    reducers: {
        setTasks: (state, action) => {
            state.data = action.payload;
        },
        deleteTask: (state, action) => {
            state.data = state.data.filter((task) => task.id !== action.payload);
        },
    },
});

export const { setTasks, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;