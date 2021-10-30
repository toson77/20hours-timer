<template>

  <v-container style="max-width: 500px">
    <v-card
      color="rgba(255, 255, 255, 0.1)"
      height="250px"
    >
      <br>
      <v-row>
        <v-spacer></v-spacer>
        <v-btn
          text
          height="28px"
          color="white"
          @click="hour();state = '20hour'"
        >
          20 hour
        </v-btn>
        <v-btn
          text
          height="28px"
          color="white"
          @click="min();state = '20min'"
        >
          20 min
        </v-btn>
        <v-btn
          text
          height="28px"
          color="white"
          @click="custom();state = 'custom'"
        >
          custom
        </v-btn>
        <v-spacer></v-spacer>
      </v-row>
      <br>
      <br>
      <v-row>
        <v-spacer></v-spacer>
        <strong
          class="text-h1 white--text font-weight-bold"
          v-if="state == '20hour'"
        >{{ formatTime }}</strong>
        <strong
          class="text-h1 white--text font-weight-bold"
          v-else-if="state == '20min'"
        >{{ minTime }}</strong>
        <strong
          class="text-h1 white--text font-weight-bold"
          v-else-if="state == 'custom' && state_custom == 'on'"
          @click="mouseover()"
        >{{ customTime }}</strong>
        <div v-else-if="state == 'custom' && state_custom == 'off'">
          <br>
          <vue-timepicker
            format="HH:mm:ss"
            hide-clear-button
            hour-label="時"
            minute-label="分"
            second-label="秒"
            second-interval="5"
            placeholder="時間を入力"
            v-model="timestring"
            @input="hour_custom = timestring[0] + timestring[1], min_custom = timestring[3] + timestring[4], sec_custom = timestring[6] + timestring[7]"
          ></vue-timepicker>
          <br>
          <br>
        </div>

        <v-spacer></v-spacer>
      </v-row>
      <br>
      <br>
      <v-row>
        <v-spacer></v-spacer>
        <template v-if="isSetStoreSkills">
          <v-btn
            height="50px"
            width="180px"
            v-on:click="start"
            v-if="!timerOn && state == '20hour'"
          ><strong
              style="color:#1976D2"
              class="text-h6"
            >start</strong></v-btn>
          <v-btn
            height="50px"
            width="180px"
            v-on:click="stop"
            v-if="timerOn && state == '20hour'"
          ><strong
              style="color:#1976D2"
              class="text-h6"
            >stop</strong></v-btn>

          <v-btn
            height="50px"
            width="180px"
            v-on:click="start_20"
            v-if="!timerOn_20 && state == '20min'"
          ><strong
              style="color:#26A69A"
              class="text-h6"
            >start</strong></v-btn>
          <v-btn
            height="50px"
            width="180px"
            v-on:click="stop_20"
            v-if="timerOn_20 && state == '20min'"
          ><strong
              style="color:#26A69A"
              class="text-h6"
            >stop</strong></v-btn>

          <v-btn
            height="50px"
            width="180px"
            @click="start_custom"
            v-if="!timerOn_custom && state == 'custom'"
          ><strong
              style="color:#EF5350"
              class="text-h6"
            >start</strong></v-btn>
          <v-btn
            height="50px"
            width="180px"
            v-on:click="stop_custom"
            v-if="timerOn_custom && state == 'custom'"
          ><strong
              style="color:#EF5350"
              class="text-h6"
            >stop</strong></v-btn>
          <v-spacer></v-spacer>
        </template>
        <template v-else>
          <v-card-text
            class="text-h6 gray--text"
            align="center"
          >
            Please Add Skill
          </v-card-text>
        </template>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import VueTimepicker from "vue2-timepicker";
import "vue2-timepicker/dist/VueTimepicker.css";

