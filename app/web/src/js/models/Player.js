import cst from '@/constants'

export default class Player {
  constructor(data) {
    if (data.constructor.name !==  'PlayerData') {
      throw new Error('Invalid PlayerData')
    }
    this.data = data
  }
}
