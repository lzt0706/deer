<template>
  <div>
    <!-- products list start -->
    <div class="row mt-4">
      <div class="col-md-4 mb-4" v-for="item in products" :key="item.id">
        <div class="card border-0 shadow-sm">
          <div
            style="height: 150px; background-size: cover; background-position: center"
            :style="{backgroundImage: `url(${item.imageUrl})`}"
          ></div>
          <div class="card-body">
            <span class="badge badge-secondary float-right ml-2">{{item.category}}</span>
            <h5 class="card-title">
              <a href="#" class="text-dark">{{item.title}}</a>
            </h5>
            <p class="card-text">{{item.content}}</p>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h5" v-if="!item.price">原價 {{item.origin_price}} 元</div>
              <del class="h6" v-if="item.price">原價 {{item.origin_price}} 元</del>
              <div class="h5" v-if="item.price">現在只要 {{item.price}} 元</div>
            </div>
          </div>
          <div class="card-footer d-flex">
            <button
              type="button"
              class="btn btn-outline-secondary btn-sm"
              @click="getProduct(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              查看更多
            </button>
            <button
              type="button"
              class="btn btn-outline-danger btn-sm ml-auto"
              @click="addtoCart(item.id)"
            >
              <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
              加到購物車
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- products list end -->
    <!-- pagination start -->
    <Pagination :pagination="pagination" @getPageProducts="getProducts"/>
    <!-- pagination end -->
    <!-- cart list start -->
    <div class="d-flex justify-content-center" v-if="cart.total !== 0">
      <table class="table w-50 mt-4 text-center">
        <thead>
          <th></th>
          <th>品名</th>
          <th>數量</th>
          <th>單價</th>
        </thead>
        <tbody>
          <tr v-for="item in cart.carts" :key="item.id">
            <td class="align-middle">
              <button
                type="button"
                class="btn btn-outline-danger btn-sm"
                @click="removeCartItem(item.id)"
              >
                <i class="far fa-trash-alt"></i>
              </button>
            </td>
            <td class="align-middle">
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">已套用優惠券</div>
            </td>
            <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
            <td class="align-middle text-right">{{ item.final_total | currency}}</td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-right">總計</td>
            <td class="text-right">{{ cart.total }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-right text-success">折扣價</td>
            <td class="text-right text-success">{{ cart.final_total }}</td>
          </tr>
        </tfoot>
      </table>
    </div>
    <div class="d-flex justify-content-center" v-if="cart.total !== 0">
      <div class="input-group mb-3 input-group-sm w-50">
        <input type="text" class="form-control" placeholder="請輸入優惠碼" v-model="coupon_code">
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">套用優惠碼</button>
        </div>
      </div>
    </div>
    <!-- cart list end -->
    <!-- product modal start -->
    <div
      class="modal fade"
      id="productModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">{{product.title}}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img :src="product.imageUrl" class="img-fluid" alt>
            <blockquote class="blockquote mt-3">
              <p class="mb-0">{{product.content}}Content</p>
              <footer class="blockquote-footer text-right">{{product.description}}description</footer>
            </blockquote>
            <div class="d-flex justify-content-between align-items-baseline">
              <!-- <div class="h5">2,800 元</div> -->
              <div class="h4" v-if="!product.price">原價 {{product.origin_price}} 元</div>
              <del class="h6" v-if="product.price">原價 {{product.origin_price}} 元</del>
              <div class="h4" v-if="product.price">現在只要 {{product.price}} 元</div>
            </div>
            <select name class="form-control mt-3" v-model="product.num">
              <option :value="num" v-for="num in 10" :key="num">選購 {{num}} {{product.unit}}</option>
            </select>
          </div>
          <div class="modal-footer">
            <div class="text-muted text-nowrap mr-3">
              小計
              <strong>{{product.num * product.price}}</strong> 元
            </div>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button
              type="button"
              class="btn btn-primary"
              @click="addtoCart(product.id, product.num)"
            >加到購物車</button>
          </div>
        </div>
      </div>
    </div>
    <!-- product modal end -->
    <!-- form validate start -->
    <div class="my-5 row justify-content-center" v-if="cart.total !== 0">
      <form class="col-md-6" @submit.prevent="createOrder">
        <div class="form-group">
          <label for="useremail">Email</label>
          <input
            type="email"
            class="form-control"
            name="email"
            id="useremail"
            v-model="form.user.email"
            placeholder="請輸入 Email"
            v-validate="'required|email'"
            :class="{'is-invalid':errors.has('email')}"
          >
          <span class="text-danger" v-if="errors.has('email')">{{errors.first('email')}}</span>
        </div>

        <div class="form-group">
          <label for="username">收件人姓名</label>
          <input
            type="text"
            class="form-control"
            name="name"
            id="username"
            v-model="form.user.name"
            placeholder="輸入姓名"
            v-validate="'required'"
            :class="{'is-invalid':errors.has('name')}"
          >
          <span class="text-danger" v-if="errors.has('name')">姓名必須輸入</span>
        </div>

        <div class="form-group">
          <label for="usertel">收件人電話</label>
          <input
            type="tel"
            class="form-control"
            name="tel"
            id="usertel"
            v-model="form.user.tel"
            placeholder="請輸入電話"
            v-validate="'required'"
            :class="{'is-invalid':errors.has('tel')}"
          >
          <span class="text-danger" v-if="errors.has('tel')">電話必須輸入</span>
        </div>

        <div class="form-group">
          <label for="useraddress">收件人地址</label>
          <input
            type="address"
            class="form-control"
            name="address"
            id="useraddress"
            v-model="form.user.address"
            placeholder="請輸入地址"
            v-validate="'required'"
            :class="{'is-invalid':errors.has('address')}"
          >
          <span class="text-danger" v-if="errors.has('address')">地址欄位不得留空</span>
        </div>

        <div class="form-group">
          <label for="useraddress">留言</label>
          <textarea name id class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-right">
          <button class="btn btn-danger">送出訂單</button>
        </div>
      </form>
    </div>
    <!-- form validate end -->
  </div>
</template>

<script>
import Pagination from "../Pagination";
import $ from "jquery";

export default {
  data() {
    return {
      products: [],
      product: {},
      pagination: {},
      status: {
        loadingItem: ""
      },
      cart: {},
      coupon_code: "",
      form: {
        user: {
          name: "",
          email: "",
          tel: "",
          address: ""
        },
        message: ""
      }
    };
  },
  components: {
    Pagination
  },
  methods: {
    getProducts(page = 1) {
      const api = `${process.env.APIPATH}/api/${
        process.env.DEER
      }/products?page=${page}`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      //   vm.isLoading = true;
      this.$http.get(api).then(response => {
        console.log("取得商品列表", response.data);
        // vm.isLoading = false;
        vm.products = response.data.products;
        vm.pagination = response.data.pagination;
        // console.log(vm.products);
      });
    },
    getProduct(id) {
      const api = `${process.env.APIPATH}/api/${
        process.env.DEER
      }/product/${id}`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      vm.status.loadingItem = id;
      this.$http.get(api).then(response => {
        console.log("單一商品細節", response.data);
        vm.status.loadingItem = "";
        vm.product = response.data.product;
        vm.product.num = 1;
        if (response.data.success) {
          $("#productModal").modal("show");
        }
        // console.log(vm.products);
      });
    },
    addtoCart(id, qty = 1) {
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/cart`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      vm.status.loadingItem = id;
      const cart = {
        product_id: id,
        qty
      };
      this.$http.post(api, { data: cart }).then(response => {
        console.log("加入購物車", response.data);
        vm.status.loadingItem = "";
        if (response.data.success) {
          vm.getCart();
          $("#productModal").modal("hide");
        }
      });
    },
    getCart() {
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/cart`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      this.$http.get(api).then(response => {
        console.log("取得購物車列表", response.data);
        vm.cart = response.data.data;
      });
    },
    removeCartItem(id) {
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/cart/${id}`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      this.$http.delete(api).then(response => {
        console.log("刪除某一筆購物車資料", response.data);
        vm.getCart();
      });
    },
    addCouponCode() {
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/coupon`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      const coupon = {
        code: vm.coupon_code
      };
      this.$http.post(api, { data: coupon }).then(response => {
        console.log("套用優惠券", response.data);
        vm.getCart();
      });
    },
    createOrder() {
      const api = `${process.env.APIPATH}/api/${process.env.DEER}/order`; //'https://vue-course-api.hexschool.io/api/deer/products'
      const vm = this;
      const order = vm.form;
      this.$validator.validate().then(result => {
        if (result) {
          this.$http.post(api, { data: order }).then(response => {
            console.log("訂單建立", response.data);
            if (response.data.success){
                vm.$router.push(`/customer_checkout/${response.data.orderId}`);
            }
            vm.getCart();
          });
        } else {
            console.log('欄位不完整');
            
        }
      });
    }
  },
  created() {
    this.getProducts();
    this.getCart();
  }
};
</script>