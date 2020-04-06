<template>
  <div style="border-radius: 20px;background-color:white;padding:50px;">
    <input type="text" class="todo-input" placeholder="What needs to be done" v-model="newTodo" @keyup.enter="addTodo">
    <div v-if="successmessage" id="hideSuccessMessage" class="success-message">{{successmessage}}</div>
    <transition-group name="fade" enter-active-class="animated fadeInUp" leave-active-class="animated fadeOutDown">
    <todo-item v-for="todo in todosFiltered" :key="todo.id" :todo="todo" :checkAll="!anyRemaining" @removedTodo="removeTodo" @finishedEdit="finishedEdit">
    </todo-item>
    </transition-group>

    <div class="extra-container">
      <div><label><input type="checkbox" :checked="!anyRemaining" @change="checkAllTodos"> Check All</label></div>
      <div>{{ remaining }} items left</div>
    </div>

    <div class="extra-container">
      <div>
        <button :class="{ active: filter == 'all' }" @click="filter = 'all'">All</button>
        <button :class="{ active: filter == 'active' }" @click="filter = 'active'">Active</button>
        <button :class="{ active: filter == 'completed' }" @click="filter = 'completed'">Completed</button>
      </div>

      <div>
        <transition name="fade">
        <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed</button>
        </transition>
      </div>

    </div>
  </div>
</template>

<script>
import TodoItem from './TodoItem'
import axios from 'axios'

const baseURL = "http://localhost:8080/ToDo";

export default {
  name: 'todo-list',
  components: {
    TodoItem,
  },
  data () {
    return {
      newTodo: '',
      idForTodo: 3,
      filter: 'all',
      todos: [],
      successmessage: ''
    }
  },
  async created() {
    try
    {
        await axios.get(baseURL).then(res => this.todos = res.data)
    }
    catch(e)
    {
      console.error(e);
    }
  },
  computed: {
    remaining() {
      return this.todos.filter(todo => !todo.completed).length
    },
    anyRemaining() {
      return this.remaining != 0
    },
    todosFiltered() {
      axios.get(baseURL).then(res => this.todos = res.data)
      if (this.filter == 'all') {
        return this.todos
      } else if (this.filter == 'active') {
        return this.todos.filter(todo => !todo.completed)
      } else if (this.filter == 'completed') {
        return this.todos.filter(todo => todo.completed)
      }
      return this.todos
    },
    showClearCompletedButton() {
      return this.todos.filter(todo => todo.completed).length > 0
    }
  },
  methods: {
    async addTodo() {
      if (this.newTodo.trim().length == 0) {
        return
      }
      const res = await axios.post(baseURL, 
      {
        id: this.idForTodo,
        title: this.newTodo,
        completed: false
      });
      this.todos = [...this.todos, res.data];

      this.newTodo = ''
      this.idForTodo++
      this.successmessage = "ToDo created successfully!"
    },
    async removeTodo(id) {
      const index = this.todos.findIndex((item) => item.id == id);
      this.todos.splice(index, 1)
      await axios.delete(baseURL + "?id=" + id);
      this.successmessage = " ToDo deleted successfully!"
    },
    async checkAllTodos() {
      this.todos.forEach(function (todo) {
        todo.completed = event.target.checked;
        axios.put(baseURL, 
        {
          id: todo.id,
          title: todo.title,
          completed: todo.completed
        });
      });
      this.successmessage = " ToDo(s) updated successfully!"
    },
    clearCompleted() {
      this.todos.forEach(function (todo) {
        if(todo.completed)
        {
          axios.delete(baseURL + "?id=" + todo.id);
        }
      });
      this.todos = this.todos.filter(todo => !todo.completed)
      this.successmessage = " ToDo(s) deleted successfully!"
    },
    finishedEdit(todo) {
      axios.put(baseURL, 
      {
        id: todo.id,
        title: todo.title,
        completed: todo.completed
      });
      const index = this.todos.findIndex((item) => item.id == todo.id)
      this.todos.splice(index, 1, todo)
      this.successmessage = " ToDo updated successfully!"
    }
  }
}
</script>

<style>
  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");
  body{
    background-color: #DCDCDC;
  }
  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    &:focus {
      outline: 0;
    }
  }
  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
  }
  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    &:hover {
      color: black;
    }
  }
  .todo-item-left {
    display: flex;
    align-items: center;
  }
  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }
  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc; //override defaults
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    &:focus {
      outline: none;
    }
  }
  .completed {
    text-decoration: line-through;
    color: grey;
  }
  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgrey;
    padding-top: 14px;
    margin-bottom: 14px;
  }
  button {
    font-size: 15px;
    background-color: #F1F1F1;
    appearance: none;
    border-radius: 12px;
    padding:7px;
  }
  .active {
    background: #41B783;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .2s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .success-message{
    background-color: #dff0d8;
    color: #3c763d;
    margin-bottom: 12px;
    font-size: 16px;
    padding: 10px 16px;
    border-radius: 4px;
  }
</style>