FROM ubuntu:16.04

RUN apt-get -y update

USER root

RUN apt-get install -y curl openjdk-8-jdk-headless firefox && apt-get clean all
RUN curl -O http://selenium-release.storage.googleapis.com/3.5/selenium-server-standalone-3.5.3.jar
RUN curl -L https://github.com/mozilla/geckodriver/releases/download/v0.16.0/geckodriver-v0.16.0-linux64.tar.gz | tar xz

EXPOSE 4444
CMD java -jar -Dwebdriver.gecko.driver=./geckodriver selenium-server-standalone-3.5.3.jar