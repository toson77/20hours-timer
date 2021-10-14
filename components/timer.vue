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
                @click="state = '20hour'" 
               >
                   20 hour
               </v-btn>
               <v-btn
                text
                height="28px"
                color="white"
                @click="state = '20min'" 
               >
                   20 min
               </v-btn>
               <v-btn
                text
                height="28px"
                color="white"
                @click="state = 'custom'" 
               >
                   custom
               </v-btn>
               <v-spacer></v-spacer>
           </v-row>
           <br>
           <br>
           <v-row>
               <v-spacer></v-spacer>
               <strong class="text-h1 white--text font-weight-bold" v-if="state == '20hour'">20:00:00</strong>
               <strong class="text-h1 white--text font-weight-bold" v-else-if="state == '20min'">20:00</strong>
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
               >start</v-btn>
               <v-spacer></v-spacer>
           </v-row>
        </v-card>
    </v-container>
</template>

<script>
export default {
  data: () => ({
      state: '20hour'
  })
}
</script>
