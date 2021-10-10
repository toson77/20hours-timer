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
        v-for="(link, i) in links"
        :key="i"
      >
        <v-btn
          :to="link.to"
          text
          class="font-weight-bold"
        >
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
  </div>
</template>

<script>
export default {
  data: () => ({
    appName: "20時間タイマー",
    links: [
      { title: '新規会員', to: '/newuser' },
      { title: 'ログイン', to: '/login' }
    ]
  })
}
</script>