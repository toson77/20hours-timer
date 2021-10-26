<template>
  <v-container style="max-width: 500px">

    <h2 class="display-1 white--text pl-3">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">
          {{ tasks.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout
      my-1
      align-center
    >
      <strong class="mx-3 black--text ">
        進行中: {{ remainingTasks }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">
        完了: {{ completedTasks }}
      </strong>

      <v-spacer></v-spacer>

      <v-progress-circular
        :value="progress"
        class="mr-2"
      ></v-progress-circular>
    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(task, i) in tasks">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item :key="`${i}-${task.text}`">

            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                color="info darken-3"
              >
                <div
                  slot="label"
                  :class="task.done && 'grey--text' || 'text--primary'"
                  class="ml-3"
                  v-text="task.text"
                ></div>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>

            <v-scroll-x-transition>

              <i
                class="mdi mdi-check"
                v-if="task.done"
              />
            </v-scroll-x-transition>

            <v-btn
              text
              icon
              @click="deleteTasks(task)"
            >
              <i class="mdi mdi-delete" />
            </v-btn>

          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
    <br>
    <v-text-field
      v-model="task"
      label="Add Task"
      solo
      @keydown.enter="create"
    >

      <v-fade-transition slot="append">
        <i
          class="mdi mdi-plus"
          v-if="task"
          @click="create"
        />
      </v-fade-transition>
    </v-text-field>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    tasks: [],
    task: null
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter(task => task.done).length;
    },
    progress() {
      if (this.tasks.length === 0) {
        return 0;
      } else {
        return (this.completedTasks / this.tasks.length) * 100;
      }
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    }
  },

  methods: {
    create() {
      this.tasks.push({
        done: false,
        text: this.task
      });
      this.task = null;
    },
    deleteTasks(task) {
      let index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    }
  },
  created() {
    const gettedTasks = this.$store.getters.tasks;
    gettedTasks.forEach((value, index) => {
      const elementMap = {
        done: value.fields.checkbox.booleanValue,
        text: value.fields.name.stringValue
      };
      this.$set(this.tasks, index, elementMap);
    });
  }
};
</script>

<style >

</style>
