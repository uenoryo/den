<template>
  <div class='panel panel-default'>
    <div class='panel-heading'>404 Not Found</div>
    <div class='panel-body'>
      お探しのページは見つかりませんでした。
      <router-link :to='{ name: "home" }'>TOPへ戻る</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
}
</script>
