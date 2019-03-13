<template>
  <div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th>購買時間</th>
          <th>Email</th>
          <th>購買款項</th>
          <th>應付金額</th>
          <th>是否付款</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in orders" :key="item.id">
          <th scope="row">{{item.create_at}}</th>
          <td>{{item.user.email}}</td>
          <td>
            <ul class="list-unstyled">
              <li
                v-for="(product, i) in item.products"
                :key="i"
              >{{product.product.title}} 數量 : {{product.qty}} {{product.product.unit}}</li>
            </ul>
          </td>
          <td class="text-right">{{item.total | currency}}</td>
          <td>
            <span class="text-success" v-if="item.is_paid">已付款</span>
            <span class="text-danger" v-else>尚未付款</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
    };
  },
  methods: {
    getOrderList() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/admin/orders`; //'https://vue-course-api.hexschool.io/api/deer/products'
      this.$http.get(api).then(response => {
        console.log("取得訂單列表", response.data.orders);
        vm.orders = response.data.orders;
        vm.orders.forEach((item, i) => {
          const dates = new Date(item.create_at * 1000);
          const year = dates.getFullYear();
          const month = dates.getMonth() + 1;
          const date = dates.getDate();
          item.create_at = year + "/" + month + "/" + date;
        });
      });
    }
  },
  created() {
    this.getOrderList();
  }
};
</script>