import { PlayerID, PlayerType } from '../type/Type'

export default class PlayerData {
  constructor(
    private id:PlayerID,
    private type:PlayerType
  ) {}

  get ID():PlayerID {
    return this.id
  }

  get Type():PlayerType {
    return this.type
  }
}
