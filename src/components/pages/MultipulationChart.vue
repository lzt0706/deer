<template>
  <div class="m-container">
    <div class="m-card">
      <div class="m-card-top">
        <span class="x">x</span>
        <span class="line"></span>
        <span class="x">x</span>
      </div>
      <h1>九九乘法表</h1>
      <span>Multipulation Chart</span>
      <div class="m-card-bottom">
        <span class="x">x</span>
        <span class="line"></span>
        <span class="x">x</span>
      </div>
    </div>
    <div id="multipulationChart" v-html="card"></div>
  </div>
</template>

<style scoped>
.m-container {
  width: 1200px;
  height: 1200px;
  padding: 60px 60px;
  box-sizing: border-box;
  background-color: #edf2ef;
  color: #2eb738;
  font-family: "微軟正黑體";
}
.m-card {
  width: 300px;
  height: 300px;
  float: left;
  margin-right: 30px;
  margin-bottom: 30px;
}
.m-card h1,
.m-card > span {
  display: block;
  text-align: center;
  text-transform: uppercase;
}
.line {
  display: inline-block;
  width: 200px;
  height: 1px;
  background-color: #2eb738;
  margin-bottom: 3px;
}
.m-card-top {
  margin-left: 40px;
  margin-bottom: 84px;
}
.m-card-bottom {
  margin-left: 40px;
  margin-top: 84px;
}
</style>

<script>
export default {
  data() {
    return {
      card: ``,
    };
  },
  methods: {
    cardBuild() {
      const vm = this;
      let card = "";

      for (let i = 2; i <= 9; i++) {
        let card1to3 = "";
        let card4to9 = "";
        for (let j = 1; j <= 3; j++) {
          card1to3 += `<li>${i} x ${j}</li>`;
        }
        for (let k = 4; k <= 9; k++) {
          card4to9 += `<li>${i} x ${k}</li>`;
        }
        card += `
        <div class="m-card">
          <div>${i}</div>
          <ul>
            ${card1to3}
          </ul>
          <ul>
            ${card4to9}
          </ul>
        </div>
        `;
      }
      vm.card = card;
    }
  },
  created() {
    this.cardBuild();
  }
};
</script>