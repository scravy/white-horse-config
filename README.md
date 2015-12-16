# white-horse-config

[![Build Status](https://travis-ci.org/scravy/white-horse-config.svg?branch=master)](https://travis-ci.org/scravy/white-horse-config)
[![Dependencies](https://david-dm.org/scravy/white-horse-config.svg)](https://david-dm.org/scravy/white-horse-config#info=dependencies&view=table)
[![Dependencies](https://david-dm.org/scravy/white-horse-config/dev-status.svg)](https://david-dm.org/scravy/white-horse-config#info=devDependencies&view=table)

Gives you the `$config` service for projects using [white-horse](https://github.com/scravy/white-horse) dependency injection.

## Usage

    npm install --save white-horse-config

If you are using the `usePackageJson` option (defaults to true) this will suffice to pull in the `$config` service. `$config` uses [confit](https://github.com/krakenjs/confit) for finding and reading configuration. By default it looks in `$root/config` for configuration.

Here is an example setup:

    package.json // dependencies: { white-horse: ..., white-horse-config: ... }
    index.js
    modules/hello.js
    modules/world.js
    config/config.json
    
`modules/hello.js` might look like this:

```JavaScript
module.export = function ($config, console) {
  console.log($config.greeting);
};
```

`modules/world.js` might look like this:

```JavaScript
module.export = function ($config, console) {
  console.log($config.greeting);
};
```

`config/config.json` might look like this:

```JSON
{
  "hello": {
    "greeting": "`hello` says hello."
  },
  "world": {
    "greeting": "`world` says hello."
  }
}
```

If you run an `index.js` like this:

```JavaScript
var WhiteHorse = require('white-horse');

var container = new WhiteHorse(require);

container.scan('modules', function (hello, world) {});
```

you should see

    `hello` says hello
    `world` says hello


## License (MIT)

    Copyright (c) 2015 Julian Alexander Fleischer

    Permission is hereby granted, free of charge, to any
    person obtaining a copy of this software and associated
    documentation files (the "Software"), to deal in the
    Software without restriction, including without
    limitation the rights to use, copy, modify, merge,
    publish, distribute, sublicense, and/or sell copies of
    the Software, and to permit persons to whom the Software
    is furnished to do so, subject to the following
    conditions:

    The above copyright notice and this permission notice
    shall be included in all copies or substantial portions
    of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF
    ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED
    TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
    PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
    THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
    DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF
    CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
    CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.

