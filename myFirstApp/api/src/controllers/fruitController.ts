import { Request, Response } from 'express';
import { Guid } from "guid-typescript";
import jwt from "jsonwebtoken";

var data = [
    { id: Guid.create().toString(), n: "Banane", em: true, p: 2, c: "jaune", dc: new Date(2021,11,9), d: "description méga trop long" },
    { id: Guid.create().toString(), n: "Pomme", em: false, p: 0.5, c: "jaune" },
    { id: Guid.create().toString(), n: "Kiwi", em: true, p: 0.2, c: "rouge" },
];

export class FruitController{

    public async getFruit(req: Request, res: Response){
        var id = req.params.id;
      var dto = data.find(c=> c.id == id);
      res.send(dto);
    }

    public async getFruits(req: Request, res: Response){
        res.send(data.map((e) => ({ id: e.id, l: e.n, d: e.p + " Kg" })));
    }
    
    public async putFruit(req: Request, res: Response){

      let token = req.headers.authorization!.split(' ')[1];

      if(!token){
        return res.status(401).json({error: 'unauthorized'});
      }

      jwt.verify(token, "my_secret", function (err: any, decoded: any) {
        if (err) {
          console.log('Invalid token');
          return res.status(401).json(err);
        }
        
      });


      var id = req.params.id;
      var newFruit = req.body;
      var fruit = data.find(fruit=> fruit.id == id);
      if(fruit){
        Object.assign(fruit,newFruit)
        res.send(fruit)
      }
      else{
        res.status(500).json({error: "Ce fruit n'existe pas"})
      }
    }
}

export const fruitController = new FruitController();