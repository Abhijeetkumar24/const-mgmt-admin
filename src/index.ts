import express, { Express}  from "express";
import { adminContext, authContext, portNumber } from "./constants.ts/constants";
import { mongoConnection } from "./provider/mongo/mongo.connection";
import { adminRouter, authRouter } from "./routers/router";
// import { authRouter } from "./routers/auth.routes";
// import { adminRouter } from "./routers/admin.routes";


class App{
    private app!: Express;                               // ! is used to indicate that a property will be initialized later               
    private port!: string;
    private authContext!: string;
    private adminContext!: string;
    
    constructor(){
        this.startApp();
    }

    startApp() {
        this.app = express();
        this.configureAppSettings();
        mongoConnection.initiateMongoConnection;
        this.loadContext()
        this.loadRouter();
        this.initServer();
    }

    configureAppSettings(){
        this.app.use(express.json());
        this.port = portNumber;
    }

    loadContext(){
        this.authContext = authContext;
        this.adminContext = adminContext
    }

    loadRouter(){
        this.app.use(this.authContext, authRouter.authrouter());
        this.app.use(this.adminContext, adminRouter.propertyRouter());
        this.app.use(this.adminContext, adminRouter.workerRouter());

    }
 
    initServer(){
        this.app.listen(this.port, () => {
            console.log(`Server is running on port: ${this.port}`);
        })
    }

}(async () => {                                           // Immediately Invoked Function Expression
    new App();
  })();