<script setup>
// import router from "@/router";
import { ref, reactive } from "vue";
// import { RouterLink } from "vue-router";
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";

// let posts = reactive([]);
let posts = ref([]);


fetch("http://localhost:3000/posts", {
  headers: {
    Authorization:
      document.cookie,
  },
  
})
  .then((response) => {
    let info = response.json();
    return info;
  })

  .then((info) => {
    // posts.push(...info)
    posts.value.push(...info) 
    console.log(posts);
  })
  .catch((error) => {
    if (error) {
      console.log(error);
    }
  });
</script>

<template>
  <div class="container">
    <Header></Header>
    <div class="another">
    <div class="post-container" v-for="post in posts">
        <div class="post">
            <div class="card-header">
              <img class="poster">
                <p> {{ post.username }}</p>
            </div>
        <div class="card-image-container">
            <img :src=post.image alt="image">
        </div>
            <div class="card-footer">
              <div class="likes-container">
                    <p> Likes: {{ post.likes.length }}</p>
                </div>
                <div class="caption-container">
                    <p class="username">{{post.username}}</p> <p>{{ post.caption }}</p>
                </div>     
            </div>
        </div>
    </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<style scoped>
.container{
  display:flex;
  flex-direction: column;
  row-gap:20px;
  background-color: black;
  width:100vw;
}
.another{
  display: flex;
  flex-direction: column;
  width:100vw;
  align-items: center; 
}
.post-container {
  display: flex;
  flex-direction: column;
  row-gap: 10px;
  border:solid 2px white;
  width: 700px;
  height: 500px;
  background-color: darkgrey;
  align-items: center;
}
.post{
  height:450px;
}

.card-header{ 
  font-size: 30px;
  font-weight: bold;
  display:flex;
  column-gap: 20px;
}

.poster{
  height:50px;
  width: 50px;
}

img {
  height: 300px;
  width: 400px;
}
.caption-container{
  font-size: 20px;
  display: flex;
  column-gap: 20px;
}
.username{
  color:lightgray;
}

.likes-container{
  font-size: 15px;
}


</style>
