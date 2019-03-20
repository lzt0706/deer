<template>
  <div class="container mt-3">
    <div class="header">
      <div class="l-header">
        <h1>空氣品質指標 (AQI)</h1>
        <select class="mt-1" v-model="selectedCounty" @change="filterData">
          <option value disabled selected>請選擇地區</option>
          <option :value="item" v-for="(item, i) in filterCounty" :key="i">{{item}}</option>
        </select>
      </div>
      <div class="r-header">
        <ul class="m-ul">
          <li class="m-li" v-for="(item, i) in status" :key="i">
            <p class="range" :class="item.color">{{item.rangeDown}}~{{item.rangeUp}}</p>
            <p class="status">{{item.status}}</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="title mb-5">
      <h2 class="m-h2">{{selectedCounty}}</h2>
      <div class="dot"></div>
      <div>
        <h5 class="m-h5">{{PublishTime}} 更新</h5>
      </div>
    </div>

    <div class="main">
      <div class="main-info">
        <div class="info-title">
          <h2 class="name t-name">{{selectedCountyInfo.SiteName}}</h2>
          <h2 class="number t-number" :class="getColor(selectedCountyInfo.AQI)">{{selectedCountyInfo.AQI}}</h2>
        </div>
        <div class="info-content">
          <ul class="m-p">
            <li v-for="(item, i) in pollutants" :key="i">
              <h4 class="name">
                {{item.name}}
                <span class="unit">{{i}} {{item.unit}}</span>
              </h4>
              <h4 class="number">{{selectedCountyInfo[i]}}</h4>
            </li>
          </ul>
        </div>
      </div>

      <div class="main-siteName">
        <div
          class="info-title mr-3"
          v-for="(item, i) in filterCountyInfo"
          :key="i"
          @click="currentCounty(item)"
        >
          <h2 class="name t-name">{{item.SiteName}}</h2>
          <h2 class="number t-number" :class="getColor(item.AQI)">{{item.AQI}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: "微軟正黑體";
}
select {
  border: 3px solid black;
  width: 350px;
  font-size: 24px;
  padding: 10px 20px;
}
.l-header {
  float: left;
}
.m-ul {
  display: flex;
}
.m-li {
  width: 130px;
  height: 120px;
  list-style: none;
  border: 3px solid black;
  margin-left: -3px;
}
.m-li > p {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: bold;
  margin: 0;
  text-align: center;
}
.range {
  width: 100%;
  height: 58px;
  border-bottom: 3px solid black;
}
.status {
  height: 58px;
}
.green {
  background-color: #95f084;
}
.yellow {
  background-color: #ffe695;
}
.orange {
  background-color: #ffaf6a;
}
.red {
  background-color: #ff5757;
}
.blue {
  background-color: #9777ff;
}
.purple {
  background-color: #ad1774;
}
.title {
  height: 40px;
  display: flex;
  align-items: center;
}
.m-h2 {
  float: left;
  margin: 0;
}
.m-h5 {
  margin: 0;
}
.dot {
  border-bottom: 5px dotted black;
  width: 60%;
  height: 0;
  margin: 0 20px;
  float: left;
}

.main {
  display: flex;
  margin-top: 32px;
  margin-bottom: 32px;
}
.main-info {
  width: 330px;
  border: 3px solid black;
  margin: -3px;
}
.info-content {
  padding: 30px;
}
.m-p {
  padding: 0;
}
.info-contnet > ul {
  list-style: none;
}
.info-content > ul > li {
  display: flex;
  justify-content: space-between;
  padding: 16px 0;
  border-bottom: 1px solid black;
}
.info-title {
  display: flex;
  height: 97px;
  border: 3px solid black;
  margin: -3px;
}
.info-title > h2 {
  display: flex;
  justify-content: center;
  align-items: center;
}
.t-name {
  width: 180px;
  border-right: 3px solid #000000;
  margin: 0;
}
.t-number {
  width: 150px;
  margin: 0;
}
.main-siteName {
  display: flex;
  height: 0;
  justify-content: space-between;
  flex-wrap: wrap;
  cursor: pointer;
}
.mr-3 {
  margin-left: 45px;
  margin-right: 0px !important;
  margin-bottom: 35px;
}
.unit {
  margin-left: 4px;
  font-weight: normal;
  font-size: 12px;
}
</style>

