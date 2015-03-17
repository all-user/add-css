# append-css

Append css rule to document.

```html
<script src="./browser/build.js"></script>
<script>
var appendCSS = require('append-css');

// append new rule
appendCSS('body { background: black; }');

// reseet appended rules
appendCSS.reset();
</script>
```
