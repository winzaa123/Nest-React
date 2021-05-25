import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { InventoryModule } from './../src/inventory/inventory.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';

import {
    FastifyAdapter,
    NestFastifyApplication,
  } from '@nestjs/platform-fastify';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Product, ProductCategories } from './../src/inventory/inventory.entity';
import { Like, Repository } from 'typeorm';
import * as supertest from 'supertest';


describe('InventoryController (e2e)', () => {
    let app: NestFastifyApplication;

    let productRepo: Repository<Product>;
    let productCategorieRepo: Repository<ProductCategories>;

    let countProduct = 0
    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [
                InventoryModule,
                TypeOrmModule.forRootAsync({
                    imports: [ConfigModule],
                    inject: [ConfigService],
                    useFactory: (configService: ConfigService) => ({
                        type: 'postgres',
                        host: configService.get('POSTGRES_HOST'),
                        port: configService.get('POSTGRES_PORT'),
                        username: configService.get('POSTGRES_USER'),
                        password: configService.get('POSTGRES_PASSWORD'),
                        database: configService.get('POSTGRES_DB'),
                        entities: [
                            __dirname + '/../**/*.entity{.ts,.js}',
                        ],
                        logger: "advanced-console",
                        logging: "all",
                        synchronize: true,
                    }),
                })

            ],
        }).compile();

        app = moduleFixture.createNestApplication<NestFastifyApplication>(
            new FastifyAdapter(),
          );

          app.useGlobalPipes(new ValidationPipe({
            transform: true
          }));

        await app.init();
        await app.getHttpAdapter().getInstance().ready();


        productRepo = moduleFixture.get('ProductRepository');
        productCategorieRepo = moduleFixture.get('ProductCategoriesRepository');
    });

    it('/product (GET)', () => {
        return request(app.getHttpServer())
            .get('/product')
            .expect(404)
    });

    describe('InventoryCont. - Test Sequence', () => {

        it('/product (POST) - price incorrect (String)', async () => {
            const body = {
                name : `productCreateFailedTest-${new Date().getTime()}`,
                price : "akscjskajc"
            }
            await supertest.agent(app.getHttpServer())
            .post('/product')
            .send(body)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(400);
        });
        it('/product (POST) - price incorrect (required number type)', async () => {
            const body = {
                name : `productCreateFailedTest-${new Date().getTime()}`,
                price : "500.5000"
            }
            const res = await supertest.agent(app.getHttpServer())
            .post('/product')
            .send(body)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(400);
            // console.log(res)
        })

        it('/product (POST) - categorieId incorrect', async () => {
            const body = {
                name : `productCreateFailedTest-${new Date().getTime()}`,
                price : 500,
                categorieId: 0
            }
            await supertest.agent(app.getHttpServer())
            .post('/product')
            .send(body)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(500);
        });
    
        it('/product (POST) - Success', async () => {
            return  await supertest.agent(app.getHttpServer())
            .post('/product')
            .send({
                name : `productCreateTest-${new Date().getTime()}`,
                price : 1001
              })
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(201);
        });


        it('/product/search (GET) : Current Count After Create', async () => {
            const { body } = await supertest.agent(app.getHttpServer())
            .get('/product/search')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
    
            countProduct = body.length
        })
        it('/product/search (GET)', async () => {
    
            // await productRepo.save(productRepo.create([
            //     { name: 'test-name-0',price:100 },
            //   { name: 'test-name-1',price:200 },
            //   { name: 'test-name-2',price:300 },
            // ]));
            const { body } = await supertest.agent(app.getHttpServer())
                .get('/product/search')
                .set('Accept', 'application/json')
                .expect('Content-Type', /json/)
    
            expect(body.length).toEqual(countProduct);
        });

        it('/product (PATCH) - Update & Delete Success', async () => {
            const {id} = await productRepo.findOne({name:Like(`productCreateTest%`)},{select:["id"]})

            const productTarget = `updateDataTest-${new Date().getTime()}`
            await supertest.agent(app.getHttpServer())
            .patch(`/product/${id}`)
            .send({
                name : productTarget ,
                price : 1001
              })
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(200);

            const {name} = await productRepo.findOne({name: productTarget},{select:["id","name"]})

            expect(name).toEqual(productTarget)

            await supertest.agent(app.getHttpServer())
            .delete(`/product/${id}`)
              .set('Content-Type', 'application/json')
              .set('Accept', 'application/json')
            .expect(200);
        });
    })


    afterAll(async () => {
        await app.close();
    });
});
