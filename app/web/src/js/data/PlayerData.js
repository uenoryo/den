import Constants from '@/constants'

export default class PlayerData {
  constructor(id, type) {
    id = parseInt(id)
    if (
      id !== Constants.Player1ID &&
      id !== Constants.Player2ID &&
      id !== Constants.Player3ID &&
      id !== Constants.Player4ID
    ) {
      throw new Error(`Invalid Player ID[${id}].`)
    }

    type = parseInt(type)
    if (
      type !== Constants.PlayerTypePlayer &&
      type !== Constants.PlayerTypeComputer
    ) {
      throw new Error('Invalid Player Type.')
    }

    this.id = id
    this.type = type
  }
}
