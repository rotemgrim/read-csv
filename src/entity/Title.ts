import {Entity, PrimaryGeneratedColumn, Column, PrimaryColumn, Index} from "typeorm";

@Entity()
export class Title {

    @PrimaryColumn()
    id: string;

    @Column()
    @Index()
    title: string;

    @Column()
    @Index()
    year: string;

    @Column()
    runtime: string;

    //     released: scrape; // const
    //     plot: scrape; // const
    //     awards: scrape; // const
    //     poster: scrape; // update monthly
    //
    //     title: imdb; // const
    //     year: imdb; // const
    //     runtime: imdb; // const
    //     genre: imdb; // const
    //     director: imdb; // const
    //     writer: imdb; // const
    //     actors: imdb; // const
    //     language: imdb; // const
    //     country: imdb; // const
    //     isAdult: imdb; // const
    //     ratings: imdb; // update daily
    //     votes: imdb; // update daily
    //     imdbId: imdb; // const
    //     type: imdb; // const
    //     totalSeasons: calculated; // update daily
    //     totalEpisodes: calculated; // update daily
}
