<template>

    <v-container
        style="max-width: 500px"
    >
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
               <strong class="text-h1 white--text font-weight-bold" v-if="state == '20hour'">{{ formatTime }}</strong>
               <strong class="text-h1 white--text font-weight-bold" v-else-if="state == '20min'">{{ minTime }}</strong>
               <strong class="text-h1 white--text font-weight-bold" v-else>00:00:00</strong>
               <v-spacer></v-spacer>
           </v-row>
           <br>
           <br>
           <v-row>
               <v-spacer></v-spacer>
               <v-btn
                height="50px"
                width="180px"
                v-on:click="start"
                v-if="!timerOn && state == '20hour'"
               ><strong style="color:#1976D2" class="text-h6">start</strong></v-btn>
               <v-btn
                height="50px"
                width="180px"
                v-on:click="stop"
                v-if="timerOn && state == '20hour'"
               ><strong style="color:#1976D2" class="text-h6">stop</strong></v-btn>

               <v-btn
                height="50px"
                width="180px"
                v-on:click="start_20"
                v-if="!timerOn_20 && state == '20min'"
               ><strong style="color:#26A69A" class="text-h6">start</strong></v-btn>
               <v-btn
                height="50px"
                width="180px"
                v-on:click="stop_20"
                v-if="timerOn_20 && state == '20min'"
               ><strong style="color:#26A69A" class="text-h6">stop</strong></v-btn>
               <v-btn
                height="50px"
                width="180px"
                v-on:click="stop_20"
                v-if="none"
               >reset</v-btn>
               

               <v-btn
                height="50px"
                width="180px"
                
                v-if="state == 'custom'"
               ><strong style="color:#EF5350" class="text-h6">start</strong></v-btn>
               <v-spacer></v-spacer>
           </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
    data: () => ({
      state: '20hour',
      hour_t: 20,
      min_t: 0,
      sec: 0,
      timerOn: false,
      timerObj: null,

      min_20: 20,
      sec_20: 0,
      timerOn_20: false,
      timerObj_20: null,
  }),
  methods: {
      hour(){
          this.$emit("hour", 'light-blue darken-3');
      },
      min(){
          this.$emit("min", 'teal lighten-1');
      },
      custom(){
          this.$emit("custom", 'red lighten-1');
      },

      count(){
          if (this.sec <= 0 && this.min_t <=0 && this.hour_t >= 1){
              this.hour_t --;
              this.min_t = 59;
              this.sec = 59;
          }
          else if (this.sec <= 0 && this.min_t >=1 && this.hour_t >= 0){
              this.min_t --;
              this.sec = 59;
          }
          else if (this.sec <= 0 && this.min_t <=0 && this.hour_t <=0){
              this.complete();
          }
          else {
              this.sec --;
          }
      },
      start() {
          let self = this;
          this.timerObj = setInterval(function() {self.count()}, 1000)
          this.timerOn = true;
      },
      stop() {
          clearInterval(this.timerObj);
          this.timerOn = false;
      },
      complete(){
          clearInterval(this.timerObj)
      },


      //20min timer
      count_20(){
          if (this.sec_20 <= 0 && this.min_20 >=1){
              this.min_20 --;
              this.sec_20 = 59;
          }
          else if (this.sec_20 <= 0 && this.min_20 <=0){
              this.complete_20();
          }
          else {
              this.sec_20 --;
          }
      },
      start_20() {
          let self_20 = this;
          this.timerObj_20 = setInterval(function() {self_20.count_20()}, 1000)
          this.timerOn_20 = true;
      },
      stop_20() {
          clearInterval(this.timerObj_20);
          this.timerOn_20 = false;
      },
      complete_20(){
          clearInterval(this.timerObj_20)
      },
  },
  computed: {
      formatTime(){
          let timeStrings = [
              this.hour_t.toString(),
              this.min_t.toString(),
              this.sec.toString(),
          ].map(function(str){
              if (str.length < 2){
                  return "0" + str
              }
              else {
                  return str
              }
          })
          return timeStrings[0] + ":" + timeStrings[1] + ":" + timeStrings[2]
      },
     minTime(){
          let timeStrings_20 = [
              this.min_20.toString(),
              this.sec_20.toString(),
          ].map(function(str){
              if (str.length < 2){
                  return "0" + str
              }
              else {
                  return str
              }
          })
          return timeStrings_20[0] + ":" + timeStrings_20[1]
      },
      
  }
}
</script>
