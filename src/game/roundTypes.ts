export const ROUND_TYPES = {
    troela: {
        category: "troela",
        basePoints: 10,
        tricks: 8,
        bonusPoints: 35
    },
    rik: {
        category: "rik",
        basePoints: 10,
        tricks: 8,
        bonusPoints: 35
    },
    eightSolo: {
        category: "solo",
        basePoints: 10,
        tricks: 8
    },
    piek: {
        category: "fixedScore",
        points: 15
    },
    nineSolo: {
        category: "solo",
        basePoints: 20,
        tricks: 9
    },
    misere: {
        category: "fixedScore",
        points: 25
    },
    tenSolo: {
        category: "solo",
        basePoints: 30,
        tricks: 10
    },
    openPiek: {
        category: "fixedScore",
        points: 40
    },
    elevenSolo: {
        category: "solo",
        basePoints: 40,
        tricks: 11
    },
    openMisere: {
        category: "fixedScore",
        points: 50
    },
    twelveSolo: {
        category: "solo",
        basePoints: 50,
        tricks: 12
    },
    openPiekTalking: {
        category: "fixedScore",
        points: 55
    },
    openMisereTalking: {
        category: "fixedScore",
        points: 60
    },
    thirteenSolo: {
        category: "solo",
        basePoints: 70,
        tricks: 13
    },
    spadeQueen: {
        category: "spadeQueen",
        points: 5
    },
    oneOrFive: {
        category: "fixedScore",
        points: 10
    }
} as const;

export type RoundType = keyof typeof ROUND_TYPES;
export type RoundTypeConfig = typeof ROUND_TYPES[RoundType];
export type RoundConfig<K extends RoundType> = (typeof ROUND_TYPES)[K];