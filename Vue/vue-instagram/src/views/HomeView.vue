<script setup>
import router from "@/router";
import { ref } from "vue";
import { RouterLink } from "vue-router";
let email = ref("");
let password = ref("");

function login() {
  const reqBody = {
    email: email.value,
    password: password.value,
  };

  fetch("http://localhost:3000/login", {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(reqBody),
    method: "POST",
  })
    .then((response) => {
      let info = response.json();
      return info;
    })
    .then((info) => {
      console.log(info);
      document.cookie = info
      router.push("/feed")
      console.log(document.cookie)
    })
    .catch((error) => {
      console.log(error);
    });
}
</script>

<template>
  <div class="container">
    <div class="logo">
      <img src="/src/assets/photos/instagram-logo.png" alt="instagram logo">
      <h1>Instagram</h1>
    </div>

  <div class="form">
    <div class="email">
      <label for="email">Email</label>
      <input type="textbox" id="email" v-model="email" />
    </div>
    <div class="password">
      <label for="password"> Password</label>
      <input type="textbox" id="password" v-model="password" />
    </div>
  </div>

    <div class="buttons">
      <button @click="login">Login</button>
      <button ><RouterLink to="/register">Register</RouterLink></button>
    </div>
  </div>
</template>

<style scoped>
.container {
  background-color: black;
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  row-gap: 40px;
  justify-content: center;
  align-items: center;
  color: white;
}

.logo {
  border: solid 10px white;
  border-radius: 50%;
  width: 400px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 255, 0.826);
  color: black;
  font-size: 30px;
  font-family:'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding:20px;
}

img{
    height: 100px;
    width: 100px;
}

.form{
  display:flex;
  flex-direction: column;
  row-gap: 20px;
  font-size: 30px;
}

input {
  width: 300px;
  height: 30px;
  border-radius: 10px;
}

.email {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
}

.password {
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 10px;
}

.buttons {
  display: flex;
  column-gap: 20px;
}

button {
  background-color: black;
  color:white;
  border: solid 5px white;
  width: 150px;
  height: 50px;
  border-radius: 20px;
  font-size: 30px;
}
</style>
