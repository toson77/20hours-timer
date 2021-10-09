<template>
  <v-app>
    <my-header />
    <v-main>
     <!-- ここに自由に追記 -->
    </v-main>
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from '~/layouts/header.vue'
import myFooter from '~/layouts/footer.vue'

export default {
  components: {
    myHeader,
    myFooter
  },
  data: () => ({
    appName: "20時間タイマー"
  })
}
</script>
