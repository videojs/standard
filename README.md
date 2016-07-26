# video.js Standard Style

[![travis][travis-image]][travis-url]
[![npm][npm-image]][npm-url]
[![downloads][downloads-image]][downloads-url]

### JavaScript style for plugins and tools in the video.js ecosystem.

No decisions to make. No `.eslintrc`, `.jshintrc`, or `.jscsrc` files to manage. It just works.

This module saves you (and others!) time in two ways:

- **No configuration.** The easiest way to enforce consistent style in your module/project. Just drop it in.
- **Catch style errors before they're submitted in PRs.** Saves precious code review time by eliminating back-and-forth between maintainer and contributor.

## Install

```bash
npm install videojs-standard
```

## Usage

The easiest way to use video.js Standard Style to check your code is to install it globally as a Node command line program. To do so, simply run the following command in your terminal (flag `-g` installs `vjsstandard` globally on your system, omit it if you want to install in the current working directory):

```bash
npm install videojs-standard -g
```

After you've done that you should be able to use the `vjsstandard` program. The simplest use case would be checking the style of all JavaScript files in the current working directory:

```
$ vjsstandard
Error: Use video.js Standard Style
  lib/torrent.js:950:11: Expected '===' and instead saw '=='.
```

### What you might do if you're clever

1. Add it to `package.json`

  ```json
  {
    "name": "my-cool-package",
    "devDependencies": {
      "videojs-standard": "^3.0.0"
    },
    "scripts": {
      "test": "vjsstandard && node my-tests.js"
    }
  }
  ```

2. Check style automatically when you run `npm test`

  ```
  $ npm test
  Error: Use video.js Standard Style
    lib/torrent.js:950:11: Expected '===' and instead saw '=='.
  ```

3. Never give style feedback on a pull request again!

## Contributing

This project should almost never change.

A rule should only change if there is a _very_ compelling reason that the video.js core contributors have agreed upon by discussion in an issue.

### Versioning Guidelines

Because this project can cause builds to fail, we want to avoid any potentially breaking changes outside of major versions. Because this project is mostly a collection of dependencies, any change to those dependencies will require a version change in this project equal to the highest version change in dependencies.

- A dependency being updated by a major version will be a **major** version of videojs-standard.
- A dependency being updated by a minor version will be a **minor** version of videojs-standard.
- A dependency being updated by a patch version will be a **patch** version of videojs-standard.

Combined with the rules outlined [in eslint-config-videojs](https://github.com/videojs/eslint-config-videojs/blob/master/README.md#versioning-guidelines), this should allow common version ranges (`~` and `^`) to _never_ introduce a change that could break someone's build due to linter errors!

## FAQ

### Why would I use video.js Standard Style?

The beauty of video.js Standard Style is that it's simple. No one wants to maintain multiple hundred-line style configuration files for every module/project they work on.

Enough of this madness!

This module saves you time in two ways:

- **No configuration.** The easiest way to enforce consistent style in your
  module/project. Just drop it in.
- **Catch style errors before they're submitted in PRs.** Saves precious code review time
  by eliminating back-and-forth between maintainer and contributor.

Adopting `videojs-standard` style means ranking the importance of code clarity and community conventions higher than personal style. This might not make sense for 100% of projects and development cultures, however open source can be a hostile place for newbies. Setting up clear, automated contributor expectations makes a project healthier.

### I disagree with rule X, can you change it?

No. The the whole point of `videojs-standard` is to avoid [bikeshedding][bikeshedding] about style. There are lots of debates online about tabs vs. spaces, etc. that will never be resolved. These debates just distract from getting stuff done. At the end of the day you have to 'just pick something', and that's the whole philosophy of `videojs-standard` -- its a bunch of sensible 'just pick something' opinions. Hopefully, users see the value in that over defending their own opinions.

### But this isn't a real web standard!

Of course it's not! The style laid out here is not affiliated with any official web standards groups, which is why this repo is called `videojs/standard` and not `ECMA/standard`.

The word "standard" has more meanings than just "web standard" :-) For example:

- This module helps hold our code to a high *standard of quality*.
- This module ensures that new contributors follow some basic *style standards*.

### Is there an automatic formatter?

