<template>
  <div class="header">
    <p class="desc">JSON数据生成器</p>
    <a href="#" class="about">查看手册</a>
  </div>
</template>

<script>
export default {
  name: 'appHeader'
}
</script>

<style lang="less" scoped>
.header{
  display: flex;
  align-items: baseline;
  .desc{
    font-size: 28px;
    color: #5cb85c;
    margin-right: 20px;
  }
  .about{
    text-decoration:none;
    font-size: 14px;
    color: skyblue;
  }
}
</style>

