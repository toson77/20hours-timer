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
              {{ appName }}に登録
            </h1>
          </v-col>

          <v-card
            flat
            width="80%"
            max-width="320"
            color="transparent"
          >
            <!-- ここから登録フォーム -->
            <v-form
              ref="form"
            >
              <v-text-field
                label="メールアドレスを入力"
                placeholder="your@email.com"
                v-model.trim="email"
                outlined
              />
              <v-text-field
                label="パスワードを入力"
                placeholder="8文字以上"
                v-model.trim="password"
                outlined
              />
              <v-text-field
                label="パスワードを再入力"
                placeholder="8文字以上"
                v-model.trim="passwordCheckVal"
                outlined
              />
              <v-btn
                block
                color="blue"
                class="white--text"
                @click="register()"
              >
                登録する
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
import myFooter from '~/layouts/loginfooter.vue'
import axios from 'axios'
export default {
  components: {
    myHeader,
    myFooter
  },
  data: () => ({
    appName: "20時間タイマー",
    email: '',
    password: '',
    passwordCheckVal: '', 
  }),
  methods: {
    register() {
      axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp', {
        email: this.email,
        password: this.password,
        returnSecureToken: true,
      },
      {
      params: {
          key: process.env.apiKey,
        },
      }
      )
      .then(responce => {
        console.log(responce);
      })
    }
  }
}
</script>
