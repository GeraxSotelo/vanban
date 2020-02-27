<template>
  <div class="list border p-2">
    <div class="text-right">
      <button class="btn border trash-btn" @click="deleteList(listData.id)">
        <i class="fas fa-trash-alt"></i>
      </button>
    </div>
    <h4>{{ listData.title }}</h4>
    <div>
      <form @submit.prevent="addTask()">
        <div class="form-group">
          <input
            v-model="newTask.description"
            type="text"
            class="form-control"
            placeholder="Task"
            required
          />
        </div>
        <button class="btn btn-success mb-1">Add Task</button>
      </form>
    </div>
    <div>
      <div class="row">
        <div
          class="task-container col-12 pb-1 pt-1 mt-2 mb-2"
          v-for="task in tasks"
          :key="task.id"
          :id="listData.id"
        >
          <task-component class="task" :taskData="task" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TaskComponent from "@/components/Task";
export default {
  name: "List",
  props: ["listData"],
  mounted() {
    this.$store.dispatch("getTasks");
  },
  data() {
    return {
      newTask: {
        description: "",
        boardId: this.listData.boardId,
        listId: this.listData.id
      }
    };
  },
  computed: {
    tasks() {
      return this.$store.state.tasks.filter(t => t.listId == this.listData.id);
      // NOTE DICTIONARY EXAMPLE
      // return this.$store.state.tasks[list.id];
    }
  },
  methods: {
    deleteList(id) {
      this.$store.dispatch("deleteList", {
        id,
        boardId: this.listData.boardId
      });
    },
    addTask() {
      let task = { ...this.newTask };
      this.$store.dispatch("addTask", task);
      this.newTask = {
        description: "",
        boardId: this.listData.boardId,
        listId: this.listData.id
      };
    }
  },
  components: {
    TaskComponent
  }
};
</script>

<style scoped>
.list {
  background-color: aliceblue;
  padding-bottom: 8em;
}
.trash-btn {
  background-color: #ffc;
  box-shadow: 1px 2px 3px black;
  font-size: 0.8em;
  padding: 0.1em 0.3em;
}
.task-container:nth-child(even) {
  -o-transform: rotate(2deg);
  -webkit-transform: rotate(2deg);
  -moz-transform: rotate(2deg);
  top: 2px;
}
.task-container:nth-child(odd) {
  -o-transform: rotate(-2deg);
  -webkit-transform: rotate(-2deg);
  -moz-transform: rotate(-2deg);
  top: -2px;
}
</style>
