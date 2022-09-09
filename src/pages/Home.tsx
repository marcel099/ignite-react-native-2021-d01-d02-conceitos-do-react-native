import React, { useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const isThereTaskWithSameTitle =
      tasks.some(task => task.title === newTaskTitle);

    if (isThereTaskWithSameTitle) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      );
    }

    setTasks(previousTasks => [
      ...previousTasks,
      {
        id: new Date().getTime(),
        title: newTaskTitle,
        done: false,
      }
    ]);
  }

  function handleToggleTaskDone(id: number) {
    setTasks(previousTasks => {
      const updatedTasks = previousTasks.map(task => ({ ...task }));
      const foundTask = updatedTasks.find(task => task.id === id);

      if (foundTask) {
        foundTask.done = !foundTask.done;
      }

      return updatedTasks;
    })
  }

  function handleRemoveTask(id: number) {
    setTasks(previousTasks => {
      const updatedTasks = previousTasks.map(task => ({ ...task }));
      const taskToRemoveIdx = updatedTasks
        .findIndex(task => task.id === id);

      if (taskToRemoveIdx !== -1) {
        updatedTasks.splice(taskToRemoveIdx, 1);
      }

      return updatedTasks;
    });
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})