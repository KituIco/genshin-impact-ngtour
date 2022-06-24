export interface Artifact {
    id: number;
    name: string;
    type: string;
    rarity: number;
    description: string;
    lore: string;
    location: string;
    image: string;
    artifactSet: {
        id: string;
        name: string;
        maxRarity: number;
        twoPieceBonus: string;
        fourPieceBonus: string;
    }
}
// {
//     "id":11,
//     "name":"Adventurer's Flower",
//     "type":"Flower of Life",
//     "rarity":2,
//     "description":"A resilient flower that survived the harsh environment of an ancient city. It is now proudly worn like a medal.",
//     "lore":"The ambitious adventurer came across this resilient flower in the depths of a gloomy ruin. Moved by the sight of life sprouting in d.",
//     "location":"Chests",
//     "image":"https://impact.moe/assets/img/artifact-icons/adventurers-flower.webp",
//     "artifactSet":{
//         "id":"adventurer",
//         "name":"Adventurer",
//         "maxRarity":3,
//         "twoPieceBonus":"Max HP increased by 1,000.",
//         "fourPieceBonus":"Opening chest regenerates 30% Max HP over 5s."
//     }
// }