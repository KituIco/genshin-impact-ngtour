export interface Weapon {
    id: string;
    name: string;
    type: string;
    rarity: number;
    baseAttack: number;
    subStatType: string;
    subStat: string;
    abilityName: string;
    abilityDescription: string;
    description: string;
    lore: string;
    image: string;
    location: string;
    stats: string;

    passiveName: string;
    passiveDesc: string;
}

// {
//     "id":"akuoumaru",
//     "name":"Akuoumaru",
//     "type":"Claymore",
//     "rarity":4,
//     "baseAtk":510,
//     "subStatType":"ATK %",
//     "subStat":41.3,
//     "abilityName":"Watatsumi Wavewalker",
//     "abilityDescription":"For every point of the entire party's combined maximum Energy capacity, the Elemental Burst DMG of the character equipping.",
//     "description":"The beloved sword of the legendary \"Akuou.\" The blade is huge and majestic, but is surprisingly easy to wield.",
//     "lore":"This blade was once used by a mighty general of Watatsumi.\nIt is said that he only knew as much of swordsmanship as the \"Getsumouun\" and \"Yuushio\" styles he",
//     "image":"https://impact.moe/assets/img/weapon-icons/akuoumaru.webp",
//     "location":"Gacha",
//     "stats":null
// }