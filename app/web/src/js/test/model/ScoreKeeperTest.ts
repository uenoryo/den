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
      it('データが存在しなければ 0', () => {
        let sk = new ScoreKeeper(new MockStorage)
        assert.equal(sk.LatestWinnerID, 0)
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
})
