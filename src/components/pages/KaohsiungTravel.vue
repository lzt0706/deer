<template>
  <div>
    <header class="header">
      <div class="container text-center">
        <h1 class="text-white" style="margin-bottom: 95px">高雄旅遊資訊</h1>
        <div class="row justify-content-center">
          <div class="col-sm-6">
            <select name id class="form-control input-lg" v-model="currentLocation">
              <option value>---全部---</option>
              <option :value="item" v-for="(item, i) in locations" :key="i">{{item}}</option>
            </select>
          </div>
        </div>
      </div>
    </header>

    <section style="margin-top: -15px">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="bg-white p-3 shadow-sm">
              <h4>熱門行政區</h4>
              <button class="btn btn-primary px-4" @click="currentLocation='三民區'">三民區</button>
              <button class="btn btn-primary px-4" @click="currentLocation='左營區'">左營區</button>
              <button class="btn btn-primary px-4" @click="currentLocation='苓雅區'">苓雅區</button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container">
      <hr class="my-5">
      <section>
        <div class="row">
          <div class="col-sm-6" v-for="(item, i) in filterData[currentPage]" :key="i">
            <div class="card shadow-sm border-0">
              <div
                class="card-header bg-cover"
                :style="{backgroundImage: `url(${item.Picture1})`}"
                style="height: 155px;"
              ></div>
              <div class="card-body">
                <ul class="list-unstyled mb-0">
                  <li class="d-flex">
                    <div class="text-center" style="width: 30px">
                      <i class="fas fa-clock text-primary"></i>
                    </div>
                    {{ item.Opentime }}
                  </li>
                  <li class="d-flex">
                    <div class="text-center" style="width: 30px">
                      <i class="fas fa-map-marker text-warning"></i>
                    </div>
                    {{item.Add}}
                  </li>
                  <li class="d-flex">
                    <div class="text-center" style="width: 30px">
                      <i class="fas fa-mobile-alt text-info"></i>
                    </div>
                    {{item.Tel}}
                  </li>
                  <li class="d-flex" v-if="item.Ticketinfo">
                    <div class="text-center" style="width: 30px">
                      <i class="fas fa-ticket-alt text-success"></i>
                    </div>
                    {{item.Ticketinfo}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <nav class="my-5" aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
          <li class="page-item disabled">
            <a class="page-link" href="#" tabindex="-1">Previous</a>
          </li>
          <li
            class="page-item"
            v-for="(page, i) in filterData.length"
            :class="{'active':currentPage == page-1}"
            :key="i"
          >
            <a class="page-link" href="#" @click.prevent="currentPage = page-1">{{page}}</a>
          </li>
          <li>
            <a class="page-link" href="#">Next</a>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: [],
      currentPage: 0,
      locations: [],
      currentLocation: ""
    };
  },
  methods: {
    getUniqueList() {
      const locations = new Set();
      const vm = this;
      vm.data.forEach((item, i) => {
        locations.add(item.Zone);
      });
      console.log(locations);
      vm.locations = Array.from(locations);
    }
  },
  computed: {
    filterData() {
      const vm = this;
      const newData = [];

      let items = [];
      if (vm.currentLocation !== "") {
        vm.currentPage = 0;
        items = vm.data.filter((item, i) => {
          return item.Zone == vm.currentLocation;
        });
      } else {
        items = vm.data;
      }

      items.forEach((item, i) => {
        if (i % 10 === 0) {
          newData.push([]);
        }
        const page = parseInt(i / 10);
        newData[page].push(item);
      });
      // console.log(newData);
      return newData;
    }
  },
  created() {
    const vm = this;
    this.$http
      .get(
        "https://data.kcg.gov.tw/api/action/datastore_search?resource_id=92290ee5-6e61-456f-80c0-249eae2fcc97",
        { withCredentials: false }
      )
      .then(response => {
        console.log(response.data);
        vm.data = response.data.result.records;
        vm.getUniqueList();
      });
  }
};
</script>

<style scoped>
.header {
  padding-top: 90px;
  padding-bottom: 120px;
  background-image: url(/static/images/the-urban-landscape-1698285.png);
  background-size: cover;
  background-position: center center;
}

.bg-cover {
  background-size: cover;
  background-position: center center;
}
</style>
