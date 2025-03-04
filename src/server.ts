import fastify from "fastify";
import cors from '@fastify/cors';
import dotenv from 'dotenv';
import { teams } from "./F1teams/team";
import { drivers } from "./F1drivers/driver";
import { HttpStatuscode } from "./utils/httpstatuscode";




const server = fastify({ logger: true });


dotenv.config();

server.register(cors, {
  origin: ["https://www.formula1.com"]
})






server.get("/teams", async(request, response)=> {
     response.type("application/json").code(HttpStatuscode.OK)
     return {teams};
});

server.get("/drivers", async( request , response ) => {
    response.type("application/json").code(HttpStatuscode.OK) 
    return {drivers};
});

 interface DriverParams {
    id: string;
 }

server.get<{Params: DriverParams}>("/drivers/:id", async(request , response) => {
     const id = parseInt (request.params.id);
     const driver = drivers.find((d) => d.id === id);

     if(!driver){
          response.type("application/json").code(HttpStatuscode.NotFound)
         return { error: "Driver not found"}
     }else{
          response.type("application/json").code(HttpStatuscode.OK) 
          return { driver} 
     }
});

server.listen({ port: Number(process.env.PORT) }, () => {
  console.log("Server init");
});