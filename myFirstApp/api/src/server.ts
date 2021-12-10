import express, { Application } from 'express'
import http from 'http'
import path from 'path'
import { Logger, LogStyle } from './helpers/logger'
import environment  from './environments/environment'
import morgan from 'morgan'
import cors from 'cors'

// Routes Imports
import fruitRoutes from './routes/fruitRoutes'
import userRoutes from './routes/userRoutes'
import { Socket } from './helpers/socket'

class Server {

    public app: Application;
    public logger: Logger;
  
    constructor() {
      this.app = express();
      this.logger = Logger.getInstance();
      this.config();
      this.routes();
    }
  
    config() {
      this.app.set('port', process.env.PORT || environment.app.port);
      this.logger.config();
      this.app.use(morgan('custom', {
          skip: function (req, res) {
              if (req.method == 'OPTIONS')
                  return true;
              return false;
          }
      }));
      this.app.use(cors({
        origin: [environment.app.frontUrl],
        credentials: true
      }));
      this.app.use(express.json());
      this.app.use(express.urlencoded({ extended: false }));
      this.app.use(express.static(path.join(__dirname, 'public')));
    }
  
    routes() {
      this.app.use('/api/fruits/', fruitRoutes);
      this.app.use('/api/login/', userRoutes);
    }
  
    async start() {
      var server = http.createServer(this.app);
      server.listen(this.app.get('port'), async () => {
        this.logger.printLog(LogStyle.succes,'Server listening on port ' + this.app.get('port'));
      });

      var socket = await Socket.getInstance();
      socket.generate(server);
    }
  }
  
  const server = new Server();
  server.start();