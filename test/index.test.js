require('babel-polyfill');
const assert = require('assert');
const INTERVAL = 0;

describe('append css', function() {
  const AppendCss = require('../src');
  let div = document.createElement('div');
  div.id = 'test-div';
  let innerDiv = document.createElement('div');
  innerDiv.className = 'inner-div';
  let appendedRulesList = [];

  beforeEach('css reset phase', done => {
    if (appendedRulesList.length === 0) { done(); return; }

    appendedRulesList.forEach(s => {
      return s.dispose();
    });

    appendedRulesList = [];
    done();
  });

  describe('rule apply to style', () => {
    before('add div to document for test.', done => {
      document.body.appendChild(div);
      done();
    });

    it('width', done => {
      appendedRulesList.push(new AppendCss('#test-div { width: 500px; }'));

      setTimeout(() => {
        assert.equal('500px', getComputedStyle(div).width);
        done();
      }, INTERVAL);
    });

    it('height', done => {
      appendedRulesList.push(new AppendCss('#test-div { height: 800px; }'));

      setTimeout(() => {
        assert.equal('800px', getComputedStyle(div).height);
        done();
      }, INTERVAL);
    });

    it('background color', done => {
      appendedRulesList.push(new AppendCss('#test-div { background: #fff; }'));

      setTimeout(() => {
        assert.equal('rgb(255, 255, 255)', getComputedStyle(div).backgroundColor);
        done();
      }, INTERVAL);
    });

    it('color', done => {
      appendedRulesList.push(new AppendCss('#test-div { color: #0aa; }'));

      setTimeout(() => {
        assert.equal('rgb(0, 170, 170)', getComputedStyle(div).color);
        done();
      }, INTERVAL);
    });

    it('apply multipul styles', done => {
      appendedRulesList.push(
        new AppendCss(`
          #test-div {
            background: #445;
            color: #f7f7fa;
            width: 600px;
            height: 1200px;
          }
        `)
      );

      setTimeout(() => {
        assert.equal('rgb(68, 68, 85)', getComputedStyle(div).backgroundColor);
        assert.equal('rgb(247, 247, 250)', getComputedStyle(div).color);
        assert.equal('600px', getComputedStyle(div).width);
        assert.equal('1200px', getComputedStyle(div).height);
        done();
      }, INTERVAL);
    });
  });

  describe('overlap rule', function() {
    before('add innerdiv to div.', done => {
      for (let i = 0; i < 10; i++) {
        div.appendChild(innerDiv.cloneNode());
      }
      done();
    });

    it('append same hierarchy rules, apply last appended rule', done => {
      appendedRulesList.push(new AppendCss('.inner-div { background: #eef; }'));
      appendedRulesList.push(new AppendCss('.inner-div { background: #fff; }'));

      setTimeout(() => {
        [...document.querySelectorAll('.inner-div')].forEach(inndiv => {
          assert.equal('rgb(255, 255, 255)', getComputedStyle(inndiv).backgroundColor);
        });
        done();
      }, INTERVAL);
    });

    it('append stronger rule on first, apply fisrt appended rule', done => {
      appendedRulesList.push(new AppendCss('#test-div .inner-div { background: #eef; }'));
      appendedRulesList.push(new AppendCss('.inner-div { background: #fff; }'));

      setTimeout(() => {
        [...document.querySelectorAll('.inner-div')].forEach(inndiv => {
          assert.equal('rgb(238, 238, 255)', getComputedStyle(inndiv).backgroundColor);
        });
        done();
      }, INTERVAL);
    });

    it('append stronger rule on last, apply last appended rule', function(done) {
      appendedRulesList.push(new AppendCss('.inner-div { background: #fff; }'));
      appendedRulesList.push(new AppendCss('#test-div .inner-div { background: #eef; }'));
      setTimeout(() => {
        [...document.querySelectorAll('.inner-div')].forEach(inndiv => {
          assert.equal('rgb(238, 238, 255)', getComputedStyle(inndiv).backgroundColor);
        });
        done();
      }, INTERVAL);
    });

    it('apply to pesudo element -> wrpper & inner div -> wrapper div', done => {
      appendedRulesList.push(
        new AppendCss(`
          #test-div:after {
            content: '...';
            position: absolute;
            display: block;
            width: 83px;
            box-shadow: -1px 0px 0px rgb(180,180,180);
            height: 100px;
            top: -70px;
            background: #fff;
            z-index: 20;
          }

          #test-div,
          .inner-div {
            color: #8888aa;
            margin: 24px 0px;
            padding: 0 0 2px 18px;
            border-left: 2px solid #8888aa;
          }

          #test-div {
            vertical-align: middle;
            display: inline-block;
            height: 20px;
            line-height: 20px;
            font-size: 12px;
            background: #ccccdd;
            text-align: center;
            padding: 0 4px 0 7px;
            color: #fff;
            border-radius: 0px 2px 2px 0px;
            border: none;
            position: relative;
            width: 1040px;
            margin: 1px 8px 1px 0;
          }
        `)
      );

      setTimeout(() => {
        assert.ok(/[.]{3}/.test(getComputedStyle(div, ':after').content));
        assert.equal('absolute', getComputedStyle(div, ':after').position);
        assert.equal('block', getComputedStyle(div, ':after').display);

        assert.equal(
          'rgb(180, 180, 180) -1px 0px 0px 0px',
          getComputedStyle(div, ':after').boxShadow
        );

        assert.equal('-70px', getComputedStyle(div, ':after').top);
        assert.equal('rgb(255, 255, 255)', getComputedStyle(div, ':after').backgroundColor);
        assert.equal('20', getComputedStyle(div, ':after').zIndex);
        assert.equal('rgb(255, 255, 255)', getComputedStyle(div).color);
        assert.equal('1px', getComputedStyle(div).marginTop);
        assert.equal('8px', getComputedStyle(div).marginRight);
        assert.equal('1px', getComputedStyle(div).marginBottom);
        assert.equal('0px', getComputedStyle(div).marginLeft);
        assert.equal('0px', getComputedStyle(div).paddingTop);
        assert.equal('4px', getComputedStyle(div).paddingRight);
        assert.equal('0px', getComputedStyle(div).paddingBottom);
        assert.equal('7px', getComputedStyle(div).paddingLeft);
        assert.equal('0px', getComputedStyle(div).borderTopWidth);
        assert.equal('none', getComputedStyle(div).borderTopStyle);
        assert.equal('rgb(255, 255, 255)', getComputedStyle(div).borderTopColor);
        assert.equal('middle', getComputedStyle(div).verticalAlign);
        assert.equal('inline-block', getComputedStyle(div).display);
        assert.equal('20px', getComputedStyle(div).height);
        assert.equal('20px', getComputedStyle(div).lineHeight);
        assert.equal('12px', getComputedStyle(div).fontSize);
        assert.equal('rgb(204, 204, 221)', getComputedStyle(div).backgroundColor);
        assert.equal('center', getComputedStyle(div).textAlign);
        assert.equal('0px', getComputedStyle(div).borderTopLeftRadius);
        assert.equal('2px', getComputedStyle(div).borderTopRightRadius);
        assert.equal('2px', getComputedStyle(div).borderBottomRightRadius);
        assert.equal('0px', getComputedStyle(div).borderBottomLeftRadius);
        assert.equal('relative', getComputedStyle(div).position);

        [...document.querySelectorAll('.inner-div')].forEach(inndiv => {
          assert.equal('rgb(136, 136, 170)', getComputedStyle(inndiv).color);
          assert.equal('24px', getComputedStyle(inndiv).marginTop);
          assert.equal('0px', getComputedStyle(inndiv).marginRight);
          assert.equal('24px', getComputedStyle(inndiv).marginBottom);
          assert.equal('0px', getComputedStyle(inndiv).marginLeft);
          assert.equal('0px', getComputedStyle(inndiv).paddingTop);
          assert.equal('0px', getComputedStyle(inndiv).paddingRight);
          assert.equal('2px', getComputedStyle(inndiv).paddingBottom);
          assert.equal('18px', getComputedStyle(inndiv).paddingLeft);
          assert.equal('2px', getComputedStyle(inndiv).borderLeftWidth);
          assert.equal('solid', getComputedStyle(inndiv).borderLeftStyle);
          assert.equal('rgb(136, 136, 170)', getComputedStyle(inndiv).borderLeftColor);
        });

        done();
      }, INTERVAL);
    });
  });

  describe('enable', () => {
    it('enable style', () => {
      let appendedRules = new AppendCss('#test-div { background: rgb(57, 33, 158); }');
      appendedRulesList.push(appendedRules);

      return new Promise((resolve, reject) => {
        assert.equal('rgb(57, 33, 158)', getComputedStyle(div).backgroundColor);
        resolve();
      }).then(() => {
        appendedRules.disable();
      }).then(() => {
        assert.notEqual('rgb(57, 33, 158)', getComputedStyle(div).backgroundColor);
      }).then(() => {
        appendedRules.enable();
      }).then(() => {
        assert.equal('rgb(57, 33, 158)', getComputedStyle(div).backgroundColor);
      });
    });
  });

  describe('disable', () => {
    it('disable style', () => {
      let appendedRules = new AppendCss('#test-div { background: rgb(57, 33, 158); }');
      appendedRulesList.push(appendedRules);

      return new Promise((resolve, reject) => {
        assert.equal('rgb(57, 33, 158)', getComputedStyle(div).backgroundColor);
        resolve();
      }).then(() => {
        appendedRules.disable();
      }).then(() => {
        assert.notEqual('rgb(57, 33, 158)', getComputedStyle(div).backgroundColor);
      });
    });

    it('background -> disable -> background, width', done => {
      let appendedRules = new AppendCss('#test-div { background: rgb(57, 33, 158); }');
      appendedRules.disable();
      appendedRules.textContent = `
        #test-div {
          background: rgb(123,45,67);
          width: 1234px;
        }
      `;
      appendedRulesList.push(appendedRules);

      setTimeout(() => {
        assert.equal('rgb(123, 45, 67)', getComputedStyle(div).backgroundColor);
        assert.equal('1234px', getComputedStyle(div).width);
        done();
      }, INTERVAL);
    });

    it('left -> disable -> box-shadow, text-shadow', done => {
      let appendedRules = new AppendCss('#test-div { left: 500px; }');
      appendedRules.disable();
      appendedRules.textContent = `
        #test-div {
          box-shadow: 20px 20px 20px 5px rgb(239, 211, 7);
          text-shadow: 12px 3px 3px rgb(0,0,0);
        }
      `;
      appendedRulesList.push(appendedRules);

      setTimeout(() => {
        assert.equal('rgb(239, 211, 7) 20px 20px 20px 5px', getComputedStyle(div).boxShadow);
        assert.equal('rgb(0, 0, 0) 12px 3px 3px', getComputedStyle(div).textShadow);
        assert.notEqual('500px', getComputedStyle(div).left);
        done();
      }, INTERVAL);
    });

    it('border-left, border-right -> disable -> border-radius, border', done => {
      let appendedRules = new AppendCss(`
        #test-div,
        .inner-div {
          border-left: rgb(57, 179, 199) dashed 5px;
          border-right: rgba(61, 251, 0) solid 12px;
        }
      `);
      appendedRules.disable();
      appendedRules.textContent = `
        #test-div,
        .inner-div {
          border-radius: 20px 20px 200px 5px / 120px 15px 30px 77px;
          border: 22px dotted #33aaff;
        }
      `;
      appendedRulesList.push(appendedRules);

      setTimeout(() => {
        assert.equal('20px 120px', getComputedStyle(div).borderTopLeftRadius);
        assert.equal('20px 15px', getComputedStyle(div).borderTopRightRadius);
        assert.equal('200px 30px', getComputedStyle(div).borderBottomRightRadius);
        assert.equal('5px 77px', getComputedStyle(div).borderBottomLeftRadius);
        assert.equal('22px', getComputedStyle(div).borderTopWidth);
        assert.equal('dotted', getComputedStyle(div).borderRightStyle);
        assert.equal('rgb(51, 170, 255)', getComputedStyle(div).borderBottomColor);
        [...document.querySelectorAll('.inner-div')].forEach(function(inndiv) {
          assert.equal('22px', getComputedStyle(inndiv).borderTopWidth);
          assert.equal('dotted', getComputedStyle(inndiv).borderRightStyle);
          assert.equal('rgb(51, 170, 255)', getComputedStyle(inndiv).borderBottomColor);
        });

        done();
      }, INTERVAL);
    });
  });

  describe('change style element', () => {
    it('append css in new style element', done => {
      let appendedRules1 = new AppendCss('.inner-div { background: rgb(57, 33, 158); }');
      let appendedRules2 = new AppendCss(`
        #test-div {
          background: rgb(123,45,67);
          width: 1234px;
        }
      `);
      appendedRulesList.push(appendedRules1, appendedRules2);

      setTimeout(() => {
        [...document.querySelectorAll('.inner-div')].forEach(inndiv => {
          assert.equal('rgb(57, 33, 158)', getComputedStyle(inndiv).backgroundColor);
        });
        assert.equal('rgb(123, 45, 67)', getComputedStyle(div).backgroundColor);
        assert.equal('1234px', getComputedStyle(div).width);
        assert.notEqual(appendedRules1.styleEle, appendedRules2.styleEle);
        done();
      }, INTERVAL);
    });
  });

  describe('dispose', () => {
    it('dispose style element', () => {
      let appendedRules = new AppendCss('#test-div { background: rgb(22, 33, 44); }');
      appendedRulesList.push(appendedRules);

      return new Promise((resolve, reject) => {
        assert.equal('rgb(22, 33, 44)', getComputedStyle(div).backgroundColor);
        assert.ok(document.head.contains(appendedRules.styleEle));
        resolve();
      }).then(() => {
        appendedRules.dispose();
      }).then(() => {
        assert.notEqual('rgb(22, 33, 44)', getComputedStyle(div).backgroundColor);
        assert.equal(document.head.contains(appendedRules.styleEle), false);
      });
    });
  });
});
