  
<template>
  <div class="container-fluid login background">
    <div class="row p-0 justify-content-center">
      <div class="col-md-4">
        <!-- NOTE Top of Login Form -->
        <form
          v-if="loginForm"
          @submit.prevent="loginUser"
          class="text-center border border-light rounded p-5 form bg-light"
        >
          <p class="h4 mb-4 text-dark">
            <img alt="Vue logo" class="img" src="../assets/logo.png" />anban Sign in
          </p>
          <input
            type="email"
            v-model="creds.email"
            id="defaultLoginFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />
          <input
            type="password"
            v-model="creds.password"
            id="defaultLoginFormPassword"
            class="form-control mb-4"
            placeholder="Password"
          />
          <button class="btn btn-success btn-block my-4" type="submit">Sign in</button>

          <p class="text-dark">or sign in with:</p>

          <a href="https://www.facebook.com" class="mx-2" role="button">
            <i class="fab fa-facebook-f text-primary"></i>
          </a>
          <a href="https://www.twitter.com" class="mx-2" role="button">
            <i class="fab fa-twitter text-primary"></i>
          </a>
          <a href="https://www.linkedin.com" class="mx-2" role="button">
            <i class="fab fa-linkedin-in text-primary"></i>
          </a>
          <a href="https://www.github.com" class="mx-2" role="button">
            <i class="fab fa-github text-dark"></i>
          </a>
        </form>
        <!-- NOTE Bottom of Login Form -->
        <!-- NOTE Top of the Registration Form -->
        <form
          v-else
          @submit.prevent="register"
          class="text-center border border-light rounded bg-light p-5 second regform"
        >
          <p class="h4 mb-4">
            Register With
            <img alt="Vue logo" class="img" src="../assets/logo.png" />anban Today!
          </p>
          <div class="form-row mb-4">
            <div class="col">
              <input
                type="text"
                v-model="newUser.name"
                id="defaultRegisterFormFirstName"
                class="form-control"
                placeholder="UserName"
              />
            </div>
          </div>
          <input
            type="email"
            v-model="newUser.email"
            id="defaultRegisterFormEmail"
            class="form-control mb-4"
            placeholder="E-mail"
          />
          <input
            type="password"
            v-model="newUser.password"
            id="defaultRegisterFormPassword"
            class="form-control"
            placeholder="Password"
          />
          <small
            id="defaultRegisterFormPasswordHelpBlock"
            class="form-text text-dark mb-4"
          >At least 7 characters in length</small>
          <button class="btn btn-warning my-4 btn-block" type="submit">Register</button>
          <p class="text-dark">or sign in with:</p>

          <a href="https://www.facebook.com" class="mx-2" role="button">
            <i class="fab fa-facebook-f text-primary"></i>
          </a>
          <a href="https://www.twitter.com" class="mx-2" role="button">
            <i class="fab fa-twitter text-primary"></i>
          </a>
          <a href="https://www.linkedin.com" class="mx-2" role="button">
            <i class="fab fa-linkedin-in text-primary"></i>
          </a>
          <a href="https://www.github.com" class="mx-2" role="button">
            <i class="fab fa-github text-dark"></i>
          </a>
        </form>
        <div class="action mt-4" @click="loginForm = !loginForm">
          <p v-if="loginForm" class="text-white">
            No account? Click here to
            <span class="registration">Register</span>
          </p>
          <p v-else class="text-white">
            Already have an account? Click here to
            <span class="registration">Login</span>
          </p>
        </div>
      </div>
    </div>
    <!-- NOTE Bottom of the Registration Form -->
  </div>
</template>

<script>
import router from "@/router/index.js";
export default {
  name: "login",
  data() {
    return {
      loginForm: true,
      creds: {
        email: "",
        password: ""
      },
      newUser: {
        email: "",
        password: "",
        name: ""
      }
    };
  },
  beforeCreate() {
    if (this.$store.state.user._id) {
      this.$router.push({ name: "boards" });
    }
  },
  methods: {
    register() {
      this.$store.dispatch("register", this.newUser);
    },
    loginUser() {
      this.$store.dispatch("login", this.creds);
    }
  }
};
</script>

<style scoped>
.action {
  cursor: pointer;
}
.background {
  background: url("https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=787&q=80")
    no-repeat center center fixed;
  background-size: cover;
  background-repeat: no-repeat;
  min-height: 100vh;
}
.form {
  margin-top: 100px;
}
.img {
  height: 1.2em;
}
.regform {
  margin-top: 50px;
}
</style>