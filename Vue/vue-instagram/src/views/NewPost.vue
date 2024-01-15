<script setup>
import Header from "../components/Header.vue";
import Footer from "../components/Footer.vue";
import { ref } from "vue";
import router from "@/router";

let imageURL = ref("");
let caption = ref("")

function createPost(){
    const reqBody = {
        "image": imageURL.value,
        "caption": caption.value
    }

fetch("http://localhost:3000/createpost", {
    headers:{ "Content-Type": "application/json", "Authorization": document.cookie},
    body:JSON.stringify(reqBody),
    method: "POST"
})

.then((response) => {
    if(response.status === 200){
        alert("Post Successful!")
        router.push('/feed')
    } else {
        alert("Something went wrong. Please try again.")
    }
})

.catch((error) => {
    console.log(error)
})
}
</script>

<template>
    <div class="container">
        <Header></Header>
        <div class="post-container">
            <div class="form">
                <h1>Post Preview</h1>
                <div class="image">
                    <label for="image-input">Image URL</label>
                    <input v-model="imageURL" type="text" id="image-input">
                </div>
                <img :src=imageURL>
                <div class="caption">
                    <label for="caption">Caption</label>
                    <input v-model="caption" type="text" id="caption">
                </div>
            </div>
            <button @click="createPost">Post</button>
        </div>
        <Footer></Footer>
    </div>
</template>

<style scoped>
.container{
    display:flex;
    flex-direction:column;
    height:100vh; 
    width:100vw;
    row-gap: 10px;
    background-color: black;
    color:white;
}

.post-container{
display:flex;
flex-direction: column;
align-items: center;
row-gap: 40px;
}

.form{
    display:flex;
    flex-direction: column;
    row-gap: 20px;
    font-size: 25px;
    width: 700px;
    align-items: center;
}

.image{
    display:flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

#image-input{
    width: 500px;
    height: 30px;
}

img{
    border:solid 2px black;
    border-radius: 10px;
    height: 300px;
    width: 350px;
}

.caption{
    display:flex;
    flex-direction: column;
    row-gap: 10px;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
}

#caption{
    width: 500px;
    height:30px;
}

button{
    height:50px;
    width: 250px;
    font-size:40px;
    border-radius: 10px;
    background-color: black;
    color: white;
}


</style>