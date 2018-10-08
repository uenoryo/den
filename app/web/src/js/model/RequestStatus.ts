import { RequestStatusType } from '../type/Type'

export default class RequestStatus {
  private currentType: RequestStatusType

  constructor() {
    this.currentType = RequestStatusType.Initial
  }

  init() {
    this.currentType = RequestStatusType.Initial
  }

  change(type: RequestStatusType): void {
    this.currentType = type
  }

  get IsInitail(): boolean {
    return this.currentType === RequestStatusType.Initial
  }

  get IsWaiting(): boolean {
    return this.currentType === RequestStatusType.Waiting
  }

  get IsSuccess(): boolean {
    return this.currentType === RequestStatusType.Success
  }

  get IsFail(): boolean {
    return this.currentType === RequestStatusType.Fail
  }

  get Current(): RequestStatusType {
    return this.currentType
  }
}
