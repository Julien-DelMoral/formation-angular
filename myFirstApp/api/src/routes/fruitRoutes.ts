import { fruitController } from './../controllers/fruitController';
import { Router } from 'express';

class FruitRoutes {

  public router: Router = Router();
  
  constructor() {
    this.config();
  }

  config(): void {
      
    this.router.get("", fruitController.getFruits);
    this.router.get("/:id", fruitController.getFruit);
    this.router.put("/:id", fruitController.putFruit);
  }
}

const fruitRoutes = new FruitRoutes();
export default fruitRoutes.router;