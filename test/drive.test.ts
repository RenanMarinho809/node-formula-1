import fastify, { FastifyInstance } from 'fastify';
import { HttpStatuscode } from '../src/utils/httpstatuscode';
import { drivers } from '../src/F1drivers/driver';


describe('GET /drivers', () => {
    let server: FastifyInstance;
  
    beforeAll(async () => {
      server = fastify();
  
      server.get('/drivers', async (request, response) => {
        response.type('application/json').code(HttpStatuscode.OK);
        return { drivers };
      });
  
      await server.ready();
    });
  
    afterAll(async () => {
      await server.close();
    });
  
    it('should return a list of drivers with status code 200', async () => {
      const response = await server.inject({
        method: 'GET',
        url: '/drivers',
      });
  
      expect(response.statusCode).toBe(HttpStatuscode.OK);
      expect(response.headers['content-type']).toBe('application/json; charset=utf-8');
      expect(JSON.parse(response.payload)).toEqual({ drivers });
    });
  });