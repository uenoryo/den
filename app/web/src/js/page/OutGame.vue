<template>
  <div class='gameContainer' id='View'>
    <div class='game'>
      <div class='modal open'>
        <div class='modal__inner modal__inner--full'>
          <div class='modal__body'>
            <div class='StartView'>
              <h3>DEN</h3>
              <div>
                プレイヤーコード: {{ User.Code }}
              </div>
              <div>
                所持金: {{ User.Money }}円
              </div>
              <div>
                スタミナ: {{ User.Stamina }}
              </div>
              <div class='StartView__BtnList'>
                <router-link :to="{ name: 'den' }">
                  <div class='StartView__Btn btn'>あそぶ</div>
                </router-link>
                <div @click='howTo()' class='StartView__Btn btn'>{{ status ? status.Current : 'NONE' }}</div>
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
      status: null,
    }
  },

  beforeMount() {
    this.Storage = new LocalStorage

    this.User = new User

    this.loginOrSignup()
  },

  methods: {
    loginOrSignup() {
      this.Token = this.Storage.getToken()
      if (this.Token) {
        this.status = this.apiClientPostLogin({'token': this.Token}, this.User)
      } else {
        this.status = this.apiClientPostSignup({'platform': 1}, this.User)
      }

      console.log(this.Token)
      console.log(this.SessionID)
      console.log(this.User)
    },

    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },
  },
}
</script>
