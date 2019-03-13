<template>
  <div>
    <div class="text-right mt-4">
      <button class="btn btn-primary" @click="openCouponsModal(true)">建立新的優惠券</button>
    </div>

    <table class="table mt-4">
      <thead>
        <tr>
          <th scope="col">名稱</th>
          <th scope="col">折扣百分比</th>
          <th scope="col">到期日</th>
          <th scope="col">是否啟用</th>
          <th scope="col">編輯</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in coupons" :key="item.id">
          <th scope="row">{{item.title}}</th>
          <td>{{item.percent}}</td>
          <td>N/A</td>
          <td>
            <span class="text-success" v-if="item.is_enabled">啟用</span>
            <span class="text-danger" v-else>未啟用</span>
          </td>
          <td>
            <button class="btn btn-outline-primary btn-sm" @click="openCouponsModal(false, item)">編輯</button>
            <button class="btn btn-outline-danger btn-sm" @click="deleteModal(item)">刪除</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- coupons modal start -->
    <!-- Modal -->
    <div
      class="modal fade"
      id="couponsModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">建立新的優惠券</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="title">標題</label>
              <input
                type="text"
                class="form-control"
                id="title"
                placeholder="請輸入標題"
                v-model="tempCoupon.title"
              >
            </div>
            <div class="form-group">
              <label for="code">優惠碼</label>
              <input
                type="text"
                class="form-control"
                id="code"
                placeholder="請輸入優惠碼"
                v-model="tempCoupon.code"
              >
            </div>
            <div class="form-group">
              <label for="code">折扣百分比</label>
              <input
                type="text"
                class="form-control"
                id="code"
                placeholder="請輸入折扣百分比"
                v-model="tempCoupon.percent"
              >
            </div>
            <div class="form-group">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="checkbox"
                  id="is_enabled"
                  v-model="tempCoupon.is_enabled"
                  :true-value="1"
                  :false-value="0"
                >
                <label class="form-check-label" for="is_enabled">是否啟用</label>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-primary" @click="updateCoupons">確認</button>
          </div>
        </div>
      </div>
    </div>
    <!-- coupons modal end -->
    <!-- delCouponModal start -->
    <div
      class="modal fade"
      id="delCouponModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content border-0">
          <div class="modal-header bg-danger text-white">
            <h5 class="modal-title" id="exampleModalLabel">
              <span>刪除產品</span>
            </h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            是否刪除
            <strong class="text-danger">{{ tempCoupon.title }}</strong> 商品(刪除後將無法恢復)。
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-dismiss="modal">取消</button>
            <button type="button" class="btn btn-danger" @click="deleteCoupon">確認刪除</button>
          </div>
        </div>
      </div>
    </div>
    <!-- delCouponModal end -->
  </div>
</template>

<script>
import $ from "jquery";

export default {
  data() {
    return {
      coupons: [],
      tempCoupon: {},
      isNew: false
    };
  },
  methods: {
    getCoupons() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.DEER
      }/admin/coupons`;
      this.$http.get(api).then(response => {
        console.log("取得優惠券", response.data);
        vm.coupons = response.data.coupons;
      });
    },
    openCouponsModal(isNew, item) {
      if (isNew) {
        this.tempCoupon = {};
        this.isNew = true;
      } else {
        this.tempCoupon = Object.assign({}, item);
        this.isNew = false;
      }
      $("#couponsModal").modal("show");
    },
    updateCoupons() {
      const vm = this;
      let api = `${process.env.APIPATH}/api/${process.env.DEER}/admin/coupon`;
      let httpMethod = "post";
      if (!vm.isNew) {
        api = `${process.env.APIPATH}/api/${process.env.DEER}/admin/coupon/${
          vm.tempCoupon.id
        }`;
        httpMethod = "put";
      }
      this.$http[httpMethod](api, { data: vm.tempCoupon }).then(response => {
        console.log("建立優惠券", response.data);
        if (response.data.success) {
          $("#couponsModal").modal("hide");
          vm.getCoupons();
        }
      });
    },
    deleteModal(item) {
      this.tempCoupon = Object.assign({}, item);
      $("#delCouponModal").modal("show");
    },
    deleteCoupon() {
      const vm = this;
      const api = `${process.env.APIPATH}/api/${
        process.env.DEER
      }/admin/coupon/${vm.tempCoupon.id}`;
      this.$http.delete(api).then(response => {
        console.log("刪除優惠券", response.data);
        if (response.data.success) {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
        } else {
          $("#delCouponModal").modal("hide");
          vm.getCoupons();
          console.log("刪除失敗");
          
        }
      });
    }
  },
  created() {
    this.getCoupons();
  }
};
</script>