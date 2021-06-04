
export const enum EKeys {
    ADD_FIVE_FEET = 96,
    ADD_TEN_FEET = 97,
    ADD_TWENTY_FEET = 98,
    ADD_THIRTY_FEET = 99,
    ADD_FORTY_FEET = 100,
    ADD_FIFTY_FEET = 101,
    ADD_SIXTY_FEET = 102,
    ADD_SEVENTY_FEET = 103,
    ADD_EIGHTY_FEET = 104,
    ADD_NINETY_FEET = 105,
    ADD_TURN = 107,
    ADD_TORCH = 84,
    RESET = 82,
}

export type TimedEvent = {
    name: string;
    remainingTurns: number;
    repeat: boolean;
    length: number;
    beginning: number;
}

export type State = {
    turn: number;
    turnFraction: number;
    timedEvents: TimedEvent[]
}