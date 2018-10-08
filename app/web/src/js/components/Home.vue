<template>
  <div class='gameContainer' id='View'>
    <div class='game'>
      <div class='modal open'>
        <div class='modal__inner modal__inner--full'>
          <div class='modal__body'>
            <div class='StartView'>
              <h3>DEN</h3>
              <div class='StartView__BtnList'>
                <router-link :to="{ name: 'den' }">
                  <div @click='gamePrepare(false)' class='StartView__Btn btn'>あそぶ</div>
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

export default {
  name: 'Home',
  mixins: [
    APIClientService,
  ],

  data () {
    return {
      status: null
    }
  },

  beforeMount() {
    this.status = this.apiClientPostSignup({'platform': 1})
  },

  methods: {
    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },
  },
}
</script>
