import { Server } from 'http'
import moment from 'moment'
import { Logger, LogStyle } from './logger'
import environment  from '../environments/environment'

var logger = Logger.getInstance();
moment.locale('fr'); 

export class Socket {

    public socket : any
    public onlineClient: any[] = []

    private static instance: Socket
    private constructor() { }

    public static async getInstance(): Promise<Socket> {
        if (!Socket.instance) {
            Socket.instance = new Socket
        }
        return Socket.instance
    }

    generate(server: Server) {
        this.socket = require('socket.io')(server, {
            cors:{
                origin: environment.app.frontUrl
            }
        })
        
        this.socket.on('connection', (socket: any) => {
            this.onlineClient.push(socket)
            logger.printLog(LogStyle.succes,'Clients connected');

            socket.on('disconnect', function() {
                logger.printLog(LogStyle.succes,'Clients disconnected');
                
            });

            socket.on('end', function (){
                socket.disconnect(0);
            });
        });
        
        setInterval(() => {
            this.onlineClient.forEach((c) => {
                c.send("Last news : " + Date.now())
            })
        },3000)
    }

}