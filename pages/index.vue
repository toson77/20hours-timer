<template>
  <v-app class="light-blue darken-3">
    <my-header />
    <v-main>
      <br>
     <!-- ここに自由に追記 -->
     <my-timer />
     <my-task />
     <my-skills />
    </v-main>
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from '~/layouts/header.vue'
import myFooter from '~/layouts/footer.vue'
import myTask from '~/components/task.vue'
import mySkills from '~/components/skills.vue'
import myTimer from '~/components/timer.vue'

export default {
  components: {
    myHeader,
    myFooter,
    myTask,
    mySkills,
    myTimer
  },
  data: () => ({
    appName: "20時間タイマー"
  })
}
</script>


