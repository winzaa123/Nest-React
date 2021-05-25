import * as TypeORM from "typeorm";
require('dotenv').config({path:"../.env"})
function getArgs() {
    const args = {}
    process.argv
      .slice(2, process.argv.length)
      .forEach(arg => {
        // long arg
        if (arg.slice(0, 2) === '--') {
          const longArg = arg.split('=');
          const longArgFlag = longArg[0].slice(2, longArg[0].length);
          const longArgValue = longArg.length > 1 ? longArg[1] : true;
          args[longArgFlag] = longArgValue;
        }
        // flags
        else if (arg[0] === '-') {
          const flags = arg.slice(1, arg.length).split('');
          flags.forEach(flag => {
            args[flag] = true;
          });
        }
      });
    return args;
  }
const args = getArgs();
async function main() {
    let sync = false,
    dropSchema = false
  if (args['type'] == 'sync') {
    sync = true
  }
  if (args['type'] == 'droptable') {
    dropSchema = true
  }
  console.log(`connect : ${process.env["POSTGRES_DB"]} - ${process.env["POSTGRES_HOST"]}`)

    await TypeORM.createConnection({
        type: 'postgres',
        database: process.env["POSTGRES_DB"],
        username: process.env["POSTGRES_USER"], // fill this with your username
        password: process.env["POSTGRES_PASSWORD"], // and password
        host: process.env["POSTGRES_HOST"],
        port: +process.env["POSTGRES_PORT"],    
        entities: [
            __dirname + '/src/../**/*.entity{.ts,.js}',
        ],
        logger: "advanced-console",
        logging: "all",
        synchronize: sync, // if value == false  and create new db it will don't create
        dropSchema,
        // dropSchema: true,
        // cache: {
        //   type: "redis",
        //   options: {
        //     host: process.env["REDIS_HOST"],
        //     port: 6379,
        //     password: process.env["REDIS_PASSWORD"]
        //   }
        // }
      })

      
  console.log('Okk')
  process.exit()

}

main()