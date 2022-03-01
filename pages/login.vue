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
              :type="'password'"
              v-model.trim="password"
              outlined
            />
            <v-btn
              block
              color="blue"
              class="white--text"
              @click="login()"
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
import myHeader from "~/layouts/loginheader.vue";
import myFooter from "~/layouts/footer.vue";
import axios from "axios";
export default {
  components: {
    myHeader,
    myFooter,
  },
  data: () => ({
    appName: "20時間タイマー",
    email: "",
    password: "",
  }),
  computed: {
    idToken() {
      return this.$store.getters.idToken;
    },
    uid() {
      return this.$store.getters.uid;
    },
  },
  methods: {
    async login() {
      await this.$store.dispatch("login", {
        email: this.email,
        password: this.password,
      });
      // get skills
      await axios
        .get(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/${this.uid}/skills`,
          {
            headers: {
              Authorization: `Bearer ${this.idToken}`,
            },
          }
        )
        .then((responce) => {
          console.log(responce);
          if (Object.keys(responce.data).length) {
            this.$store.dispatch("actionSetSkills", responce.data.documents);
          } else {
            this.$store.commit("initSkills");
          }
          console.log(this.$store.getters.skills);
        });

      const skills = this.$store.getters.skills;
      if (Object.keys(skills).length) {
        // get tasks of skill[0]
        await axios
          .get(`https://firestore.googleapis.com/v1/${skills[0].name}/tasks`, {
            headers: {
              Authorization: `Bearer ${this.idToken}`,
            },
          })
          .then((responce) => {
            console.log(responce);
            if (Object.keys(responce.data).length) {
              this.$store.dispatch("actionSetTasks", responce.data.documents);
            } else {
              this.$store.commit("initTasks");
            }
            console.log(this.$store.getters.tasks);
          });
      }
      this.$router.push({ name: "index" });
    },
  },
};
</script>

