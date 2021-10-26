<template>
  <v-app>
    <my-header :class="color" />
    <v-main :class="color">
      <br>
      <my-timer
        v-on:hour="color = $event"
        v-on:min="color = $event"
        v-on:custom="color = $event"
      />
      <my-task />
      <my-skills />
    </v-main>
    <my-footer :class="color" />
  </v-app>
</template>

<script>
import myHeader from "~/layouts/header.vue";
import myFooter from "~/layouts/footer.vue";
import myTask from "~/components/task.vue";
import mySkills from "~/components/skills.vue";
import myTimer from "~/components/timer.vue";

export default {
  data: () => ({
    color: "light-blue darken-3"
  }),
  components: {
    myHeader,
    myFooter,
    myTask,
    mySkills,
    myTimer
  },
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    }
  }
};
</script>


