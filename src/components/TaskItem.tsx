import React, { useEffect, useRef, useState } from 'react';
import { Image, TouchableOpacity, View, Text, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import trashIcon from '../assets/icons/trash/trash.png'
import penIcon from '../assets/icons/pen/pen.png'

import { HandleEditTaskProps } from '../pages/Home';
import { Task } from './TasksList';

interface Props {
  index: number;
  task: Task;
  toggleTaskDone: (id: number) => void;
  editTask: (data: HandleEditTaskProps) => void;
  removeTask: (id: number) => void;
}

export function TaskItem({
  index, task, toggleTaskDone, editTask, removeTask
}: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(task.title);

  const textInputRef = useRef<TextInput>(null)

  function handleStartEditing() {
    setIsEditing(true);
  }

  function handleCancelEditing() {
    setCurrentTitle(task.title);
    setIsEditing(false);
  }

  function handleSubmitEditing() {
    editTask({
      taskId: task.id,
      taskNewTitle: currentTitle,
    });
    setIsEditing(false);
  }

  useEffect(() => {
    if (textInputRef.current === null) {
      return;
    }

    if (isEditing) {
      textInputRef.current.focus();  
    } else {
      textInputRef.current.blur();
    }
  }, [isEditing]);

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View 
            testID={`marker-${index}`}
            style={
              task.done
              ? styles.taskMarkerDone
              : styles.taskMarker
            }
          >
            { task.done && (
              <Icon 
                name="check"
                size={12}
                color="#FFF"
              />
            )}
          </View>

          <TextInput
            value={currentTitle}
            onChangeText={setCurrentTitle}
            editable={isEditing}
            onSubmitEditing={handleSubmitEditing}
            ref={textInputRef}
            style={
              task.done
              ? styles.taskTextDone
              : styles.taskText
            }
          />
        </TouchableOpacity>
      </View>

      <View style={{
        flexDirection: 'row',
      }}>
        {
          isEditing ? (
            <TouchableOpacity
              onPress={handleCancelEditing}
              style={{
                paddingRight: 12,
              }}
            >
              <Icon 
                name="x"
                size={24}
                color="#B2B2B2"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleStartEditing}
              style={{
                paddingRight: 12,
              }}
            >
              <Image source={penIcon} />
            </TouchableOpacity>
          )
        }
        <View
          style={{
            width: 1,
            height: 24,
            backgroundColor: 'rgba(196, 196, 196, 0.24)',
          }}
        />
        <TouchableOpacity
          testID={`trash-${index}`}
          disabled={isEditing}
          style={{
            paddingRight: 24,
            paddingLeft: 12,
            opacity: isEditing ? 0.2 : 1,
          }}
          onPress={() => removeTask(task.id)}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
    padding: 0
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center'
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
    padding: 0
  },
})