
// titleId	ordering	title	region	language	types	attributes	isOriginalTitle
export type AkasRaw = {
    id: string, 
    order: string, 
    title: string, 
    region: string, 
    language: string, 
    types: string, 
    attributes: string, 
    isOriginalTitle: string
};

// tconst	titleType	primaryTitle	originalTitle	isAdult	startYear	endYear	runtimeMinutes	genres
export type BasicsRaw = {
    id: string,
    type: "movie" | "short" | "tvseries" | "tvepisode" | "video",
    title: string,
    originalTitle: string,
    isAdult: "0" | "1",
    startYear: string,
    endYear: string,
    runtimeMin: string,
    genres: string,
};

export default class LineExtractor {

    // tconst	titleType	primaryTitle	originalTitle	isAdult	startYear	endYear	runtimeMinutes	genres
    public static lineToBasicRaw(line: any | string[]): BasicsRaw {
        return {
            id: line[0],
            type: line[1].toLowerCase(),
            title: line[2],
            originalTitle: line[3],
            isAdult: line[4],
            startYear: line[5],
            endYear: line[6],
            runtimeMin: line[7],
            genres: line[8],
        }
    }
}