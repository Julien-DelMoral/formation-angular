import { userController } from './../controllers/userController';
import { Guid } from 'guid-typescript';
import { Router } from 'express';


class UserRoutes {

  public router: Router = Router();
  
  constructor() {
    this.config();
  }

  config(): void {
      
    this.router.get("", userController.authenticate )

  }
}

const userRoutes = new UserRoutes();
export default userRoutes.router;