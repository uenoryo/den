export default {
  // Player
  PlayerTypeHuman: 0,
  PlayerTypeComputer: 1,
  Player1ID: 1,
  Player2ID: 2,
  Player3ID: 3,
  Player4ID: 4,

  // Hand
  PlayerHandStartAmount: 7,
  PlayerHandMaxAmount: 13,

  // Card
  CardMarkClub: 0,
  CardMarkDiamond: 1,
  CardMarkHeart: 2,
  CardMarkSpade: 3,
  CardMarkJoker: 4,
  CardMarkClubString: '♣︎',
  CardMarkDiamondString: '♢',
  CardMarkHeartString: '♡',
  CardMarkSpadeString: '♠︎',
  CardMarkJokerString: '$',

  CardMinNum: 0,
  CardMaxNum: 13,
  CardJokerNum: 0,

  // CardSkill
  CardSkillSkip: 1,
  CardSkillDrawTwo: 2,
  CardSkillWildCard: 8,
  CardSkillBack: 9,
  CardSkillAttach: 12,

  // Deck
  DeckLength: 54,
  DeckLengthWithoutJoker: 52,
  DeckShuffleRemainingAmount: 0,

  // Dealer
  DealerPhaseNormal: 0,
  DealerPhaseForceDraw: 1,
  DealerPhaseAttach: 2,
  DealerPhaseChangeMark: 3,
  DealerReceiveCardIntervalMs: 2000,

  // ActionType
  ActionTypeDraw: 1,
  ActionTypePut: 2,
  ActionTypeForceDraw: 3,
}
