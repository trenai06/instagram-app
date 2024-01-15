<script setup>

</script>

<template>
    <div id="footer">
        <div>
           <RouterLink to="/feed"> <img class="home" src="https://icons.veryicon.com/png/o/miscellaneous/advanceico/home-275.png" alt=" home"></RouterLink>
        </div>
        <div>
            <RouterLink to="/post"> <img class="more" src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-vector-plus-icon-png-image_3989579.jpg" alt="add a post icon"></RouterLink>
        </div>
        <div>
            <img class="profile-pic" src="https://i.pinimg.com/564x/68/5c/09/685c09e2506fa64a143081854c9b77f8.jpg" alt="profile pic">
        </div>

    </div>

</template>

<style scoped>


 img{
    height: 50px; 
    width:50px;
 }

 #footer{
    display:flex; 
    justify-content: center;
    justify-content: space-between;
    align-items: center;
    background-color:rgba(169, 169, 169, 0.41);
    height:50px;
    padding:10px;
    
 }

 .profile-pic{
    border-radius: 50px;
    
 }
 .more{
    border: solid black 5px;
    border-radius: 20px;
   
 }

 .home{
    background-color: white;
    border-radius: 10px;
 }

 

</style>