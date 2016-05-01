# append-css
[![Circle CI](https://circleci.com/gh/all-user/append-css/tree/master.svg?style=svg&circle-token=052e7e4aea660d94452196208b5389f79dafc197)](https://circleci.com/gh/all-user/append-css/tree/master)

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
