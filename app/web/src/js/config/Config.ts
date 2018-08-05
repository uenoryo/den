import Configer from './Configer'
import ENV from '../env'
import AppConfig from './App'
import DebugAppConfig from './DebugApp'

export class {
  app(): Configer {
    if (ENV.debug) {
      return DebugAppConfig
    }
    return AppConfig
  }
}
