<template>
  <div class="m-container">
    <div class="m-card">
      <div class="m-card-top">
        <span class="xl">x</span>
        <span class="line"></span>
        <span class="xr">x</span>
      </div>
      <h1>九九乘法表</h1>
      <span>Multipulation Chart</span>
      <div class="m-card-bottom">
        <span class="xl">x</span>
        <span class="line"></span>
        <span class="xr">x</span>
      </div>
    </div>
    <div class="m-card m-card-r" v-for="item in 8" :key="item">
      <div class="numBox">{{item+1}}</div>
      <ul class="m-left">
        <li class="m-list" v-for="num in 3" :key="num">{{item+1}} x {{num}} = {{(item+1)*num}}</li>
      </ul>
      <ul class="m-right">
        <li class="m-list" v-for="num in 6" :key="num">{{item+1}} x {{num+3}} = {{(item+1)*(num+3)}}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.m-container {
  width: 1200px;
  height: 1200px;
  padding: 60px;
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
  position: relative;
}
.m-card-r {
  background-color: white;
  box-shadow: 0 3px 10px #d8d8d8;
  border-radius: 100px 0px 30px 0px;
}
.m-card h1,
.m-card > span {
  display: block;
  text-align: center;
  text-transform: uppercase;
}
.m-card > h1 {
  font-size: 48px;
}

.m-card > span {
  font-size: 20px;
}
.line {
  display: inline-block;
  width: 240px;
  height: 1px;
  background-color: #2eb738;
  margin-bottom: 4px;
}
.xl {
  margin-right: 15px;
}

.xr {
  margin-left: 15px;
}
.m-card-top {
  margin-bottom: 82px;
}
.m-card-bottom {
  margin-top: 82px;
}
.numBox {
  font-size: 100px;
  width: 150px;
  height: 150px;
  text-align: center;
  font-weight: bold;
  text-shadow: 4px 3px 0px #f0f0f0;
}
.m-list {
  list-style: none;
  margin-bottom: 5px;
}
.m-left {
  font-size: 24px;
  position: absolute;
  left: 30px;
  bottom: 30px;
  margin: 0;
  padding: 0;
}
.m-right {
  font-size: 24px;
  position: absolute;
  right: 30px;
  bottom: 30px;
  margin: 0;
  padding: 0;
}
</style>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>