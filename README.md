Node.js and databases Teamwork assignment- https://in.thecamp.me/resource/-Project-Assignment/4Z2SvRlg/JS-Nov-17-Module-3/6qZhL%2BTF





# Web Crawler

Individual project for @TelerikAcademy - JS track

## App Description

* Node.js CLI application
* scrapes http://www.technopolis.bg & https://smartphone.bg
* no APIs, parse each url with __jsdom__ and  __jquery__ 
* parses all of the phones' urls again with __jsdom__ and __jquery__ 
* ignores useless data, stores the important data 
* the application is based on asynchronous operations using __Promises__ and __Async/Awaits__.

## Available commands:

#### npm run 

  1. statistics (filter the data, prints the result)
    * filter:ram:method:value
    * search:details_column:value
    * order-by-brand:value (asc | desc)
  1. show-data (prints everything from the database)
  1. reset (delete the crawled data)


## Dependancies

  * jQuery
  * jsdom
  * mysql
  * mysql2
  * sequelize
  * sequelize-auto-migrations
