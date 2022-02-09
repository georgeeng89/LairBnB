npx sequelize model:generate --name User --attributes username:string,email:string,hashedPassword:string

npx sequelize model:generate --name Spot --attributes userId:integer,address:string,city:string,state:string,country:string,lat:decimal,lng:decimal,name:string,price:decimal

npx sequelize model:generate --name Review --attributes spotId:integer,userId:integer,review:string

npx sequelize model:generate --name Booking --attributes spotId:integer,userId:integer,startDate:date,endDate:date

npx sequelize model:generate --name Image --attributes spotId:integer,url:string



npx sequelize seed:generate --name demo-user

npx sequelize seed:generate --name spotSeed

npx sequelize seed:generate --name reviewSeed

npx sequelize seed:generate --name bookingSeed

npx sequelize seed:generate --name imageSeed
