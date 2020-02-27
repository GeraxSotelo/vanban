<template>
  <div class="boards container-fluid boardback">
    <Nav />
    <!-- <form @submit.prevent="addBoard">
      <input type="text" placeholder="title" v-model="newBoard.title" required />
      <input type="text" placeholder="description" v-model="newBoard.description" />
      <button type="submit">Create Board</button>
    </form>-->
    <div class="row justify-content-around mt-5">
      <div class="col-sm-3" v-for="board in boards" :key="board._id">
        <div class="card m-3">
          <div class="card-body">
            <router-link :to="{ name: 'board', params: { boardId: board._id } }">
              <div>
                <h3 class="card-title">{{ board.title }}</h3>
                <p class="card-text">{{ board.description }}</p>
              </div>
            </router-link>
            <button class="btn btn-danger delete-btn" @click="deleteBoard(board._id)">Delete Board</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
import Nav from "@/components/Nav.vue";
export default {
  name: "boards",
  mounted() {
    this.$store.dispatch("resetLists");
    this.$store.dispatch("getBoards");
  },
  data() {
    return {
      newBoard: {
        title: "",
        description: ""
      }
    };
  },
  computed: {
    boards() {
      return this.$store.state.boards;
    }
  },
  methods: {
    deleteBoard(id) {
      this.$store.dispatch("deleteBoard", id);
    }
  },
  components: {
    Nav
  }
};
</script>

<style>
a:hover {
  text-decoration: none;
}
.card {
  background: url("https://images.unsplash.com/photo-1472289065668-ce650ac443d2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80")
    no-repeat;
  border-radius: 15px;
  box-shadow: 5px 5px 20px -5px;
  font-family: "Montserrat", sans-serif;
  font-weight: bold;
  min-height: 10em;
}
.boardback {
  background: url("https://images.unsplash.com/photo-1558051815-0f18e64e6280?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=749&q=80")
    no-repeat center center fixed;
  background-size: cover;
  min-height: 663px;
}
.delete-btn {
  position: absolute;
  right: 50%;
  bottom: -10%;
  transform: translateX(50%);
}
</style>
