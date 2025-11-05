import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { WOMClient } from '@wise-old-man/utils';

dotenv.config();

export const client = new WOMClient({
    apiKey: process.env.API_KEY,
    userAgent: process.env.USER_AGENT
});

const app = express();
app.use(cors());
app.use(express.json());

import { rankAllPlayers } from './data/rank-stuff/Ranking'; 
import { getCompetition } from './data/api-stuff/getData';

app.post("/api/rank-players", async (req, res) => {
    try {
        const { competitionId } = req.body; //get comp id from frontend
        if (!competitionId) return res.status(400).json({error: "No competition ID provided"});

        const competitionData = await getCompetition(competitionId);
        const rankedPlayers = await rankAllPlayers();

        res.json(rankedPlayers);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

