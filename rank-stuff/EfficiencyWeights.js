import { tier1eff, tier2eff, tier3eff, tier4eff, tier5eff } from "../data-stuff/DataCategories.js";
import { readFromFile } from "../json-stuff/Output.js";

function weighEfficiency(efficiency){
    const effPoints = {};

    for (const [eff, hours] of Object.entries(efficiency)){
        let score = 0;
        
        if (hours >= tier5eff) score = 5;
        else if (hours >= tier4eff) score = 4;
        else if (hours >= tier3eff) score = 3;
        else if (hours >= tier2eff) score = 2;
        else if (hours >= tier1eff) score = 1;
        else score = 0;

        effPoints[eff] = score;
    }

    return effPoints;
}

async function applyWeightsToPlayerEfficiency(){
    const playerData = await readFromFile('cleaned-data');

    const playerEfficiency = playerData.map(player => ({
        playerName: player.playerName,
        efficiency: player.data.efficiency
    }));

    const weightedEfficiency = playerEfficiency.map(player => {
        const ehpWeights = weighEfficiency(player.efficiency);

        return {
            playerName: player.playerName,
            ehpWeights
        }
    });

    console.log(weighEfficiency[0]);

    return weightedEfficiency;
}

applyWeightsToPlayerEfficiency();