<script>
import $ from "jquery";
export default {
  data() {
    return {
      status: [
        {
          rangeDown: 0,
          rangeUp: 50,
          status: "良好",
          color: "green"
        },
        {
          rangeDown: 51,
          rangeUp: 100,
          status: "普通",
          color: "yellow"
        },
        {
          rangeDown: 101,
          rangeUp: 150,
          status: "對敏感族群不健康",
          color: "orange"
        },
        {
          rangeDown: 151,
          rangeUp: 200,
          status: "對所有族群不健康",
          color: "red"
        },
        {
          rangeDown: 201,
          rangeUp: 300,
          status: "非常不健康",
          color: "blue"
        },
        {
          rangeDown: 301,
          rangeUp: 400,
          status: "危害",
          color: "purple"
        }
      ],
      countyInfo: [], //http get的資料
      filterCounty: [], //不重複的所有縣市
      filterCountyInfo: [
        {
          SiteName: ""
        }
      ],
      selectedCounty: "高雄市",
      selectedCountyInfo: [],
      PublishTime: "",
      pollutants: {
        O3: { name: "臭氧", unit: "(ppb)" },
        PM10: { name: "懸浮微粒", unit: "(μg/m³)" },
        "PM2.5": { name: "細懸浮微粒", unit: "(μg/m³)" },
        CO: { name: "一氧化碳", unit: "(μg/m³)" },
        SO2: { name: "二氧化硫", unit: "(ppb)" },
        NO2: { name: "二氧化氮", unit: "(ppb)" }
      },
    };
  },
  methods: {
    getData() {
      const api =
        "https://cors-anywhere.herokuapp.com/http://opendata.epa.gov.tw/webapi/Data/REWIQA/?format=json";
      const vm = this;
      this.$http.get(api, { withCredentials: false }).then(response => {
        console.log("取得AQI", response);
        vm.countyInfo = response.data;
        let countyArray = new Set();
        response.data.forEach((item, i) => {
          if (!countyArray.has(item.County)) {
            countyArray.add(item.County);
          }
        });
        vm.filterCounty = Array.from(countyArray);
        vm.PublishTime = response.data[0].PublishTime;

        if (vm.selectedCounty !== "") {
          vm.filterCountyInfo = vm.countyInfo.filter((item, i) => {
            return item.County == vm.selectedCounty;
          });
          vm.selectedCountyInfo = vm.filterCountyInfo[0];
        }
      });
    },
    filterData() {
      const vm = this;
      let newData = [];

      if (vm.selectedCounty !== "") {
        newData = vm.countyInfo.filter((item, i) => {
          return item.County == vm.selectedCounty;
        });
      } else {
        newData = vm.countyInfo;
      }
      vm.filterCountyInfo = newData;
      vm.selectedCountyInfo = vm.filterCountyInfo[0];
    },
    currentCounty(item) {
      const vm = this;
      vm.selectedCountyInfo = item;
    },
    getColor(AQI) {
      const vm = this;
      if (0 <= parseInt(AQI) && 51 > parseInt(AQI)){
        return "green";
      }
      else if (51 <= parseInt(AQI) && 101 > parseInt(AQI)){
        return "yellow";
      }
      else if (101 <= parseInt(AQI) && 151 > parseInt(AQI)){
        return "orange";
      }
      else if (151 <= parseInt(AQI) && 201 > parseInt(AQI)){
        return "red";
      }
      else if (201 <= parseInt(AQI) && 301 > parseInt(AQI)){
        return "blue";
      }
      else {
        return "purple";
      }
    }
  },
  computed: {},
  created() {
    this.getData();
  }
};
</script>