<template>
  <v-app>
    <my-header />
    <v-main>
     <!-- ここに自由に追記 -->
     <my-task />
     <my-skill />
    </v-main>
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from '~/components/header.vue'
import myFooter from '~/components/footer.vue'
import myTask from '~/components/task.vue'
import mySkill from '~/components/skill.vue'

export default {
  components: {
    myHeader,
    myFooter,
    myTask,
    mySkill
  },
  data: () => ({
    appName: "20時間タイマー"
  })
}
</script>
