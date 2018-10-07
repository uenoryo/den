<template>
  <div class='gameContainer' id='View'>
    <div class='ads'>
      ads
    </div>
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
                <div @click='howTo()' class='StartView__Btn btn'>あそびかた</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',

  data () {
    return {}
  },

  methods: {
    howTo() {
      alert('手札がなくなるかDENしたら勝ち')
    },
  },
}
</script>
