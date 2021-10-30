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
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="パスワードを入力"
              placeholder="英小文字大文字数字8文字以上"
              :rules="[rules.required, rules.checkPassword]"
              v-model.trim="password"
              outlined
              @click:append="showPassword = !showPassword"
            />
            <v-text-field
              :append-icon="showPassword2 ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword2 ? 'text':'password'"
              label="パスワードを再入力"
              placeholder="英小文字大文字数字8文字以上"
              :rules="[rules.required, verificatePassword()]"
              v-model.trim="passwordCheckVal"
              outlined
              @click:append="showPassword2 =! showPassword2"
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
import myHeader from "~/layouts/loginheader.vue";
import myFooter from "~/layouts/footer.vue";
import axios from "axios";
export default {
  components: {
    myHeader,
    myFooter
  },
  data: () => ({
    appName: "20時間タイマー",
    email: "test2@test.com",
    password: "",
    passwordCheckVal: "",
    //password validation
    showPassword: false,
    showPassword2: false,
    rules: {
      required: value => !!value || "必須項目です",
      checkPassword: value => {
        return (
          /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?\d)[a-zA-Z\d]{8,100}$/.test(value) ||
          "半角英小文字大文字数字をそれぞれ1種類以上含む8文字以上にしてください"
        );
      }
    }
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
    verificatePassword() {
      return this.password == this.passwordCheckVal ? true : "一致しません";
    },
    async register() {
      const datetime = new Date();
      await this.$store.dispatch("register", {
        email: this.email,
        password: this.password
      });
      await axios
        .post(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users`,
          {
            fields: {
              email: {
                stringValue: this.email
              },
              username: {
                stringValue: ""
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
      await axios
        .post(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/${this.uid}/skills`,
          {
            fields: {
              name: {
                stringValue: ""
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
      await axios
        .post(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/${this.uid}/skills/${this.uid}/histories`,
          {
            fields: {
              start: {
                stringValue: ""
              },
              end: {
                stringValue: ""
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
      await axios
        .post(
          `https://firestore.googleapis.com/v1/projects/hours-timer/databases/(default)/documents/users/${this.uid}/skills/${this.uid}/tasks`,
          {
            fields: {
              name: {
                stringValue: ""
              },
              checkbox: {
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
