<template>
  <v-container style="max-width: 500px">

    <h2 class="display-1 white--text pl-3">
      Skills:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`skills-${skills.length}`">
          {{ skills.length }}
        </span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-3"></v-divider>

    <v-layout
      my-1
      align-center
    >
      <strong class="mx-3 black--text">
        進行中: {{ remainingskills }}
      </strong>

      <v-divider vertical></v-divider>

      <strong class="mx-3 black--text">
        完了: {{ completedskills }}
      </strong>

      <v-spacer></v-spacer>

    </v-layout>

    <v-divider class="mb-3"></v-divider>

    <v-card v-if="skills.length > 0">
      <v-slide-y-transition
        class="py-0"
        group
        tag="v-list"
      >
        <template v-for="(skill, i) in skills">
          <v-divider
            v-if="i !== 0"
            :key="`${i}-divider`"
          ></v-divider>

          <v-list-item
            :key="`${i}-${skill.text}`"
            class="white"
          >
            <v-row>
              <v-col cols="1">
              </v-col>
              <v-col cols="3">
                <strong
                  v-text="skill.text"
                  slot="label"
                  :class="skill.done && 'grey--text' || 'text--primary'"
                ></strong>
              </v-col>
              <v-col>
                <v-progress-linear
                  v-model="skill.power"
                  color="teal accent-4"
                  height="25"
                >

                  <template v-slot:default="{ value }">
                    <strong>{{ Math.ceil(value) }}%</strong>
                  </template>
                </v-progress-linear>
              </v-col>
              <v-col cols="1"></v-col>
            </v-row>

          </v-list-item>
        </template>
      </v-slide-y-transition>

    </v-card>
    <br>
    <v-text-field
      v-model="skill"
      label="Add skill"
      solo
      @keydown.enter="create"
    >

      <v-fade-transition slot="append">
        <i
          class="mdi mdi-plus"
          v-if="skill"
          @click="create"
        />
      </v-fade-transition>
    </v-text-field>
  </v-container>
</template>


<script>
export default {
  data: () => ({
    skills: [],
    skill: null,
    change: "light-blue darken-2"
  }),
  computed: {
    completedskills() {
      return this.skills.filter(skill => skill.done).length;
    },
    progress() {
      if (this.skills.length === 0) {
        return 0;
      } else {
        return (this.completedskills / this.skills.length) * 100;
      }
    },
    remainingskills() {
      return this.skills.length - this.completedskills;
    }
  },

  methods: {
    create() {
      this.skills.push({
        power: 0,
        done: false,
        text: this.skill
      });

      this.skill = null;
    },
    timeToRatio(hour) {
      return Math.round(100 - (hour / 20) * 100);
    }
  },
  created() {
    const gettedSkills = this.$store.getters.skills;
    gettedSkills.forEach((value, index) => {
      const elementMap = {
        power: this.timeToRatio(
          value.fields.timerremaining.mapValue.fields.hour.integerValue
        ),
        done: value.fields.isdone.booleanValue,
        text: value.fields.name.stringValue
      };
      this.$set(this.skills, index, elementMap);
    });
  }
};
</script>

<style >
</style>
