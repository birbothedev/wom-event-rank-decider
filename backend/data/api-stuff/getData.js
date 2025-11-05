import { readFromFile, writeToFile, delay } from "../json-stuff/Output.js";
import { client } from "../../server.js";

//109642 
export async function getCompetition(compID){
    const competetion = await client.competitions.getCompetitionDetails(compID);
    return competetion;
}

async function getCompetitionDates(){
    const compData = await getCompetition();

    const startDate = compData.startsAt;
    const endDate = compData.endsAt;

    return {
        startDate: startDate,
        endDate: endDate
    }
}

async function getPlayerAccountType(playerName){ 
    const details = await client.players.getPlayerDetails(playerName);
    return details.type; 
}

async function getPlayerInfoFromCompetition(refresh = false) {
    if (!refresh) {
        const cached = await readFromFile('cachefile');
        if (cached && cached.length) {
            console.log("✅ Using cached player data.");
            return cached;
        }
    }

    console.log("📡 Fetching competition data...");
    const compData = await getCompetition();

    const players = [];
    for (const p of compData.participations) {
        try {
            const accountType = await getPlayerAccountType(p.player.username);
            players.push({
                team: p.teamName,
                playerName: p.player.username,
                playerDisplayName: p.player.displayName,
                accountType
            });
            console.log(`✅ Added ${p.player.username}`);
        } catch (err) {
            console.error(`❌ Error fetching account type for ${p.player.username}:`, err.message || err);
        }
        await delay(5000);
    }

    console.log("💾 Writing cache data...");
    await writeToFile(players, 'cachefile');
    console.log("✅ Cache data written.");

    return players;
}


async function getPlayerGainsFromPeriod(){
    const players = await getPlayerInfoFromCompetition(true);
    const dates = await getCompetitionDates();

    const startDate =  new Date(dates.startDate).toISOString();
    const endDate = new Date(dates.endDate).toISOString();

    const playerDetails = [];
    for (let i = 0; i < players.length; i++) {
        const { playerName, team, accountType } = players[i];
        let success = false;
        let attempt = 0;

        while (!success && attempt < 10) {
            attempt++;
            try {
                console.log(
                `(${i + 1}/${players.length}) Fetching gains for ${playerName} (${team}), attempt ${attempt}`
                );

                const gains = await client.players.getPlayerGains(playerName, {
                startDate,
                endDate,
                });

                playerDetails.push({ playerName, team, accountType, ...gains });
                console.log(`✅ Success: ${playerName}`);
                success = true;
            } catch (err) {
                if (err.statusCode === 429) {
                const waitTime = 15000 * attempt;
                console.warn(
                    `⚠️ Rate limit hit for ${playerName}, waiting ${
                    waitTime / 1000
                    }s before retry...`
                );
                await delay(waitTime);
                } else {
                console.error(
                    `❌ Error fetching gains for ${playerName}:`,
                    err.message || err
                );
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