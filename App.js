import React, { useState } from 'react';
import { StyleSheet, SafeAreaView, FlatList, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';

export default function App() {
  // State to store our tasks - starts with 4 default tasks as required
  const [tasks, setTasks] = useState([
    { key: '1', description: 'Learn React Native', completed: false },
    { key: '2', description: 'Build a TODO app', completed: false },
    { key: '3', description: 'Submit assignment', completed: false },
    { key: '4', description: 'Publish on GitHub Pages', completed: false },
  ]);
  
  // State to track the text entered in the input field
  const [newTaskText, setNewTaskText] = useState('');

  // Function to add a new task to the list
  const addTask = () => {
    // Don't add empty tasks
    if (newTaskText.trim() === '') return;
    
    // Create a new task object with required properties
    const newTask = {
      key: Date.now().toString(), // Use timestamp as unique key
      description: newTaskText,
      completed: false
    };
    
    // Add the new task to our existing tasks array
    setTasks([...tasks, newTask]);
    
    // Clear the input field after adding
    setNewTaskText('');
  };

  // Function to toggle the completed status of a task
  const toggleTask = (key) => {
    // Map through all tasks and toggle the matching one
    const updatedTasks = tasks.map(task => {
      if (task.key === key) {
        // Create a new object with the completed status flipped
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    
    // Update state with the new task list
    setTasks(updatedTasks);
  };

  // This function renders each individual task item in the FlatList
  const renderItem = ({ item }) => {
    return (
      <View style={styles.taskItem}>
        {/* Custom checkbox using TouchableOpacity */}
        <TouchableOpacity
          style={[styles.checkbox, item.completed && styles.checkboxChecked]}
          onPress={() => toggleTask(item.key)}
        />
        
        {/* Task text with conditional styling */}
        <Text style={[
          styles.taskText,
          // Apply strikethrough style if task is completed as required
          item.completed && styles.completedTask
        ]}>
          {item.description}
        </Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* App title */}
      <Text style={styles.header}>My TODO List</Text>
      
      {/* Input area for adding new tasks */}
      <View style={styles.inputArea}>
        <TextInput
          style={styles.input}
          placeholder="Add a new task..."
          value={newTaskText}
          onChangeText={setNewTaskText}
          onSubmitEditing={addTask} // Allow enter key to add task
        />
        {/* "Add" button as required */}
        <TouchableOpacity style={styles.addButton} onPress={addTask}>
          <Text style={styles.addButtonText}>Add</Text>
        </TouchableOpacity>
      </View>
      
      {/* Task list using FlatList as required */}
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

// Styles for the app components
const styles = StyleSheet.create({
  // Main container with platform-specific padding
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    paddingTop: Platform.OS === 'android' ? 25 : 50, // Adjust for Android status bar
  },
  // App title styling
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  // Container for input and add button
  inputArea: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  // Text input styling
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  // Add button styling
  addButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginLeft: 10,
    borderRadius: 5,
    justifyContent: 'center',
  },
  // Add button text styling
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  // Individual task item styling
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  // Custom checkbox styling
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#007BFF',
    marginRight: 10,
  },
  // Checked state for custom checkbox
  checkboxChecked: {
    backgroundColor: '#007BFF',
  },
  // Task text styling
  taskText: {
    fontSize: 16,
    flex: 1,
  },
  // Strikethrough styling for completed tasks as required
  completedTask: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
    color: '#888',
  },
});