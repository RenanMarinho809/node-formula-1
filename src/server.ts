import fastify from "fastify";
import cors from '@fastify/cors';
import { teams } from "./F1teams/team";
import { drivers } from "./F1drivers/driver";



const server = fastify({ logger: true });

server.register(cors, {
  origin: ["https://www.formula1.com/en/racing/2025/pre-season-testing"]
})






server.get("/teams", async(request, response)=> {
     response.type("application/json").code(200)
     return {teams};
});

server.get("/drivers", async( request , response ) => {
    response.type("application/json").code(200) 
    return {drivers};
});

 interface DriverParams {
    id: string;
 }

server.get<{Params: DriverParams}>("/drivers/:id", async(request , response) => {
     const id = parseInt (request.params.id);
     const driver = drivers.find((d) => d.id === id);

     if(!driver){
          response.type("application/json").code(404)
         return { error: "Driver not found"}
     }else{
          response.type("application/json").code(200) 
          return { driver} 
     }
});

server.listen({port: 3333}, () => {
    console.log("Server init")
});