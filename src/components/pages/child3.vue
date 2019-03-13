<template>
  <div>
        <img :src="user.picture.large" class="card-img-top" alt="...">
        <div class="card-body">
            <h5 class="card-title">Card 3</h5>
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <a href="#" class="btn btn-primary">Go somewhere</a>
        </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      user: {
        picture: {},
      }
    }
  },
  created() {
      // console.log(this.$route.params.id);
      var vm = this;
      // const id = this.$route.params.id;
      this.$http.get('https://randomuser.me/api/').then((response) => {
          console.log(response);
          vm.user = response.data.results[0];
      });
  },
}
</script>


