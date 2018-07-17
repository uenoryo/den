<script>
import anime from 'animejs'

export default {
  name: 'Animator',
  methods: {
    animateDeal (dealer, player) {
      // デッキから手札までのスピード
      const deckToHandSpeedMs = 400

      // カードが手札に入るのスピード
      const addHandSpeedMs = 500

      // デッキからプレイヤー側にカードを移動
      this.dealAnimationCardReversed(player.data.ID, deckToHandSpeedMs)

      // カードを手札に加える
      setTimeout(() => {
        this.resetAnimationCardReversed()

        let card = dealer.deal(player)
        // 時差をつけないとvueのエレメント更新が追いつかなくて反応しない...
        setTimeout(() => {
          if (player.data.ID % 2 === 0) {
            anime({
              targets: `.Card__ID${card.id()}`,
              translateY: '0',
              translateX: '-20px',
              duration: 0,
            })
            anime({
              targets: `.Card__ID${card.id()}`,
              rotate: '90',
              duration: addHandSpeedMs,
            })
          } else {
            anime({
              targets: `.Card__ID${card.id()}`,
              translateY: '-20px',
              translateX: '0',
              duration: 0,
            })
            anime({
              targets: `.Card__ID${card.id()}`,
              translateX: '0px',
              translateY: '0px',
              duration: addHandSpeedMs,
            })
          }
          setTimeout(() => {
            this.reset(this.els(`Card__ID${card.id()}`))
          }, 600)
        }, 10)
      }, deckToHandSpeedMs)
    },

    resetAnimationCardReversed () {
      this.hide('AnimationCardReversed')
      anime({
        targets: '#AnimationCardReversed',
        translateY: '0',
        translateX: '0',
      })
    },

    dealAnimationCardReversed (playerID, speed) {
      this.show('AnimationCardReversed')
      anime({
        targets: '#AnimationCardReversed',
        translateX: this.translation('deal', playerID, 'x'),
        translateY: this.translation('deal', playerID, 'y'),
        rotate: '1.5turn',
        duration: speed,
        easing: 'easeOutQuad',
      })
    },

    animateReceive (dealer, card, playerID) {
      card.CSS.display = 'none'
      dealer.receive(card, playerID)
      setTimeout(() => {
        anime({
          targets: `#Card__ID${card.id()}`,
          translateX: this.translation('put', playerID, 'x'),
          translateY: this.translation('put', playerID, 'y'),
          duration: 0,
          easing: 'easeOutQuad',
        })
        this.show(`Card__ID${card.id()}`)
        anime({
          targets: `#Card__ID${card.id()}`,
          translateX: `${Math.floor(Math.random() * 40) - 20}px`,
          translateY: `${Math.floor(Math.random() * 40) - 20}px`,
          rotate: `${Math.floor(Math.random() * 180)}`,
          duration: 120,
          easing: 'easeOutQuad',
        })
      }, 1)
    },

    animateDen (dealer, player) {
      for (let idx in dealer.field.Cards) {
        anime({
          targets: `#Card__ID${dealer.field.Cards[idx].id()}`,
          translateX: `${Math.floor(Math.random() * 40) - 20}px`,
          translateY: `${Math.floor(Math.random() * 40) - 20}px`,
          rotate: `${Math.floor(Math.random() * 320)}`,
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
      for (let id in this.players) {
        if (player.data.ID === parseInt(id)) {
          continue
        }
        for (let idx in this.players[id].hand.Cards) {
          anime({
            targets: `#Card__ID${this.players[id].hand.Cards[idx].id()}`,
            translateX: `${Math.floor(Math.random() * 40) - 20}px`,
            translateY: `${Math.floor(Math.random() * 40) - 20}px`,
            rotate: `${Math.floor(Math.random() * 320)}`,
            duration: 300,
            easing: 'easeOutQuad',
          })
        }
      }
    },

    animateMaintenance (dealer) {
      for (let idx in dealer.field.Cards) {
        if (parseInt(idx) === (dealer.field.Cards.length - 1)) {
          anime({
            targets: `#Card__ID${dealer.field.Cards[idx].id()}`,
            translateX: '0px',
            translateY: '0px',
            rotate: 0,
            duration: 300,
            easing: 'easeOutQuad',
          })
          continue
        }
        this.el(`Card__ID${dealer.field.Cards[idx].id()}`).classList.add('Card--reversed')
        anime({
          targets: `#Card__ID${dealer.field.Cards[idx].id()}`,
          translateX: '0px',
          duration: 200,
          rotate: 0,
          delay: parseInt(idx) * 100,
          easing: 'easeOutQuad',
        })
      }
      setTimeout(() => {
        dealer.maintenance()
        setTimeout(() => {
          for (let idx in dealer.field.Cards) {
            this.show(`Card__ID${dealer.field.Cards[idx].id()}`)
          }
        }, 100)
      }, dealer.field.Cards.length * 100 + 200)
    },

    el (elID) {
      return document.getElementById(elID)
    },

    els (elClass) {
      return document.getElementsByClassName(elClass)
    },

    show (elID) {
      this.el(elID).style.display = 'block'
    },

    hide (elID) {
      this.el(elID).style.display = 'none'
    },

    reset (els) {
      for (let i = 0; i < els.length; i++) {
        //console.log(els[i].removeAttribute('style'))
      }
    },

    translation (type, playerID, xORy) {
      const translationSet = {
        deal: {
          1: {
            x: '60px',
            y: '180px',
          },
          2: {
            x: '-180px',
            y: '0px',
          },
          3: {
            x: '-60px',
            y: '-180px',
          },
          4: {
            x: '180px',
            y: '0px',
          }
        },
        addHand: {
          1: {
            x: '0px',
            y: '-20px',
          },
          2: {
            x: '-20px',
            y: '0px',
          },
          3: {
            x: '0px',
            y: '20px',
          },
          4: {
            x: '20px',
            y: '0px',
          }
        },
        put: {
          1: {
            x: '0px',
            y: '180px',
          },
          2: {
            x: '-180px',
            y: '0px',
          },
          3: {
            x: '0px',
            y: '-180px',
          },
          4: {
            x: '180px',
            y: '0px',
          }
        },
      }
      return translationSet[type][playerID][xORy]
    },
  },
}
</script>
