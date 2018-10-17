<template>
  <div class='gameContainer' id='View'>
    <div class='game'>

      <!-- Success -->
      <div v-if='ApiClientRequestStatus.IsSuccess'>
        <div v-if='Phase === GamePhase.Main' id="OutGameMainView">
          <div class='modal open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='StartView'>
                  <h3>DEN</h3>
                  <div>
                    プレイヤーコード: {{ User.Code }}
                  </div>
                  <div>
                    所持金: {{ User.MoneyString }}
                  </div>
                  <div>
                    スタミナ: {{ User.Stamina }}
                  </div>
                  <div class='StartView__BtnList'>
                    <router-link :to="{ name: 'den' }">
                      <div class='StartView__Btn btn'>遊ぶ</div>
                    </router-link>
                    <div @click='toBusiness()' class='StartView__Btn btn'>ビジネス</div>
                    <div @click='howTo()' class='StartView__Btn btn'>遊び方</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else-if='Phase === GamePhase.Business' id="OutGameBusinessView">
          <div class='modal open'>
            <div class='modal__inner modal__inner--full'>
              <div class='modal__body'>
                <div class='BusinessView'>
                  <h3>本日のビジネス</h3>
                  <div class='BusinessView__Body'>
                    <table>
                      <tr v-for='b in Businesses'>
                        <td>{{ b.name }}</td>
                        <td>{{ b.price_base }}</td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Waiting -->
      <div v-else-if='ApiClientRequestStatus.IsWaiting'>
        Loading...
      </div>

      <!-- Fail -->
      <div v-else-if='ApiClientRequestStatus.IsFail'>
        <div class='modal open'>
          <div class='modal__inner modal__inner--full'>
            <div class='modal__body'>
              <div class='StartView'>
                <h3>通信エラー</h3>
                <div>
                  通信エラーが発生しました<br>
                  電波の良いところで再度リトライしてください
                </div>
                <div class='StartView__BtnList'>
                  <div @click='retry()' class='StartView__Btn btn'>リトライ</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import APIClientService from '../service/APIClientService'
import LocalStorage from '../storage/LocalStorage'
import { OutGamePhase } from '../type/Type'
import User from '../data/UserData'

export default {
  name: 'Home',
  mixins: [
    APIClientService,
  ],

  data () {
    return {
      Storage: null,
      Token: null,
      SessionID: null,
      User: null,
      Phase: null,
      Businesses: null,
    }
  },

  beforeMount() {
    this.Storage = new LocalStorage

    this.User = new User

    this.GamePhase = OutGamePhase

    this.Phase = OutGamePhase.Main

    this.loginOrSignup()
  },

  methods: {
    loginOrSignup() {
      this.Token = this.Storage.getToken()
      if (this.Token) {
        this.apiClientPostLogin({'token': this.Token}, this.User)
      } else {
        this.apiClientPostSignup({'platform': 1}, this.User)
      }
    },

    toBusiness() {
      this.Phase = this.GamePhase.Business
      if (this.Business == null) {
        this.apiClientGetBusinessList(this)
      }
    },

    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },

    retry() {
      this.ApiClientRetryFunction()
    },
  },
}
</script>
