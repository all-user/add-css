# append-css

Append css rule to document.  
This is wrapper for `<style></style>` element.

```html
<script src="./browser/build.js"></script>
<script>
var AppendCss = require('append-css');

// append new rule
let appendedRules = new AppendCss(`
  body {
    background: black;
  }
`);

// disable rules
appendedRules.disable();

// change rules
appendedRules.textContent = `
  body {
    width: 100%;
  }
`;

// enable rules
appendedRules.enable();

// dispose appended rules and <style></style> element
appendedRules.dispose();
</script>
```
