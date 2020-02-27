<template>
  <div class="board container-fluid background">
    <Nav />
    <div class="row">
      <div class="col-md-6 mx-auto">
        <div class="board-container p-3">
          <h1 class="board-title">{{ board.title.toUpperCase() }}</h1>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="row">
          <div class="col-12 col-sm-4 col-lg-3" v-for="list in lists" :key="list.id">
            <list-component :listData="list" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Nav from "@/components/Nav.vue";
import ListComponent from "@/components/List";
export default {
  name: "board",
  props: ["boardId"],
  mounted() {
    this.$store.dispatch("getBoards");
    this.$store.dispatch("getListsByBoardId", this.boardId);
  },
  computed: {
    board() {
      return (
        //FIXME This does not work on page reload because the boards array is empty in the store
        this.$store.state.boards.find(b => b._id == this.boardId) || {
          title: "Loading..."
        }
      );
    },
    lists() {
      return this.$store.state.lists;
    }
  },
  data() {
    return {
      newList: {
        title: "",
        boardId: this.boardId
      }
    };
  },
  components: {
    ListComponent,
    Nav
  }
};
</script>

<style scoped>
.board {
  min-height: 100vh;
}
.background {
  background: url("https://images.unsplash.com/photo-1517757910079-f57fd7f49a91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=748&q=80")
    no-repeat center center fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 663px;
}
.board-container {
  background: url("https://www.pngkit.com/png/full/10-108133_wood-png-transparent-image-png-arts-rustic-board.png")
    no-repeat bottom;
  background-size: cover;
}
.board-title {
  color: wheat;
  font-family: "Montserrat";
  font-weight: bold;
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb,
    0 5px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
