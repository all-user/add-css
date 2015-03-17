coffee -o ./lib ./src/index.coffee && browserify -r ./lib/index.js:append-css > ./browser/build.js
