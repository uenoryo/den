<script>
import anime from 'animejs'

export default {
  name: 'Animator',
  data() {
    return {
      AnimeObjects: [],
    }
  },
  methods: {
    animate(obj) {
      let animeObj = anime(obj)
      this.AnimeObjects.push(animeObj)
    },
    animationDeal(dealer, player) {
      // デッキから手札までのスピード
      const deckToHandSpeedMs = 400

      // カードが手札に入るのスピード
      const addHandSpeedMs = 500

      // デッキからプレイヤー側にカードを移動
      this.dealAnimationCardReversed(player.Data.ID, deckToHandSpeedMs)
      // カードを手札に加える
      setTimeout(() => {
        this.resetAnimationCardReversed()

        let card = dealer.deal(player)
        this.refereeJudgePank(player)
        // 時差をつけないとvueのエレメント更新が追いつかなくて反応しない...
        setTimeout(() => {
          if (player.Data.ID % 2 === 0) {
            this.animate({
              targets: `.Card__ID${card.ID}`,
              translateY: '0',
              translateX: '-20px',
              duration: 0,
            })
            this.animate({
              targets: `.Card__ID${card.ID}`,
              rotate: '90',
              duration: addHandSpeedMs,
            })
          } else {
            this.animate({
              targets: `.Card__ID${card.ID}`,
              translateY: '-20px',
              translateX: '0',
              duration: 0,
            })
            this.animate({
              targets: `.Card__ID${card.ID}`,
              translateX: '0px',
              translateY: '0px',
              duration: addHandSpeedMs,
            })
          }
        }, 10)
      }, deckToHandSpeedMs)
    },

    resetAnimationCardReversed() {
      this.hide('AnimationCardReversed')
      this.animate({
        targets: '#AnimationCardReversed',
        translateY: '0',
        translateX: '0',
      })
    },

    dealAnimationCardReversed(playerID, speed) {
      this.show('AnimationCardReversed')
      this.animate({
        targets: '#AnimationCardReversed',
        translateX: this.translation('deal', playerID, 'x'),
        translateY: this.translation('deal', playerID, 'y'),
        rotate: '1.5turn',
        duration: speed,
        easing: 'easeOutQuad',
      })
    },

    animationReceive(dealer, card, playerID) {
      card.CSS.display = 'none'
      dealer.receive(card, playerID)
      setTimeout(() => {
        this.animate({
          targets: `#Card__ID${card.ID}`,
          translateX: this.translation('put', playerID, 'x'),
          translateY: this.translation('put', playerID, 'y'),
          duration: 0,
          easing: 'easeOutQuad',
        })
        this.show(`Card__ID${card.ID}`)
        this.animate({
          targets: `#Card__ID${card.ID}`,
          translateX: `${Math.floor(Math.random())}px`,
          translateY: `${Math.floor(Math.random())}px`,
          rotate: 180,
          duration: 300,
          easing: 'easeOutQuad',
        })
      }, 50)
    },

    animationDen(dealer, player) {
      // 画面を揺らす
      this.el('View').classList.add('View--inverted')
      this.animate({
        targets: '#View',
        translateY: [50, 0],
        translateX: [50, 0],
        duration: 400,
      })
      setTimeout(() => {
        this.el('View').classList.remove('View--inverted')
      }, 40)

      for (let p of this.Players.all()) {
        if (player.Data.ID === p.Data.ID) {
          continue
        }
        for (let idx in p.Hand.Cards) {
          this.animate({
            targets: `#Card__ID${p.Hand.Cards[idx].ID}`,
            translateX: `${Math.floor(Math.random() * 60) - 30}px`,
            translateY: `${Math.floor(Math.random() * 60) - 30}px`,
            rotate: `${Math.floor(Math.random() * 320)}`,
            duration: 300,
            easing: 'easeOutQuad',
          })
        }
      }
    },

    animationPank(player) {
      // 画面を揺らす
      this.el('View').classList.add('View--inverted')
      this.animate({
        targets: '#View',
        translateY: [50, 0],
        translateX: [50, 0],
        duration: 400,
      })
      setTimeout(() => {
        this.el('View').classList.remove('View--inverted')
      }, 40)

      for (let idx in player.Hand.Cards) {
        this.animate({
          targets: `#Card__ID${player.Hand.Cards[idx].ID}`,
          translateX: `${Math.floor(Math.random() * 100) - 50}px`,
          translateY: `${Math.floor(Math.random() * 100) - 50}px`,
          rotate: `${Math.floor(Math.random() * 560)}`,
          duration: 300,
          easing: 'easeOutQuad',
        })
      }
    },

    animateMaintenance(dealer, dealFunc) {
      for (let idx in dealer.Field.Cards) {
        if (parseInt(idx) === (dealer.Field.Cards.length - 1)) {
          this.animate({
            targets: `#Card__ID${dealer.Field.Cards[idx].ID}`,
            translateX: '0px',
            translateY: '0px',
            rotate: 0,
            duration: 150,
            easing: 'easeOutQuad',
          })
          continue
        }
        this.el(`Card__ID${dealer.Field.Cards[idx].ID}`).classList.add('Card--reversed')
        this.animate({
          targets: `#Card__ID${dealer.Field.Cards[idx].ID}`,
          translateX: '0px',
          duration: 100,
          rotate: 0,
          delay: parseInt(idx) * 50,
          easing: 'easeOutQuad',
        })
      }
      setTimeout(() => {
        dealer.maintenance()
        setTimeout(() => {
          for (let idx in dealer.Field.Cards) {
            this.show(`Card__ID${dealer.Field.Cards[idx].ID}`)
          }
          dealFunc()
        }, 100)
      }, dealer.Field.Cards.length * 50 + 100)
    },

    el(elID) {
      return document.getElementById(elID)
    },

    els(elClass) {
      return document.getElementsByClassName(elClass)
    },

    show(elID) {
      this.el(elID).style.display = 'block'
    },

    hide(elID) {
      this.el(elID).style.display = 'none'
    },

    animationResetAll() {
      this.animate({
        targets: '#View',
        translateY: [0],
        translateX: [0],
        duration: 0,
      })
      setTimeout(() => {
        for (let el of this.els('Card')) {
            el.removeAttribute('style')
        }
      }, 100)
      for (let obj of this.AnimeObjects) {
        obj.reset()
        obj = null
      }
      this.AnimeObjects = []
    },

    translation(type, playerID, xORy) {
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
            x: '-350px',
            y: '0px',
          },
          3: {
            x: '0px',
            y: '-240px',
          },
          4: {
            x: '350px',
            y: '0px',
          }
        },
      }
      return translationSet[type][playerID][xORy]
    },
  },
}
</script>
