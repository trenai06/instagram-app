<script setup>

</script>

<template>
    <div id="header">
        <img class="logo" src="/src/assets/photos/instagram-logo.png" alt="logo">
        <h1>INSTAGRAM</h1>
        <img class="notification" src="/src/assets/photos/notification.png" alt="notification logo">
    </div>
</template>

<style scoped>
#header{
    background-color: rgba(169, 169, 169, 0.41);
    color: black;
    height:60px;
    padding: 10px;
    display:flex; 
    flex-direction:row;
    justify-content: center;
    align-items: center;
    justify-content: space-between;
}

.logo{
    height:70px; 
    width:80px;
}

.notification{
    height: 50px;
    width: 50px;
}


</style>