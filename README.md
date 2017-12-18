## Docker
 - `sudo docker build -t "mail_tests_selenium" ./` - build
 - `sudo docker run -e DISPLAY=unix$DISPLAY -v /tmp/.X11-unix:/tmp/.X11-unix -p 4444:4444 -d mail_tests_selenium
` - run
    - if error `Error: cannot open display: unix:0.0` appears, execute `xhost +local:`