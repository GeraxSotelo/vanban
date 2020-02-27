<template>
  <div class="container-fluid p-0">
    <div class="row">
      <div class="col-md-12 pl-0 pr-0">
        <nav class="navbar navbar-expand-lg navbar-light bg-transparent">
          <div>
            <p class="navbar-brand m-0 bg-light rounded pl-2 pr-2">
              <i class="fas fa-edit mr-2"></i>
              <router-link to="/">
                <img alt="Vue logo" class="img" src="../assets/logo.png" />
                <span class="text-dark">anban</span>
              </router-link>
            </p>
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mr-3">
              <!-- NOTE Adding new buttons on one component -->
              <div v-if="this.$route.name == `boards`">
                <button class="btn btn-primary mr-3" @click="addBoard">Create Board</button>
              </div>
              <div v-else-if="this.$route.name == `board`">
                <button class="btn create-btn mr-3" @click="addList">Create List</button>
              </div>
              <li>
                <button class="btn logout-btn ml-4" @click="logout">Logout</button>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import NotificationService from "../NotificationService.js";
// File name
export default {
  name: "Nav",
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    async addBoard() {
      let boardInfo = await NotificationService.inputData("Create A New Board");
      if (boardInfo) {
        this.$store.dispatch("addBoard", boardInfo);
        this.newBoard = { title: "", description: "" };
      }
    },
    async addList() {
      console.log(this.$route.params.boardId);
      let listInfo = await NotificationService.inputList("Create A New List");
      if (listInfo) {
        this.$store.dispatch("addList", {
          title: listInfo,
          boardId: this.$route.params.boardId
        });
        this.newList = { title: "" };
      }
    }
  }
};
</script>

<style scoped>
.img {
  height: 1.2em;
}
.create-btn {
  background-color: #a6ffbb;
  border-color: #a6ffbb;
}
.logout-btn {
  color: #fff;
  background-color: #f55e6e;
  border-color: #f55e6e;
}
</style>