__Note: at the moment, this feature is not functional, but will be brought back for a future release!__

Yes! Just run `vjsstandard --format filename.js`. This uses the video.js fork of [Max Ogden][max]'s automatic formatter [`videojs-standard-format`][videojs-standard-format], which can automatically fix most code issues.

While most issues can be fixed, some, like not handling errors in node-style callbacks, must be fixed manually.

### How do I ignore files?

The paths `node_modules/**`, `*.min.js`, `bundle.js`, `coverage/**`, hidden files/folders (beginning with `.`), and all patterns in a project's root `.gitignore` file are automatically ignored.

Sometimes you need to ignore additional folders or specific minfied files. To do that, add a `vjsstandard.ignore` property to `package.json`:

```json
"vjsstandard": {
  "ignore": [
    "**/out/**",
    "**/lib/select2/**",
    "**/lib/ckeditor/**"
  ]
}
```

### How do I hide a certain warning?

In rare cases, you'll need to break a rule and hide the warning generated by `vjsstandard`.

video.js Standard Style uses [`eslint`](http://eslint.org/) under-the-hood and you can hide warnings as you normally would if you used `eslint` directly.

Use the eslint inline directives like: `/*eslint no-console:0*/` or `/*eslint-disable*/` 

To get verbose output (so you can find the particular rule name to ignore), run:

```bash
$ vjsstandard --verbose
Error: Use video.js Standard Style
  routes/error.js:20:36: 'file' was used before it was defined. (no-use-before-define)
```

Disable **all rules** on a specific line:

```js
file = 'I know what I am doing' // eslint-disable-line
```

Or, disable **only** the `"no-use-before-define"` rule:

```js
file = 'I know what I am doing' // eslint-disable-line no-use-before-define
```

Or, disable the `"no-use-before-define"` rule for **multiple lines**:

```js
/*eslint-disable no-use-before-define */
// offending code here...
// offending code here...
// offending code here...
/*eslint-enable no-use-before-define */
```

### Can you make rule X configurable?

No. Use `eslint` directly if you want to configure hundreds of options individually.

Pro tip: Just use `vjsstandard` and move on. There are actual real problems that you could spend your time solving! :P

### What about Web Workers?

Web workers have a magic global variable called `self`. In regular JS files, `vjsstandard` won't let you use `self` directly, as it wants to prevent accidental use of `window.self`. But `vjsstandard` has no way of knowing when you are in a `worker` and therefore does not know when to allow usage of `self` directly.

Until we figure out a better solution, we recommend adding this to the top of workers:

```
/* global self */
```

This lets `vjsstandard` (as well as humans reading your code) know that `self` is a global in web worker code.

### Is there a Git `pre-commit` hook for `vjsstandard`?

Sure! Add the following to the `.git/hooks/pre-commit` script in your repository:

```sh
#!/bin/sh

# Ensure all JS files staged for commit pass video.js Standard Style
git diff --name-only --cached --relative | grep '\.js$' | xargs vjsstandard
exit $?
```

## License

Apache-2.0. Copyright (c) [Brightcove, Inc.][bcov]

This project is based on [`standard`][standard], which is licensed under the MIT license and copyright (c) Feross Aboukhadijeh.

[bcov]: https://www.brightcove.com/
[bikeshedding]: https://www.freebsd.org/doc/en_US.ISO8859-1/books/faq/misc.html#idp60694736
[downloads-image]: https://img.shields.io/npm/dm/videojs-standard.svg?style=flat
[downloads-url]: https://npmjs.org/package/videojs-standard
[max]: https://github.com/maxogden
[standard]: https://github.com/feross/standard
[travis-image]: https://img.shields.io/travis/videojs/standard.svg?style=flat
[travis-url]: https://travis-ci.org/videojs/standard
[videojs-standard]: https://github.com/videojs/standard
[videojs-standard-format]: https://github.com/videojs/standard-format
[npm-image]: https://img.shields.io/npm/v/videojs-standard.svg?style=flat
[npm-url]: https://npmjs.org/package/videojs-standard
[travis-image]: https://img.shields.io/travis/videojs/standard.svg?style=flat
[travis-url]: https://travis-ci.org/videojs/standard
