import * as mocha from "mocha"
import * as assert from 'power-assert'
import { testPlayers } from '../Helpers'
import MockStorage from '../mock/MockStorage'
import { GameSetType } from '../../type/Type'
import CardData from '../../data/CardData'
import HandData from '../../data/HandData'
import ScoreData from '../../data/ScoreData'
import Players from '../../model/Players'
import Player from '../../model/Player'
import ScoreKeeper from '../../model/ScoreKeeper'

describe('ScoreKeeper', () => {
  describe('.constructor()', () => {
    it('正しく初期化できる', () => {
      new ScoreKeeper(new MockStorage)
    })
  })

  describe('.LatestScoreData()', () => {
    it('最新のスコアデータを取得できる', () => {
      let sk = new ScoreKeeper(new MockStorage)
      let players = testPlayers()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 2, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 3, 4, players, null)
      sk.save()
      if (sk.LatestScoreData === null) {
        throw new Error('latest score is null')
      }
      assert.equal(sk.LatestScoreData.WinnerID, 3)
    })
  })

  describe('.LatestScoreData()', () => {
    context('前回勝利したPlayerのIDを取得できる', () => {
      it('データが存在する場合は取得できる', () => {
        let sk = new ScoreKeeper(new MockStorage)
        let players = testPlayers()
        sk.keep(GameSetType.Den, 1, 4, players, null)
        sk.save()
        sk.keep(GameSetType.Den, 2, 4, players, null)
        sk.save()
        sk.keep(GameSetType.Den, 3, 4, players, null)
        sk.save()
        assert.equal(sk.LatestWinnerID, 3)
      })
      it('データが存在しなければnull', () => {
        let sk = new ScoreKeeper(new MockStorage)
        assert.equal(sk.LatestWinnerID, null)
      })
    })
  })

  describe('.keep()', () => {
    it('スコアが(追加)記録される', () => {
      let sk = new ScoreKeeper(new MockStorage)
      let players = testPlayers()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      assert.equal(sk.Data.length, 3)
    })
  })

  describe('.check()', () => {
    context('scoreが正しく設定されているかをチェックできる', () => {
      let sk = new ScoreKeeper(new MockStorage)
      it('正しいパターンは何も返らない')

      it('データが正しくなければエラーを投げる')
    })
  })

  describe('.save()', () => {
    it('Scoreを保存できる', () => {
      let storage = new MockStorage
      let sk = new ScoreKeeper(storage)
      let players = testPlayers()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()


      if (storage.ScoreData === null) {
        throw new Error('failed to fetch score data')
      }

      assert.equal(storage.ScoreData.length, 3)
    })
  })

  describe('.fetch()', () => {
    it('Scoreを保存できる', () => {
      let storage = new MockStorage
      let sk = new ScoreKeeper(storage)
      let players = testPlayers()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.save()

      storage.ScoreData = sk.Data

      sk.fetch()

      if (sk.Data === null) {
        throw new Error('failed to fetch score data')
      }

      assert.equal(sk.Data.length, 3)
    })
  })

  describe('.clear()', () => {
    it('Scoreを保存できる', () => {
      let storage = new MockStorage
      let sk = new ScoreKeeper(storage)
      let players = testPlayers()
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.keep(GameSetType.Den, 1, 4, players, null)
      sk.keep(GameSetType.Den, 1, 4, players, null)

      sk.save()
      sk.clear()

      assert.equal(sk.Data.length, 0)
      assert.equal(storage.ScoreData, null)
    })
  })

  describe('.writePlainDone()', () => {
    context('plain done のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(1, 5),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let sk = new ScoreKeeper(new MockStorage)
      sk.keep(GameSetType.PlainDone, 1, 0, players, null)
      sk.save()
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 0)
      })

      it('Player1のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(1), players.get(1).Hand.Cost)
      })

      it('Player2のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(2), players.get(2).Hand.Cost)
      })

      it('Player3のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(3), players.get(3).Hand.Cost)
      })

      it('Player4のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(4), players.get(4).Hand.Cost)
      })
    })
  })

  describe('.writeDen()', () => {
    context('den のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(1).Hand = new HandData([
        new CardData(1, 9),
      ])

      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(1, 5),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let fieldCard = new CardData(0, 1)
      let sk = new ScoreKeeper(new MockStorage)
      sk.keep(GameSetType.Den, 1, 4, players, fieldCard)
      sk.save()
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 4)
      })

      it('Player1の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(1), players.get(1).Hand.Cost)
      })

      it('Player2の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(2), players.get(2).Hand.Cost)
      })

      it('Player3の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(3), players.get(3).Hand.Cost)
      })

      it('Player4の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(4), players.get(4).Hand.Cost + fieldCard.Cost)
      })
    })
  })

  describe('.writeAnko()', () => {
    context('anko のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(1).Hand = new HandData([
        new CardData(0, 9),
        new CardData(1, 9),
        new CardData(2, 9),
      ])

      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(3, 9),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let fieldCard = new CardData(0, 1)
      let sk = new ScoreKeeper(new MockStorage)
      sk.keep(GameSetType.Anko, 1, 4, players, fieldCard)
      sk.save()
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 4)
      })

      it('Player1の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(1), players.get(1).Hand.Cost)
      })

      it('Player2の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(2), players.get(2).Hand.Cost)
      })

      it('Player3の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(3), players.get(3).Hand.Cost)
      })

      it('Player4の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(4), players.get(4).Hand.Cost + fieldCard.Cost)
      })
    })
  })

  describe('.writeChitoi()', () => {
    context('chitoi のスコアを記入できる', () => {
      let players = testPlayers()
      players.get(1).Hand = new HandData([
        new CardData(0, 9),
        new CardData(1, 9),
        new CardData(0, 10),
        new CardData(1, 10),
        new CardData(0, 11),
        new CardData(1, 11),
        new CardData(0, 12),
        new CardData(1, 12),
        new CardData(0, 13),
      ])

      players.get(2).Hand = new HandData([
        new CardData(0, 1),
      ])

      players.get(3).Hand = new HandData([
        new CardData(1, 3),
        new CardData(1, 4),
      ])

      players.get(4).Hand = new HandData([
        new CardData(3, 13),
        new CardData(1, 6),
        new CardData(1, 7),
      ])

      let fieldCard = new CardData(0, 1)
      let sk = new ScoreKeeper(new MockStorage)
      sk.keep(GameSetType.Chitoi, 1, 4, players, fieldCard)
      sk.save()
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 1)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 4)
      })

      it('Player1の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(1), players.get(1).Hand.Cost)
      })

      it('Player2の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(2), players.get(2).Hand.Cost)
      })

      it('Player3の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(3), players.get(3).Hand.Cost)
      })

      it('Player4の HandCost が正しく記録されている', () => {
        assert.equal(score.getHandCost(4), players.get(4).Hand.Cost + fieldCard.Cost)
      })
    })
  })

  describe('.writePank()', () => {
    context('pank のスコアを記入できる', () => {
      let players = testPlayers()
      let sk = new ScoreKeeper(new MockStorage)
      sk.keep(GameSetType.Pank, 0, 1, players, null)
      sk.save()
      let score = sk.Data[0]

      it('チェックしてもエラーが起きない', () => {
        sk.check(score)
      })

      it('WinnerID が正しく記録されている', () => {
        assert.equal(score.WinnerID, 0)
      })

      it('LoserID が正しく記録されている', () => {
        assert.equal(score.LoserID, 1)
      })

      it('Player1のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(1), 0)
      })

      it('Player2のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(2), 0)
      })

      it('Player3のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(3), 0)
      })

      it('Player4のID が正しく記録されている', () => {
        assert.equal(score.getHandCost(4), 0)
      })
    })
  })
})
