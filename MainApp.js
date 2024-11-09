import { StyleSheet, Text, View, Image, TextInput, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { setTasks, deleteTask } from './Redux_Tookit/taskSlice';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

const API_URL = 'https://67126da56c5f5ced66237d06.mockapi.io/task';

const App = () => {
    const tasks = useSelector((state) => state.tasks.data);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchTask();
    }, []);

    const fetchTask = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            dispatch(setTasks(data));
        } catch (error) {
            console.error('error', error);
        }
    };

    const filterTask = tasks.filter((task) =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDelete = async (id) => {
        try {
            await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
            // fetchTask();
            dispatch(deleteTask(id))
        } catch (error) {
            console.error('error', error);
        }
    };

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.back}>←</Text>
                <View style={styles.headerInfo}>
                    <Image source={require('./images/avt.png')} style={styles.profileImage} />
                    <View>
                        <Text style={styles.greeting}>Hi Twinkle</Text>
                        <Text style={styles.subGreeting}>Have a great day ahead</Text>
                    </View>
                </View>
            </View>

            <View style={styles.searchInput}>
                <View style={styles.inputForm}>
                    <Image source={require('./images/search.png')} style={styles.mail} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#999"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <View style={styles.section}>
                <SafeAreaView style={{ height: '100%' }}>
                    <FlatList
                        data={filterTask}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <View style={styles.taskItem}>
                                <Image source={require('./images/check.png')} style={styles.taskIcon} />
                                <Text style={styles.taskTitle}>{item.title}</Text>
                                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                                    <Image source={require('./images/delete.png')} style={styles.taskIcon} />
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Image source={require('./images/pencil.png')} style={styles.taskIcon} />
                                </TouchableOpacity>
                            </View>
                        )}
                    />
                </SafeAreaView>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.addButton}>
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10,
        paddingHorizontal: 15,
    },
    header: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    back: {
        fontSize: 30,
    },
    headerInfo: {
        flexDirection: 'row',
    },
    profileImage: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
    },
    greeting: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    subGreeting: {
        fontSize: 14,
        color: '#999',
    },
    searchInput: {
        flex: 1,
        paddingTop: 40,
    },
    inputForm: {
        flexDirection: 'row',
        width: '100%',
    },
    mail: {
        position: 'absolute',
        bottom: 28,
        marginLeft: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 15,
        padding: 10,
        marginBottom: 20,
        width: '100%',
        paddingLeft: 40,
    },
    section: {
        flex: 3,
    },
    taskItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        borderRadius: 20,
        padding: 10,
        marginBottom: 15,
    },
    taskIcon: {
        width: 20,
        height: 20,
        marginRight: 10,
    },
    taskTitle: {
        flex: 1,
    },
    footer: {
        flex: 1,
    },
    addButton: {
        position: 'absolute',
        bottom: 50,
        right: 140,
        backgroundColor: '#40E0D0',
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        fontSize: 24,
        color: '#fff',
    },
});

export default App;