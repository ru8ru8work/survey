<script>
export default {
  components: {},
};
</script>

<template>
  <div class="bg-white" id="sidebar-wrapper">
    <div
      class="sidebar-heading text-center py-4 primary-text fs-4 fw-bold text-uppercase border-bottom"
    >
      <i class="fa-solid fa-house">選單</i>
    </div>

    <div class="list-group list-group-flush my-3">
      <a
        href="./index.html"
        class="list-group-item list-group-item-acction bg-transparent second-text active"
      >
        <i class="fa-solid fa-star me-2"></i>主頁
      </a>
      <a
        href="./profile.html"
        class="list-group-item list-group-item-acction bg-transparent second-text fw-bold"
      >
        <i class="fa-solid fa-heart me-2"></i>個人資料
      </a>
      <a
        href="#"
        class="list-group-item list-group-item-acction bg-transparent second-text fw-bold"
      >
        <i class="fa-solid fa-heart me-2"></i>選單3
      </a>
      <a
        href="#"
        class="list-group-item list-group-item-acction bg-transparent second-text fw-bold"
      >
        <i class="fa-solid fa-heart me-2"></i>選單4
      </a>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
