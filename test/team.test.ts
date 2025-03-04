import fastify, { FastifyInstance } from "fastify";
import { teams } from '../src/F1teams/team';
import { HttpStatuscode } from "../src/utils/httpstatuscode";


describe('GET /teams', () => {
    let app: FastifyInstance;

    beforeAll(async () => {
        app = fastify();

        app.get('/teams', async (request, response) => {
            response.type('application/json').code(HttpStatuscode.OK);
            return { teams };
        });

        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it('should return a list of teams with status code 200', async () => {
        const response = await app.inject({
            method: 'GET',
            url: '/teams',
        });

        expect(response.statusCode).toBe(HttpStatuscode.OK);
        expect(response.json()).toEqual({ teams });
    });
})