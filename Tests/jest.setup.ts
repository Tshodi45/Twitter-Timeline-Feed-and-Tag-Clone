//setup code needed before running tests
import { sequelize } from "../src/models";
import  jest from 'jest';

beforeAll(async () => {
    await sequelize.sync({ force: true});
});

afterAll(async () => {
    await sequelize.close();
});