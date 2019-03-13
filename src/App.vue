<template>
  <div id="app">
    <!-- <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">Navbar</a>
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
      </button> -->

      <!-- <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link class="nav-link" :to="{name : '首頁'}">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/page">Page</router-link>
          </li>
        </ul>
      </div> -->
    <!-- </nav> -->

    
    <!-- <HelloWorld/> -->
    <!-- <router-view name="menu"></router-view> -->
      <!-- <img src="./assets/logo.png"> -->
      <router-view></router-view>
  </div>
</template>
  
<script>
// import HelloWorld from "./components/HelloWorld"; 

export default {
  name: "App",
};
</script>
  
<style lang="scss">
@import "./assets/all";
</style>

