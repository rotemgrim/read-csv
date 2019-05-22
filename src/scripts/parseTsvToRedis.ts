
import * as readline from "readline";
import * as fs from "fs";

import * as redis from "redis";
import {performance} from "perf_hooks";
import LineExtractor from "../LineExtractor";




const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
});

const t0 = performance.now();
let count = 0;
let tmp: any;


const rd = readline.createInterface({
    input: fs.createReadStream("./title.basics.tsv"),
    output: process.stdout
});


rd.on('line', function(line) {
    const row = LineExtractor.lineToBasicRaw(line.split("\t"));
    if (row.type === "movie" || row.type === "tvseries") {
        client.set(row.id, JSON.stringify(row));
        count++;
        if (count % 100000 === 0) {
            console.log(count);
        }
    }
});

rd.on("close", () => {
    const t1 = performance.now();
    console.log("read took " + (t1 - t0) / 1000 + " seconds with " + count + " rows.");
    process.exit(0);
});
