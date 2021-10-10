<template>
  <div>
    <v-app-bar
      elevation="1"
      height="40px"
    >
      <v-toolbar-title>
        {{ appName }}
      </v-toolbar-title>

      <v-spacer />

      <v-toolbar-items
      >
        
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    appName: "20時間タイマー"
  })
}
</script>