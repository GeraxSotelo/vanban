import Vue from "vue";
import Vuex from "vuex";
import Axios from "axios";
import router from "../router/index";
import AuthService from "../AuthService";

Vue.use(Vuex);

//Allows axios to work locally or live
let base = window.location.host.includes("localhost:8080")
  ? "//localhost:3000/"
  : "/";

let api = Axios.create({
  baseURL: base + "api/",
  timeout: 3000,
  withCredentials: true
});

export default new Vuex.Store({
  state: {
    user: {},
    boards: [],
    lists: [],
    activeBoard: {},
    // NOTE DICTIONARY EXAMPLE
    // tasks:
    tasks: []
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setBoards(state, boards) {
      state.boards = boards;
    },
    setLists(state, lists) {
      state.lists = lists;
    },
    setTasks(state, tasks) {
      state.tasks = tasks;
    },
    resetState(state) {
      (state.user = {}),
        (state.boards = []),
        (state.lists = []),
        (state.activeBoard = {}),
        // NOTE DICTIONARY EXAMPLE
        (state.tasks = []);
    },
    // NOTE DICTIONARY EXAMPLE
    setTaskByList(state, listId, task) {
      Vue.set(state.tasks, listId, task);
    },
    setListsByBoard(state, lists) {
      state.lists = lists;
    },
    resetLists(state, lists) {
      state.lists = [];
    }
  },
  actions: {
    //#region -- AUTH STUFF --
    async register({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Register(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async login({ commit, dispatch }, creds) {
      try {
        let user = await AuthService.Login(creds);
        commit("setUser", user);
        router.push({ name: "boards" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    async logout({ commit, dispatch }) {
      try {
        let success = await AuthService.Logout();
        if (!success) {
        }
        commit("resetState");
        router.push({ name: "login" });
      } catch (e) {
        console.warn(e.message);
      }
    },
    //#endregion

    //#region -- BOARDS --
    getBoards({ commit, dispatch }) {
      api.get("boards").then(res => {
        commit("setBoards", res.data);
      });
    },
    addBoard({ commit, dispatch }, boardData) {
      api.post("boards", boardData).then(serverBoard => {
        dispatch("getBoards");
      });
    },

    deleteBoard({ commit, dispatch }, id) {
      api.delete("boards/" + id).then(serverBoard => {
        dispatch("getBoards");
      });
    },
    //#endregion

    //#region -- LISTS --
    getLists({ commit, dispatch }) {
      api.get("lists").then(res => {
        commit("setLists", res.data);
      });
    },
    resetLists({ commit, dispatch }) {
      commit("resetLists");
    },
    getListsByBoardId({ commit, dispatch }, id) {
      api.get("boards/" + id + "/lists").then(res => {
        commit("setListsByBoard", res.data);
      });
    },
    // NOTE DICTIONARY EXAMPLE
    getTasksByList({ commit, dispatch }, id) {
      api.get("tasks/" + id).then(res => {
        commit("setTaskByList", res.data);
      });
    },

    addList({ commit, dispatch }, listData) {
      api.post("lists", listData).then(serverList => {
        dispatch("getListsByBoardId", listData.boardId);
      });
    },
    deleteList({ commit, dispatch }, payload) {
      api.delete("lists/" + payload.id).then(serverList => {
        dispatch("getListsByBoardId", payload.boardId);
      });
    },

    getTasks({ commit, dispatch }) {
      api.get("tasks").then(res => {
        commit("setTasks", res.data);
      });
    },

    addTask({ commit, dispatch }, taskData) {
      api.post("/tasks", taskData).then(serverTask => {
        dispatch("getTasks");
      });
    },

    addComment({ commit, dispatch }, comment) {
      api
        .put("tasks/" + comment.taskId + "/acomments", comment)
        .then(serverTask => {
          console.log(serverTask);
          dispatch("getTasks");
        });
    },
    deleteTask({ commit, dispatch }, id) {
      api.delete("tasks/" + id).then(serverTask => {
        dispatch("getTasks");
      });
    },
    deleteComment({ commit, dispatch }, comment) {
      api.put("/tasks/" + comment.taskId + "/dcomments", comment).then(res => {
        dispatch("getTasks");
      });
    },
    editTask({ commit, dispatch }, task) {
      api.put("/tasks/" + task.id, task).then(res => {
        dispatch("getTasks");
      });
    }

    //#endregion
  }
});
