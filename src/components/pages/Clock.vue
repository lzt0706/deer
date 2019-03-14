<template>
  <div class="container d-flex justify-content-center">
    <div class="clock mt-5 mx-auto">
      <div class="hour-hand"></div>
      <div class="minute-hand"></div>
      <div class="second-hand"></div>
    </div>
  </div>
</template>

<style scoped>
.clock {
  width: 500px;
  height: 500px;
  background-color: #293b29;
  background-image: url(http://res.cloudinary.com/dzvkxizui/image/upload/clock-bg.svg);
  position: relative;
  background-repeat: no-repeat;
  background-position: center center;
}
.hour-hand {
  width: 72px;
  height: 8px;
  position: absolute;
  bottom: 49.2%;
  left: 49.4%;
  background-image: url(http://res.cloudinary.com/dzvkxizui/image/upload/hour-hand.svg);
  transform-origin: left;
}
.minute-hand {
  width: 8px;
  height: 96px;
  position: absolute;
  bottom: 50%;
  left: 48.6%;
  background-image: url(http://res.cloudinary.com/dzvkxizui/image/upload/minute-hand.svg);
  transform-origin: bottom;
}
.second-hand {
  width: 12px;
  height: 126px;
  position: absolute;
  bottom: 25%;
  left: 48.7%;
  background-image: url(http://res.cloudinary.com/dzvkxizui/image/upload/second-hand.svg);
  transform-origin: top;
}
</style>

<script>
import $ from "jquery";
export default {
  data() {
    return {};
  },
  methods: {
    getTime() {
      const now = new Date();
      const sec = now.getSeconds();
      const min = now.getMinutes();
      const hour = now.getHours();

      const secDeg = 180 + (360 / 60) * sec;
      const minDeg = (360 / 60) * min + (6 / 60) * sec;
      const hourDeg = (360 / 12) * (hour % 12) + (30 / 60) * min - 90;

      $(".second-hand").css("transform", "rotate(" + secDeg + "deg)");
      $(".minute-hand").css("transform", "rotate(" + minDeg + "deg)");
      $(".hour-hand").css("transform", "rotate(" + hourDeg + "deg)");
    }
  },
  created() {
    
    setInterval(this.getTime,1000);
    // this.getTime();
  },
};
</script>