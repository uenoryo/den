import Configer from './Configer'
import ENV from '../env'
import AppConfig from './App'
import DebugAppConfig from './DebugApp'

export default class {
  static app(): Configer {
    if (ENV.DEBUG) {
      return new DebugAppConfig
    }
    return new AppConfig
  }
}
