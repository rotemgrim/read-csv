
import readline from "readline";
import fs from "fs";

import redis from "redis";
import {performance} from "perf_hooks";

type AKAS = {id: string, order: string, title: string, region: string, language: string, types: string, attributes: string, isOriginalTitle: string};

const client = redis.createClient({
    host: "127.0.0.1",
    port: 6379
});

const t0 = performance.now();
let count = 0;
let tmp: any;


const rd = readline.createInterface({
    input: fs.createReadStream("./title.akas.tsv"),
    output: process.stdout
});

// titleId	ordering	title	region	language	types	attributes	isOriginalTitle
rd.on('line', function(line) {
    const list = {} as AKAS;
    [list.id, list.order, list.title, list.region, list.language, list.types, list.attributes, list.isOriginalTitle] = line.split("\t");
    if (list.isOriginalTitle === "1" && list.types === "original") {
        client.set(list.title, list.id);
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
