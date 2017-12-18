# mail_tests

## Description
it's an application that tests [mail.ru](https://mail.ru/) interface. 
It checks the contents of the auth form on the main page and makes successful and unsuccessful attempts to log in.  

## Getting started
 1. Download users db server from [here](https://github.com/OkciD/mail_users_db_server) and start it, following the 
 instructions of [its readme](https://github.com/OkciD/mail_users_db_server/blob/master/README.md)
 2. *WebdriverIO* needs *selenium-standalone-server* to be running while performing tests, that's why it was put in a 
 *Docker* container. Execute these scripts:
     - `sudo docker build -t "mail_tests_selenium" ./` - build
     - `sudo docker run -p 4444:4444 -d mail_tests_selenium` - run
 3. Run `npm install` and `npm test`