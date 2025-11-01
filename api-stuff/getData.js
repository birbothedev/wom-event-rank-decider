import { getCompetition, client } from "./initialFetch.js";
import { readFromFile, writeToFile, delay } from "../json-stuff/Output.js";

async function getCompetitionDates(){
    const compData = await getCompetition();

    const startDate = compData.startsAt;
    const endDate = compData.endsAt;

    return {
        startDate: startDate,
        endDate: endDate
    }
}

async function getPlayerInfoFromCompetition(refresh = false) {
    if (!refresh) {
        const cached = await readFromFile('cachefile');
        if (cached.length) return cached;
    }

    const compData = await getCompetition();
    const players = compData.participations.map(p => ({
        team: p.teamName,
        playerName: p.player.username,
        playerDisplayName: p.player.displayName
    }));

    console.log("Writing cache data....")
    await writeToFile(players, 'cachefile');
    console.log("Cache data writen")
    return players;
}

async function getPlayerGainsFromPeriod(){
    const players = await getPlayerInfoFromCompetition();
    const dates = await getCompetitionDates();

    const startDate =  new Date(dates.startDate).toISOString();
    const endDate = new Date(dates.endDate).toISOString();

    const playerDetails = [];
    for (let i = 0; i < players.length; i++) {
        const { playerName, team } = players[i];
        let success = false;
        let attempt = 0;

        while (!success && attempt < 10) { 
            attempt++;
            try {
                console.log(`(${i + 1}/${players.length}) Fetching gains for ${playerName} (${team}), attempt ${attempt}`);
                const gains = await client.players.getPlayerGains(playerName, { startDate, endDate });
                playerDetails.push({ playerName, team, ...gains });
                console.log(`✅ Success: ${playerName}`);
                success = true;
            } catch (err) {
                if (err.statusCode === 429) {
                    console.warn(`⚠️ Rate limit hit for ${playerName}, waiting 15s before retry...`);
                    await delay(15000);
                } else {
                    console.error(`❌ Error fetching gains for ${playerName}:`, err.message || err);
                    success = true; 
                }
            }
        }

        await delay(5000); 
    }

    await writeToFile(playerDetails, 'competition-data');
    console.log(`fetched gains for ${playerDetails.length} players. data saved to competition-data.json.`);

    return playerDetails;
}


async function main(){
    await getPlayerGainsFromPeriod();
}

main();