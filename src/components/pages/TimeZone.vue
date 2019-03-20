<template>
  <div>
    <div class="container">
      <h1 class="mt-3">WORLD CLOCK</h1>
      <ul class>
        <li v-for="(item, i) in newTimeZone" :key="i" :class="{isNight : i==0 || i==4}">
          <div class="zone">
            <h2>{{timeZoneArray[i].split('/')[1].replace('_',' ')}}</h2>
            <span>{{item[0]}} {{item[1]}}. {{item[2]}}</span>
          </div>
          <div class="time">{{item[3]}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.container {
  width: 540px !important;
}
h1 {
  font-size: 72px;
  font-weight: bold;
  text-align: center;
  border-top: 15px solid #000000;
  border-bottom: 15px solid #000000;
}
h2 {
  font-weight: bold;
  margin: 0;
  font-size: 36px;
}
ul {
  padding: 0;
  border-left: 2px solid #000;
  border-top: 2px solid #000;
  border-right: 2px solid #000;
}
li {
  list-style: none;
  border-bottom: 2px solid #000;
  display: flex;
  justify-content: space-between;
  /* font-size: 72px; */
  font-weight: bold;
  padding: 0px 35px;
}
.time {
  font-size: 72px;
}
.zone {
  margin-top: 25px;
}
span {
  font-style: italic;
}
.isNight {
  background-color: black;
  color: white;
}
</style>

<script>
export default {
  data() {
    return {
      timeZoneArray: [
        "America/New_York",
        "Europe/London",
        "Asia/Bangkok",
        "Asia/Taipei",
        "Australia/Sydney"
      ],
      newTimeZone: []
    };
  },
  methods: {
    setString() {
      const vm = this;
      let calibrateTime;
      vm.newTimeZone = [];
      vm.timeZoneArray.forEach((item, i) => {
        calibrateTime = vm.setLocalTime(item);
        vm.newTimeZone.push(calibrateTime);
      });
    },
    setLocalTime(zone) {
      const vm = this;
      const date = new Date();
      const options = {
        year: "numeric",
        month: "short",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        // second: "2-digit",
        hour12: false,
      };
      //   console.log(zone);
      Object.assign(options, { timeZone: zone });
      let timeStr = date.toLocaleString("en", options).split(",");
      let dateStr = timeStr[0].split(" ").reverse();

      //移除並回傳陣列的第一個元素
      timeStr.shift();
      
      timeStr.map((item, i) => {
        timeStr[i] = timeStr[i].trim();
      });
      dateStr = [...dateStr, ...timeStr];
      return dateStr;
    }
  },
  computed: {},
  created() {
    //   this.setString();
    setInterval(this.setString, 1000);
    // setTimeout(this.setString, 1000);
  }
};
</script>