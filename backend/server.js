import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";
import { tmpdir } from 'os';
import { WOMClient } from '@wise-old-man/utils';

dotenv.config();

export const client = new WOMClient({
    apiKey: process.env.API_KEY,
    userAgent: process.env.USER_AGENT
});

const app = express();
app.use(cors());
app.use(express.json());

import { competitionRunMain, fileReadMain, rankingMain, skillweightsMain } from './data/main';
import { dir } from 'console';

// returns the defualt directory for temp files on the os
const TEMP_DIR = os.tmpdir();

async function createTempDir(){
    const uniqueId = crypto.randomBytes(8).toString("hex");
    const dirPath = path.join(TEMP_DIR, uniqueId);
    await fs.mkdir(dirPath, { recursive: true });
    return dirPath;
}

async function deleteFolder(dirPath){
    try {
        await fs.rm(dirPath, { recursive: true, force: true });
        console.log(`Deleted temp directory ${dirPath}`);
    } catch (err0){
        console.warn(`Could not delete directory`);
    }
}

app.post("/api/rank-players", async (req, res) => {
    const { competitionId } = req.body; // get comp id from frontend
    if (!competitionId) return res.status(400).json({error: "No competition ID provided"});

    const tempDir = await createTempDir();

    try {
        const competitionData = await competitionRunMain(competitionId, compexportfilename, tempDir);
        const cleanedData = await fileReadMain(competitionData, cleanedfilename, tempDir)
        const weightedskills = await skillweightsMain(cleanedData, weightedfilename, tempDir)
        const rankedPlayers = await rankingMain(weightedskills, rankedfilename, tempDir);

        res.json(rankedPlayers);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: err.message});
    }
});

