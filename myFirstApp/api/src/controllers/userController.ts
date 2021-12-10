import { Request, Response } from 'express';
import { Guid } from "guid-typescript";
import jwt from "jsonwebtoken";


export class UserController{

authenticate(req: Request, res: Response){
    let payload = {
        sub: Guid.create().toString(),
        name: "Toto",
        update: true
      };

    res.send({
        id:Guid.create().toString(),
        n:"Toto",
        t: jwt.sign(payload,'my_secret')
    })
}

  
}

export const userController = new UserController();