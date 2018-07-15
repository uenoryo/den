<script>
import anime from 'animejs'

export default {
  name: 'Animator',
  methods: {
    animateDeal (dealer, player) {
      setTimeout(() => {
        dealer.deal(player)
      }, 100)
    },
  },
}
</script>
