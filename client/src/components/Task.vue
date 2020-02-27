<template>
  <div class="task p-2 border" :id="taskData.id">
    <i class="pin"></i>
    <div class="text-right">
      <div class="dropdown">
        <button class="dropbtn">
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-content text-left">
          <a href="#">Edit Task</a>
          <a href="#" @click="deleteTask(taskData.id)">Delete Task</a>
          <div class="sub-dropdown w-100">
            <a class="sub-dropbtn">Move To</a>
            <div class="sub-dropdown-content">
              <a
                href="#"
                v-for="list in lists"
                :key="list.id"
                @click="updateListId(list.id)"
              >{{ list.title }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="text-center">
      <h5>{{ taskData.description }}</h5>
    </div>

    <form @submit.prevent="addComment()">
      <div class="d-flex">
        <div class="form-group mb-0">
          <input
            v-model="newComment.content"
            type="text"
            class="form-control"
            placeholder="Comment"
            required
          />
        </div>
        <button class="btn btn-warning">
          <i class="fa fa-plus"></i>
        </button>
      </div>
    </form>
    <div
      v-for="comment in taskData.comments"
      :key="comment.id"
      class="d-flex justify-content-between mb-4 mt-4"
    >
      <p>{{ comment.content }}</p>
      <div class="dropdown">
        <button
          class="btn p-0"
          type="button"
          id="dropdownMenuButton"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          <i class="fas fa-ellipsis-h"></i>
        </button>
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <button class="dropdown-item">Edit</button>
          <button class="dropdown-item" @click="deleteComment(comment)">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Task",
  props: ["taskData"],
  data() {
    return {
      newComment: {
        content: "",
        taskId: this.taskData.id
      }
    };
  },
  methods: {
    addComment() {
      let comment = { ...this.newComment };
      this.$store.dispatch("addComment", comment);
      console.log("comment", comment);
      this.newComment = {
        content: "",
        taskId: this.taskData.id
      };
    },
    deleteTask(id) {
      this.$store.dispatch("deleteTask", id);
    },
    deleteComment(comment) {
      let newComment = { ...comment, taskId: this.taskData.id };
      this.$store.dispatch("deleteComment", newComment);
    },
    updateListId(id) {
      this.taskData.listId = id;
      this.$store.dispatch("editTask", this.taskData);
    }
  },
  computed: {
    lists() {
      return this.$store.state.lists;
    }
  }
};
</script>

<style>
.task {
  background-color: #ffc;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  min-height: 10em;
}
#dropdownMenuButton {
  background-color: transparent;
}
.dropbtn,
.sub-dropbtn {
  background-color: transparent;
  cursor: pointer;
  border: none;
}
.dropdown,
.sub-dropdown {
  position: relative;
  display: inline-block;
}
.dropdown-content,
.sub-dropdown-content {
  border-radius: 10px;
  display: none;
  position: absolute;
  background-color: #d5dfff;
  min-width: 8em;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 2;
  right: 35%;
}
.sub-dropdown-content {
  right: 65%;
}
.dropdown-content a,
.sub-dropdown-content a {
  color: black;
  padding: 0.7em 0.9em;
  text-decoration: none;
  display: block;
}
.dropdown-content a:hover,
.sub-dropdown-content a:hover {
  background-color: #e1e5f5;
}
.dropdown:hover .dropdown-content,
.sub-dropdown:hover .sub-dropdown-content {
  display: block;
}
.dropdown:hover .dropbtn,
.sub-dropdown:hover .sub-dropbtn {
  background-color: #e1e5f5;
}

.pin {
  background-color: #aaa;
  display: block;
  height: 14px;
  width: 2px;
  position: absolute;
  left: 50%;
  top: -1px;
  z-index: 1;
}

.pin:after {
  background-color: #a31;
  background-image: radial-gradient(
    25% 25%,
    circle,
    hsla(0, 0%, 100%, 0.3),
    hsla(0, 0%, 0%, 0.3)
  );
  border-radius: 50%;
  box-shadow: inset 0 0 0 1px hsla(0, 0%, 0%, 0.1),
    inset 3px 3px 3px hsla(0, 0%, 100%, 0.2),
    inset -3px -3px 3px hsla(0, 0%, 0%, 0.2),
    13px 12px 3px hsla(0, 0%, 0%, 0.15);
  content: "";
  height: 12px;
  left: -5px;
  position: absolute;
  top: -12px;
  width: 12px;
}

.pin:before {
  background-color: hsla(0, 0%, 0%, 0.1);
  box-shadow: 0 0 0.25em hsla(0, 0%, 0%, 0.1);
  content: "";

  height: 18px;
  width: 2px;
  left: 0;
  position: absolute;
  top: 4px;

  transform: rotate(40.5deg);
  -moz-transform: rotate(40.5deg);
  -webkit-transform: rotate(40.5deg);
  -o-transform: rotate(40.5deg);
  -ms-transform: rotate(40.5deg);

  transform-origin: 35% 100%;
  -moz-transform-origin: 35% 100%;
  -webkit-transform-origin: 35% 100%;
  -ms-transform-origin: 35% 100%;
  -o-transform-origin: 35% 100%;
}
</style>
