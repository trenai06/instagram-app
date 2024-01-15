<script setup>
import router from "@/router";
import { ref } from "vue";
import { RouterLink } from 'vue-router';
let email = ref('')
let username = ref('')
let password = ref('')

function registerUser() {
    const reqBody = {
        email: email.value,
        username: username.value,
        password: password.value
    }; 
    
    fetch("http://localhost:3000/newuser", {
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(reqBody),
        method: "POST",
    })
    .then((response) => {
        let info = response.json();
        if(response.status === 201){
            alert("Account created. Please login with your email and password to continue!")
            router.push("/")
        return info;
        } else {
            alert("Something went wrong! Please try again!")
        }
    })
    .then((info) => {
        console.log(info);  
    })
    .catch((error) => {
        console.log(error)
    })
}
</script>

<template>
    <div class="container">
        <div class="logo">
            <img src="/src/assets/photos/instagram-logo.png" alt="instagram logo">
            <h1>Instagram</h1>
        </div>
        <div class="form">
            <div><h1 class="register">Register</h1></div>
            <div class="input">
                <label for="email">Email</label>
                <input type="text" id="email" v-model="email">
            </div>
            <div class="input">
                <label for="username">Username</label>
                <input type="text" id="username" v-model="username">
            </div>
            <div class="input">
                <label for="password">Password</label>
                <input type="text" id="password" v-model="password">
            </div>
        </div>

        <div class="buttons">
            <button @click="registerUser">Register</button>
            <button><RouterLink to="/">Cancel</RouterLink></button>
        </div>
    </div>
</template>

<style scoped>
.container{
    background-color: black;
    display:flex;
    flex-direction: column;
    width:100vw;
    height:100vh;
    justify-content: space-evenly;
    align-items: center;
    color:white;
}

.logo {
  border: solid 5px white;
  border-radius: 50%;
  width: 400px;
  height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 255, 0.826);
  color: black;
  font-size: 30px;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding: 20px;
}

img{
    height: 100px;
    width: 100px;
}

.form{
    display:flex;
    flex-direction: column;
    row-gap: 20px;
    align-items: center;
    width: 500px;
    height:400px;
}

.register{
    font-size:60px;
}

.input{
    display:flex;
    column-gap: 20px;
    font-size: 30px;
}

input{
    height:40px;
    width: 200px;
    border-radius: 10px;
}

#email{
    width:250px;
}

#password{
    width: 210px;
}
.buttons{
    display:flex;
    column-gap: 20px;
}

button{
    background-color: black;
    color: white;
    height: 50px;
    width: 150px;
    border-radius: 20px;
    font-size: 30px;  
}

</style>