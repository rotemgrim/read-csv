
import {Request, Response} from "express";
import {getManager} from "typeorm";


export class HelloWorldController {
    public static async hello(request: Request, response: Response) {

        response.send("hello world 2");
        // // get a post repository to perform operations with post
        // const postRepository = getManager().getRepository(Post);
    
        // // create a real post object from post json object sent over http
        // const newPost = postRepository.create(request.body);
    
        // // save received post
        // await postRepository.save(newPost);
    
        // // return saved post back
        // response.send(newPost);
    }
}

