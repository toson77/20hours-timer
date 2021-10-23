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
          <v-form ref="form">
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
            <v-btn @click="test()"></v-btn>
          </v-form>
        </v-card>
      </v-row>
    </v-container>
    <my-footer />
  </v-app>
</template>

<script>
import myHeader from "~/layouts/loginheader.vue";
import myFooter from "~/layouts/loginfooter.vue";
import axios from "axios";
export default {
  components: {
    myHeader,
    myFooter
  },
  data: () => ({
    appName: "20時間タイマー",
    email: "test2@test.com",
    password: "test1234",
    passwordCheckVal: ""
  }),
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    uid() {
      return this.$store.getters.uid;
    }
  },
  methods: {
    async register() {
      await this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      });
      axios
        .post(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users`,
          {
            fields: {
              email: {
                stringValue: this.email
              },
              username: {
                stringValue: ""
              }
            }
          },
          {
            params: {
              documentId: this.uid
            },
            headers: {
              Authorization: `Bearer ${this.idToken}`
            }
          }
        )
        .then(responce => {
          console.log(responce);
        });
    },
    test() {
      console.log(this.$store.getters.uid);
      console.log(this.$store.getters.idToken);
    }
  }
};
</script>
