# dchristopher

Work history and contact form for Daniel Christopher. Hosted at [dchristopher.me](https://www.dchristopher.me)

## Overview

A simple website to practice writing Clojurescript. Hosted on Netlify.

## Setup

To get an interactive development environment run:

    lein figwheel

and open your browser at [localhost:3449](http://localhost:3449/).
This will auto compile and send all changes to the browser without the
need to reload. After the compilation process is complete, you will
get a Browser Connected REPL. An easy way to try it is:

    (js/alert "Am I connected?")

and you should see an alert in the browser window.

To clean all compiled files:

    lein clean

To create a production build run:

    lein do clean, cljsbuild once min

And open your browser in `resources/public/index.html`. You will not
get live reloading, nor a REPL.

### Style compilation

To compile [sass](https://github.com/Deraen/sass4clj) sources and then watch for changes and recompile until interrupted, run

```
lein sass4clj auto
```

## License

Copyright © 2019 Daniel Christopher

Distributed under the Eclipse Public License either version 1.0 or (at your option) any later version.
