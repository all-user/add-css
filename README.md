# append-css

Append css rule to document.
Used in conjuction with the browserify.

    appendCSS = require 'append-css'

    appendCSS '''
      body { background: black; }

      .annotation {
        width: 0;
        heigth: 0;
        visibility: hidden;
      }
    '''
