
import {Request, Response} from "express";
import {getManager} from "typeorm";
import { Title } from "../entity/Title";
import * as readline from "readline";
import * as fs from "fs";
import {performance} from "perf_hooks";
import LineExtractor from "../LineExtractor";

export class ExtractController {
    public static async extractBasic(request: Request, response: Response) {

        const t0 = performance.now();
        const titleRepo = getManager("db").getRepository(Title);

        const rd = readline.createInterface({
            input: fs.createReadStream("./title.basics.tsv"),
            output: process.stdout
        });

        let count = 0;
        let tmp: any;

        rd.on('line', async function(line) {
            const row = LineExtractor.lineToBasicRaw(line.split("\t"));
            
            if (row.type === "movie" || row.type === "tvseries") {
                
                const title = new Title();
            
                title.id = row.id;
                title.title = row.title;
                title.year = row.startYear;
                title.runtime = row.runtimeMin;

                await titleRepo.save(title);

                count++;
                
                if (count % 10000 === 0) {
                    console.log(count);
                }
            }
        });

        rd.on("close", () => {
            const t1 = performance.now();
            console.log("read took " + (t1 - t0) / 1000 + " seconds with " + count + " rows.");
            process.exit(0);
        });

        response.send("proccesing basics");
    }
}

