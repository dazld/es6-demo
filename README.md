# ES3 code reimplemented in ES6

Taking some oldschool browser style modular code and showing how it could look using current practice.

## Topics

- Promises instead of callbacks, and error propagation
- Using modules instead of global namespace
- Using modules instead of IIFEs for private scope
- Importing dependencies
- Shorthand objects
- Default parameters
- Sets

## Tryout

- io.js 2.3+
- `npm install`
- `gulp`

## installing io.js

- if have node already installed, can get `n` for managing node versions
- `npm install -g n` will globally install `n`
- `n io latest` will install latest stable version of io
- just running `n` on its own will show a list of available local versions

## eslint

- ESLint supports more syntax variations than jshint 'out of the box'
- `npm install -g eslint`
- Will use either a `.eslintrc` file in home dir, or in root of project folder
- Sublime linting is achieved with `Sublimelinter-contrib-eslint` etc
- Sample rc is included in this project (opinions warning!)
