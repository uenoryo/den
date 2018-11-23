export function toMoneyString(money :number): string {
    const unitJP = ["万", "億", "兆", "京", "垓", "秭"]
    let isPuls = money >= 0
    let str = String(money * (isPuls ? 1 : -1)) // absを使わずに絶対値にする

    let index = 0
    let res = ""
    while (0 < str.length) {
      let num = parseInt(str.slice(-1*4)) // 一度数字にすることで 021 => 21 のように0を切る
      if (num !== 0 && !isNaN(num)) {
        let tmp = String(num) + unitJP[index]
        res = tmp + res
      }
      str = str.slice(0, -1*4) // 下4桁削除
      index++
    }

    if (res === "") {
      res = "0"
    }

    return (isPuls ? '' : '-') + res + "円"
}