export default {
  data: () => ({
    state_custom: "on",
    state: "20hour",
    hour_t: 20,
    min_t: 0,
    sec: 0,
    timerOn: false,
    timerObj: null,

    min_20: 20,
    sec_20: 0,
    timerOn_20: false,
    timerObj_20: null,

    timestring: "00:00:00",
    hour_custom: 0,
    min_custom: 0,
    sec_custom: 0,
    timerOn_custom: false,
    timerObj_custom: null
  }),
  components: {
    "vue-timepicker": VueTimepicker
  },
  methods: {
    hour() {
      this.$emit("hour", "light-blue darken-3");
    },
    min() {
      this.$emit("min", "teal lighten-1");
    },
    custom() {
      this.$emit("custom", "red lighten-1");
    },

    count() {
      if (this.sec <= 0 && this.min_t <= 0 && this.hour_t >= 1) {
        this.hour_t--;
        this.min_t = 59;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min_t >= 1 && this.hour_t >= 0) {
        this.min_t--;
        this.sec = 59;
      } else if (this.sec <= 0 && this.min_t <= 0 && this.hour_t <= 0) {
        this.complete();
      } else {
        this.sec--;
      }
    },
    start() {
      let self = this;
      this.timerObj = setInterval(function() {
        self.count();
      }, 1000);
      this.timerOn = true;
      this.$store.commit("updateIsTimerOn", this.timerOn);
    },
    stop() {
      clearInterval(this.timerObj);
      this.timerOn = false;
      this.$store.commit("updateIsTimerOn", this.timerOn);
      this.restputTimer();
    },
    complete() {
      clearInterval(this.timerObj);
    },
    async restputTimer() {
      await this.$store.dispatch("putTimer", {
        index: this.$store.getters.skillsIndex,
        idToken: this.$store.getters.idToken,
        apiPath: this.$store.getters.skills[this.$store.getters.skillsIndex]
          .name,
        timerremaining: {
          mapValue: {
            fields: {
              hour: {
                integerValue: this.hour_t
              },
              min: {
                integerValue: this.min_t
              },
              sec: {
                integerValue: this.sec
              }
            }
          }
        }
      });
    },

    //20min timer
    count_20() {
      if (this.sec_20 <= 0 && this.min_20 >= 1) {
        this.min_20--;
        this.sec_20 = 59;
      } else if (this.sec_20 <= 0 && this.min_20 <= 0) {
        this.complete_20();
      } else {
        this.sec_20--;
      }
    },
    start_20() {
      let self_20 = this;
      this.timerObj_20 = setInterval(function() {
        self_20.count_20();
      }, 1000);
      this.timerOn_20 = true;
    },
    stop_20() {
      clearInterval(this.timerObj_20);
      this.timerOn_20 = false;
    },
    complete_20() {
      clearInterval(this.timerObj_20);
      this.min_20 = 20;
      this.timerOn_20 = false;
    },
    //カスタム
    count_custom() {
      if (
        this.sec_custom <= 0 &&
        this.min_custom <= 0 &&
        this.hour_custom >= 1
      ) {
        this.hour_custom--;
        this.min_custom = 59;
        this.sec_custom = 59;
      } else if (
        this.sec_custom <= 0 &&
        this.min_custom >= 1 &&
        this.hour_custom >= 0
      ) {
        this.min_custom--;
        this.sec_custom = 59;
      } else if (
        this.sec_custom <= 0 &&
        this.min_custom <= 0 &&
        this.hour_custom <= 0
      ) {
        this.complete_custom();
      } else {
        this.sec_custom--;
      }
    },
    start_custom() {
      let self_custom = this;
      this.timerObj_custom = setInterval(function() {
        self_custom.count_custom();
      }, 1000);
      this.timerOn_custom = true;
      this.state_custom = "on";
    },
    stop_custom() {
      clearInterval(this.timerObj_custom);
      this.timerOn_custom = false;
    },
    complete_custom() {
      clearInterval(this.timerObj_custom);
      this.timerOn_custom = false;
    },
    mouseover() {
      this.state_custom = "off";
    },
    //change skills and change timer
    initTimer() {
      const gettedSkills = this.$store.getters.skills;
      if (Object.keys(gettedSkills).length) {
        const timerMap =
          gettedSkills[this.$store.getters.skillsIndex].fields.timerremaining
            .mapValue.fields;
        this.hour_t = timerMap.hour.integerValue;
        this.min_t = timerMap.min.integerValue;
        this.sec = timerMap.sec.integerValue;
      }
    }
  },
  computed: {
    isSetStoreSkills() {
      const gettedSkills = this.$store.getters.skills;
      return Object.keys(gettedSkills).length ? true : false;
    },
    formatTime() {
      const timeStrings = [
        this.hour_t.toString(),
        this.min_t.toString(),
        this.sec.toString()
      ].map(str => {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return timeStrings[0] + ":" + timeStrings[1] + ":" + timeStrings[2];
    },
    minTime() {
      const timeStrings_20 = [
        this.min_20.toString(),
        this.sec_20.toString()
      ].map(str => {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return timeStrings_20[0] + ":" + timeStrings_20[1];
    },
    customTime() {
      const timeStrings_custom = [
        this.hour_custom.toString(),
        this.min_custom.toString(),
        this.sec_custom.toString()
      ].map(str => {
        if (str.length < 2) {
          return "0" + str;
        } else {
          return str;
        }
      });
      return (
        timeStrings_custom[0] +
        ":" +
        timeStrings_custom[1] +
        ":" +
        timeStrings_custom[2]
      );
    }
  },
  created() {
    // timer first skill[0]
    const gettedSkills = this.$store.getters.skills;
    if (Object.keys(gettedSkills).length) {
      const timerMap = gettedSkills[0].fields.timerremaining.mapValue.fields;
      this.hour_t = timerMap.hour.integerValue;
      this.min_t = timerMap.min.integerValue;
      this.sec = timerMap.sec.integerValue;
    }
  },
  //  watch change skills
  watch: {
    "$store.state.skillsIndex": function() {
      this.initTimer();
    }
  }
};
</script>
