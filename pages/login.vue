<template>
  <v-app>
    <my-header />
      <v-container fluid>
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            class="my-8 text-center"
          >
            <h1 class="text-h5 font-weight-bold">
              {{ appName }}にログイン
            </h1>
          </v-col>

          <v-card
            flat
            width="80%"
            max-width="320"
            color="transparent"
          >
            <!-- ここからログインフォーム -->
            <v-form
              ref="form"
            >
              <v-text-field
                label="メールアドレスを入力"
                placeholder="your@email.com"
                outlined
              />
              <v-text-field
                label="パスワードを入力"
                placeholder="8文字以上"
                outlined
              />
              <v-btn
                block
                color="blue"
                class="white--text"
              >
                ログインする
              </v-btn>
              <br>
            </v-form>
          </v-card>
        </v-row>
      </v-container>
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from '~/layouts/loginheader.vue'
import myFooter from '~/layouts/footer.vue'

export default {
  components: {
    myHeader,
    myFooter
  },
  data: () => ({
    appName: "20時間タイマー"
  })
}
</script>