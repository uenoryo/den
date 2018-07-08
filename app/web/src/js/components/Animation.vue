<script>
import anime from 'animejs'
import Constants from '@/constants'
import Animator from '@/models/Animator'

export default {
  name: 'Animation',
  data () {
    return {
      animator: null,
    }
  },

  methods: {
    animationSetup () {
      this.animator = new Animator
      // HandFantom生成
      for (let id in this.players) {
        this.animator.syncHand(id, this.players[id].hand.Cards)
      }
    },
    animationDraw (playerID) {
      // for (let i in this.players[playerID].hand.Cards) {
      //   if (this.HandFantom[playerID][i] && this.players[playerID].hand.Cards[i].id() !== this.HandFantom[playerID][i].id()) {
      //     this.HandFantom[playerID].splice(i, 0, null)
      //     anime({
      //       targets: `#CardCell__ID${playerID}${i}--empty`,
      //       width: 24,
      //       duration: 100,
      //       easing: 'easeOutQuad',
      //     });
      //   }
      // }
    },
  },
}
</script>
