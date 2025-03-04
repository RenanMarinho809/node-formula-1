import fastify, { FastifyInstance } from 'fastify';
import { HttpStatuscode } from '../src/utils/httpstatuscode';



interface DriverParams {
    id: string;
}

describe('GET /drivers/:id', () => {
        let server: FastifyInstance;
    
        let drivers: { id: number, name: string }[];

        beforeAll(async () => {
            drivers = [{ id: 1, name: 'Driver One' }]; 

            server = fastify();
    
            server.get<{Params: DriverParams}>('/drivers/:id', async (request, response) => {
                const id = parseInt(request.params.id);
                const driver = drivers.find((d) => d.id === id);
    
                if (!driver) {
                    response.type('application/json').code(HttpStatuscode.NotFound);
                    return { error: 'Driver not found' };
                } else {
                    response.type('application/json').code(HttpStatuscode.OK);
                    return { driver };
                }
            });
    
            await server.ready();
        });
    
        afterAll(async () => {
            await server.close();
        });
    
        it('should return a driver with status code 200', async () => {
            const response = await server.inject({
                method: 'GET',
                url: '/drivers/1',
            });
    
            expect(response.statusCode).toBe(HttpStatuscode.OK);
        });
    });