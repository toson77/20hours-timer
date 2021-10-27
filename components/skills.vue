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
              <v-btn
                block
                text
                :disabled="isTimerOn"
                @click="changeSkill(skill)"
              >
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
                    :value="skill.power"
                    color="teal accent-4"
                    height="25"
                  >

                    <!-- <template v-slot:default="{ value }"> -->
                    <strong>{{ Math.ceil(skill.power) }}%</strong>
                    <!-- </template> -->
                  </v-progress-linear>
                </v-col>
                <v-col cols="1"></v-col>
              </v-btn>
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
import axios from "axios";
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
    },
    isTimerOn() {
      return this.$store.getters.isTimerOn;
    },
    uid() {
      return this.$store.getters.uid;
    },
    idToken() {
      return this.$store.getters.idToken;
    }
  },

  methods: {
    async create() {
      const skillname = this.skill;
      const datetime = new Date();
      this.skills.push({
        power: 0,
        done: false,
        text: this.skill,
        apiPath: ""
      });
      this.skill = null;

      await axios
        .get(`/postskills/${this.uid}/skills`, {
          headers: {
            Authorization: `Bearer ${this.idToken}`
          }
        })
        .then(responce => {
          console.log(responce);
        });
      //rest post (create document)
      await axios
        .post(
          `/postskills/${this.uid}/skills`,
          {
            fields: {
              name: {
                stringValue: skillname
              },
              timerremaining: {
                mapValue: {
                  fields: {
                    hour: {
                      integerValue: "20"
                    },
                    min: {
                      integerValue: "0"
                    },
                    sec: {
                      integerValue: "0"
                    }
                  }
                }
              },
              isdone: {
                booleanValue: false
              },
              create_at: {
                timestampValue: datetime.toISOString()
              },
              update_at: {
                timestampValue: datetime.toISOString()
              }
            }
          },
          {
            headers: {
              Authhorization: `Bearer ${this.idToken}`
            }
          }
        )
        .then(responce => {
          console.log(responce);
        });
      //update vuex
      await axios
        .get(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/${this.uid}/skills`,
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`
            }
          }
        )
        .then(responce => {
          console.log(responce);
          this.$store.dispatch("actionSetSkills", responce.data.documents);
        });
    },
    timeToRatio(hour) {
      return Math.round(100 - (hour / 20) * 100);
    },
    async changeSkill(skill) {
      const index = this.skills.indexOf(skill);
      await this.$store.dispatch("changeSkill", {
        apiPath: skill.apiPath,
        idToken: this.$store.getters.idToken,
        skillsIndex: index
      });
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
        text: value.fields.name.stringValue,
        apiPath: value.name
      };
      this.$set(this.skills, index, elementMap);
    });
  }
};
</script>

<style >
</style>
