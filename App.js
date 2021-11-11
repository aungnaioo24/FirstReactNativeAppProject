import React, {useState} from "react";
import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, CheckBox } from "react-native";

const styles = StyleSheet.create({
  header: {
    flex: 1,
    alignItems: "center",
    marginTop: 20
  },

  body: {
    flexDirection: "row",
    margin: 20
  },

  tasksBody: {
    margin: 20
  },

  taskList: {
    flexDirection: "row"
  },

  title: {
    fontSize: 20,
    color: "#404040",
    fontWeight: "bold"
  },

  input: {
    flex: 4,
    height: 40,
    border: "1px solid #e5e5e5",
    borderRadius: 5,
    marginRight: 5,
    padding: 10,
  },

  addButton: {
    flex: 1,
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2c81d8',
    alignItems: 'center'
  },

  delButton: {
    height: 30,
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#b3312a',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },

  checkbox: {
    flex: 1,
    alignSelf: "center",
  },

});

const TaskList = props => {

  const [isSelected, setSelection] = useState(false);

  const textUnChecked = StyleSheet.create({
    textChecked: {
      flex: 15,
      margin: 8,
    }
  });

  const textChecked = StyleSheet.create({
    textChecked: {
      flex: 15,
      margin: 8,
      textDecorationLine: 'line-through'
    }
  });

  const textStyle = isSelected? textChecked: textUnChecked

  const del = () => {
    props.del(props.id);
  }

  return (
    <View style={styles.taskList}>
      <CheckBox
          value={isSelected}
          onValueChange={setSelection}
          style={styles.checkbox}
        />
        <Text style={textStyle.textChecked}>{props.task}</Text>
        <TouchableOpacity style={styles.delButton} onPress={del}>
          <Text style={{color: 'white'}}>Del</Text>
        </TouchableOpacity>
    </View>
  )
}

const App = () => {

  // getting and setting tasklist with array
  const [tasks, setTasks] = useState([]);

  const [task, setTask] = useState();

  const add = () => {
    setTasks([
      ...tasks, {id: tasks.length + 1, task}
    ])

    setTask('')

  }

  const del = (id) => {
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.title}>To do List</Text>
      </View>
      <View style={styles.body}>
        <TextInput
          style={styles.input}
          placeholder="Add Task Here"
          value={task}
          onChangeText={text => setTask(text)}
          returnKeyType="done"
          onSubmitEditing = {add}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={add}
        >
          <Text style={{color: 'white'}}>Add</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.tasksBody}>
        <FlatList
          data={tasks}
          renderItem={({item}) => (
            <TaskList task={item.task} del={del} id={item.id} />
          )}
          keyExtractor={i=>i.id}
        />
      </View>
    </View>
  )
}

export default App;