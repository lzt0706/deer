<template>
  <div>
    <nav class="col-md-2 d-none d-md-block bg-light sidebar">
      <div class="sidebar-sticky">
        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>管理員</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/products"><i class="fas fa-boxes"></i>
            產品列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/order_list"><i class="fas fa-clipboard-list"></i>
            訂單列表</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons"><i class="far fa-money-bill-alt"></i>
            優惠券</router-link>
          </li>
        </ul>

        <h6
          class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
        >
          <span>模擬功能</span>
          <a class="d-flex align-items-center text-muted" href="#">
            <span data-feather="plus-circle"></span>
          </a>
        </h6>
        <ul class="nav flex-column mb-2">
          <li class="nav-item">
            <router-link class="nav-link" to="/customer_order"><i class="fas fa-shopping-cart"></i>
            模擬訂單</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/kaohsiung_travel"><i class="fas fa-globe-asia"></i>
            高雄旅遊網</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/multipulation_chart"><i class="fas fa-sort-numeric-down"></i>
            9x9 乘法表</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </div>
</template>