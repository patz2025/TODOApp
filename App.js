import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';

export default function App() {
  // to store tasks/ starts with 4 
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Clean Dishes', completed: false },
    { key: '2', description: 'Do Homework', completed: false },
    { key: '3', description: 'Go to the Gym', completed: false },
    { key: '4', description: 'Take out trash', completed: false },
  ]);
  
  // track text entered in field
  const [newTaskText, setNewTaskText] = useState('');

  // function to add new task to list
  const addTask = () => {
    // no empty tasks
    if (newTaskText.trim() === '') return;
    
    // create new tasks with properties
    const newTask = {
      key: Date.now().toString(), // Use timestamp as unique key
      description: newTaskText,
      completed: false
    };
    
    // add new task to array
    setTasks([...tasks, newTask]);
    
    // clear the field after adding to list
    setNewTaskText('');
  };

  // completed status
  const toggleTask = (key) => {
    // all tasks
    const updatedTasks = tasks.map(task => {
      if (task.key === key) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    //the new task list
    setTasks(updatedTasks);
  };

  // function renders each individual task item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        {/* checkbox */}
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
          onPress={() => toggleTask(item.key)}
        />
        
        <Text style={[
          styles.taskText,
          // strikethrough if task is completed 
          item.completed && styles.completedTask
        ]}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>My TODO List</Text>
      
      {/* new tasks */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={addTask} // Allow enter key to add task
        />
        {/* add button */}
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      {/* flastlist tasks */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    maxWidth: 600, // maximum width
    width: '100%', // full width up to maximum
    alignSelf: 'center',
  },
  // title
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // container
  inputArea: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  // text input 
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  // add button 
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  // add button text 
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // task item 
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // checkbox 
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginRight: 10,
  },
  // checked checkbox
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  // task text 
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  // strikethrough
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888',
  },
});