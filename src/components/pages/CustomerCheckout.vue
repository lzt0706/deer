<template>
  <div>
    <div class="my-5 row justify-content-center">
      <form class="col-md-6" @submit.prevent="payOrder">
        <table class="table">
          <thead>
            <th>品名</th>
            <th>數量</th>
            <th>單價</th>
          </thead>
          <tbody>
            <tr v-for="item in order.products" :key="item.id">
              <td class="align-middle">{{ item.product.title }}</td>
              <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
              <td class="align-middle text-right">{{ item.final_total }}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="2" class="text-right">總計</td>
              <td class="text-right">{{ order.total }}</td>
            </tr>
          </tfoot>
        </table>

        <table class="table">
          <tbody>
            <tr>
              <th width="100">Email</th>
              <td>{{ order.user.email }}</td>
            </tr>
            <tr>
              <th>姓名</th>
              <td>{{ order.user.name }}</td>
            </tr>
            <tr>
              <th>收件人電話</th>
              <td>{{ order.user.tel }}</td>
            </tr>
            <tr>
              <th>收件人地址</th>
              <td>{{ order.user.address }}</td>
            </tr>
            <tr>
              <th>付款狀態</th>
              <td>
                <span v-if="!order.is_paid">尚未付款</span>
                <span v-else class="text-success">付款完成</span>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="text-right" v-if="order.is_paid === false">
          <button class="btn btn-danger">確認付款去</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ordeId: "",
      order: {
        user: {}
      }
    };
  },
  methods: {
    getOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/order/${
        vm.ordeId
      }`; //'https://vue-course-api.hexschool.io/api/deer/products'
      this.$http.get(api).then(response => {
        console.log("取得某一筆訂單", response.data);
        vm.order = response.data.order;
      });
    },
    payOrder() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/pay/${
        vm.ordeId
      }`; //'https://vue-course-api.hexschool.io/api/deer/products'
      this.$http.post(api).then(response => {
        console.log("結帳付款", response.data);
        if (response.data.success){
            vm.getOrder();
        }
      });
    }
  },
  created() {
    //這邊orderId名稱是對應index.js內 path: 'customer_checkout/:orderId',
    this.ordeId = this.$route.params.orderId;
    // console.log(this.ordeId);
    this.getOrder();
  }
};
</script>