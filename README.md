Ambient Light IoT
=================

This is the code for an ambient light IoT device, that sets the color of the
light based on the weather.

It uses an ESP8266 to host a web server, and React for a front end.


## Setup

To get setup for the ESP, install the ESP8266 Arduino boards.
The board to select (that this was developed on at least) is ESPDuino rev-13.

When the dashboard has been built, move the build artifacts to the data dir of
the Arduino project. Then you're able to use the ESP Data Uploader plugin for
Arduino IDE to access it (be sure to remove map files, and other unused files).

It is not necessary to run the data uploader every time a change is made to the
Arduino code but not the dashboard.

When developing the dashboard, you can run `REACT_APP_ESP_URL="..." yarn start`
which will prefix the API URLs with the value set (replace `...`).
For example `REACT_APP_ESP_URL="http://192.168.0.11" yarn start` will make the
weather request to `http://192.168.0.11/api/weather`.

When running the build command, the value is defaulted to an empty string.
Because the build is hosted on the ESP it does not need the prefix (and can't
reliably determin it in production).

Without it being defaulted (via the build script), it would end up being
`undefined/api/...` and not work.
