assert = require 'assert'

describe 'append css', ->
  appendCSS = require '../lib'
  div = document.createElement 'div'
  div.id = 'test-div'
  innerDiv = document.createElement 'div'
  innerDiv.className = 'inner-div'


  beforeEach 'css reset phase', (done) ->
    appendCSS.reset()
    done()


  describe 'rule apply to style', ->
    it 'width', (done) ->
      document.body.appendChild div
      appendCSS '#test-div { width: 500px; }'
      setTimeout ->
        assert.equal '500px', getComputedStyle(div).width
        done()
      , 50

    it 'height', (done) ->
      appendCSS '#test-div { height: 800px; }'
      setTimeout ->
        assert.equal '800px', getComputedStyle(div).height
        done()
      , 50

    it 'background color', (done) ->
      appendCSS '#test-div { background: #fff; }'
      setTimeout ->
        assert.equal 'rgb(255, 255, 255)', getComputedStyle(div).backgroundColor
        done()
      , 50

    it 'color', (done) ->
      appendCSS '#test-div { color: #0aa; }'
      setTimeout ->
        assert.equal 'rgb(0, 170, 170)', getComputedStyle(div).color
        done()
      , 50

    it 'apply multipul styles', (done) ->
      appendCSS '''
        #test-div {
          background: #445;
          color: #f7f7fa;
          width: 600px;
          height: 1200px;
        }
      '''
      setTimeout ->
        assert.equal 'rgb(68, 68, 85)', getComputedStyle(div).backgroundColor
        assert.equal 'rgb(247, 247, 250)', getComputedStyle(div).color
        assert.equal '600px', getComputedStyle(div).width
        assert.equal '1200px', getComputedStyle(div).height
        done()
      , 50


  describe 'overlap rule', ->
    it 'append same hierarchy rules, apply last appended rule', (done) ->
      div.appendChild innerDiv.cloneNode() for _ in [0..9]
      appendCSS '.inner-div { background: #eef; }'
      appendCSS '.inner-div { background: #fff; }'
      setTimeout ->
        Array::forEach.call document.querySelectorAll('.inner-div'), (inndiv) ->
          assert.equal 'rgb(255, 255, 255)', getComputedStyle(inndiv).backgroundColor
        done()
      , 50

    it 'append stronger rule on first, apply fisrt appended rule', (done) ->
      appendCSS '#test-div .inner-div { background: #eef; }'
      appendCSS '.inner-div { background: #fff; }'
      setTimeout ->
        Array::forEach.call document.querySelectorAll('.inner-div'), (inndiv) ->
          assert.equal 'rgb(238, 238, 255)', getComputedStyle(inndiv).backgroundColor
        done()
      , 50

    it 'append stronger rule on last, apply last appended rule', (done) ->
      appendCSS '.inner-div { background: #fff; }'
      appendCSS '#test-div .inner-div { background: #eef; }'
      setTimeout ->
        Array::forEach.call document.querySelectorAll('.inner-div'), (inndiv) ->
          assert.equal 'rgb(238, 238, 255)', getComputedStyle(inndiv).backgroundColor
        done()
      , 50

    it 'apply to pesudo element -> wrpper & inner div -> wrapper div', (done) ->
      appendCSS '''
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
      '''
      appendCSS '''
        #test-div,
        .inner-div {
          color: #8888aa;
          margin: 24px 0px;
          padding: 0 0 2px 18px;
          border-left: 2px solid #8888aa;
        }
      '''
      appendCSS '''
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
      '''
      setTimeout ->
        # pseudo element
        assert.ok /[.]{3}/.test(getComputedStyle(div, ':after').content)
        assert.equal 'absolute', getComputedStyle(div, ':after').position
        assert.equal 'block', getComputedStyle(div, ':after').display
        assert.equal 'rgb(180, 180, 180) -1px 0px 0px 0px', getComputedStyle(div, ':after').boxShadow
        assert.equal '-70px', getComputedStyle(div, ':after').top
        assert.equal 'rgb(255, 255, 255)', getComputedStyle(div, ':after').backgroundColor
        assert.equal '20', getComputedStyle(div, ':after').zIndex
        # wrpper div
        assert.equal 'rgb(255, 255, 255)', getComputedStyle(div).color
        assert.equal '1px', getComputedStyle(div).marginTop
        assert.equal '8px', getComputedStyle(div).marginRight
        assert.equal '1px', getComputedStyle(div).marginBottom
        assert.equal '0px', getComputedStyle(div).marginLeft
        assert.equal '0px', getComputedStyle(div).paddingTop
        assert.equal '4px', getComputedStyle(div).paddingRight
        assert.equal '0px', getComputedStyle(div).paddingBottom
        assert.equal '7px', getComputedStyle(div).paddingLeft
        assert.equal '0px', getComputedStyle(div).borderTopWidth
        assert.equal 'none', getComputedStyle(div).borderTopStyle
        assert.equal 'rgb(255, 255, 255)', getComputedStyle(div).borderTopColor
        assert.equal 'middle', getComputedStyle(div).verticalAlign
        assert.equal 'inline-block', getComputedStyle(div).display
        assert.equal '20px', getComputedStyle(div).height
        assert.equal '20px', getComputedStyle(div).lineHeight
        assert.equal '12px', getComputedStyle(div).fontSize
        assert.equal 'rgb(204, 204, 221)', getComputedStyle(div).backgroundColor
        assert.equal 'center', getComputedStyle(div).textAlign
        assert.equal '0px', getComputedStyle(div).borderTopLeftRadius
        assert.equal '2px', getComputedStyle(div).borderTopRightRadius
        assert.equal '2px', getComputedStyle(div).borderBottomRightRadius
        assert.equal '0px', getComputedStyle(div).borderBottomLeftRadius
        assert.equal 'relative', getComputedStyle(div).position
        # inner div
        Array::forEach.call document.querySelectorAll('.inner-div'), (inndiv) ->
          assert.equal 'rgb(136, 136, 170)', getComputedStyle(inndiv).color
          assert.equal '24px', getComputedStyle(inndiv).marginTop
          assert.equal '0px', getComputedStyle(inndiv).marginRight
          assert.equal '24px', getComputedStyle(inndiv).marginBottom
          assert.equal '0px', getComputedStyle(inndiv).marginLeft
          assert.equal '0px', getComputedStyle(inndiv).paddingTop
          assert.equal '0px', getComputedStyle(inndiv).paddingRight
          assert.equal '2px', getComputedStyle(inndiv).paddingBottom
          assert.equal '18px', getComputedStyle(inndiv).paddingLeft
          assert.equal '2px', getComputedStyle(inndiv).borderLeftWidth
          assert.equal 'solid', getComputedStyle(inndiv).borderLeftStyle
          assert.equal 'rgb(136, 136, 170)', getComputedStyle(inndiv).borderLeftColor
        done()
      , 50


  describe 'sandwich the reset', ->
    it 'background -> reset -> background, width', (done) ->
      appendCSS '#test-div { background: rgba(57, 33, 158); }'
      appendCSS.reset()
      appendCSS '''
        #test-div {
          background: rgb(123,45,67);
          width: 1234px;
        }
      '''
      setTimeout ->
        assert.equal 'rgb(123, 45, 67)', getComputedStyle(div).backgroundColor
        assert.equal '1234px', getComputedStyle(div).width
        done()
      , 50

    it 'left -> reset -> box-shadow, text-shadow', (done) ->
      appendCSS '#test-div { left: 500px; }'
      appendCSS.reset()
      appendCSS '''
        #test-div {
          box-shadow: 20px 20px 20px 5px rgb(239, 211, 7);
          text-shadow: 12px 3px 3px rgb(0,0,0);
        }
      '''
      setTimeout ->
        assert.equal 'rgb(239, 211, 7) 20px 20px 20px 5px', getComputedStyle(div).boxShadow
        assert.equal 'rgb(0, 0, 0) 12px 3px 3px', getComputedStyle(div).textShadow
        assert.notEqual '500px', getComputedStyle(div).left
        done()
      , 50

    it 'border-left, border-right -> reset -> border-radius, border', (done) ->
      appendCSS '''
        #test-div,
        .inner-div {
          border-left: rgb(57, 179, 199) dashed 5px;
          border-right: rgba(61, 251, 0) solid 12px;
        }
      '''
      appendCSS.reset()
      appendCSS '''
        #test-div,
        .inner-div {
          border-radius: 20px 20px 200px 5px / 120px 15px 30px 77px;
          border: 22px dotted #33aaff;
        }
      '''
      setTimeout ->
        innerDivs = Array::slice.call document.querySelectorAll('.inner-div'), 0
        assert.equal '20px 120px', getComputedStyle(div).borderTopLeftRadius
        assert.equal '20px 15px', getComputedStyle(div).borderTopRightRadius
        assert.equal '200px 30px', getComputedStyle(div).borderBottomRightRadius
        assert.equal '5px 77px', getComputedStyle(div).borderBottomLeftRadius
        assert.equal '22px', getComputedStyle(div).borderTopWidth
        assert.equal 'dotted', getComputedStyle(div).borderRightStyle
        assert.equal 'rgb(51, 170, 255)', getComputedStyle(div).borderBottomColor
        innerDivs.forEach (inndiv) ->
          assert.equal '22px', getComputedStyle(inndiv).borderTopWidth
          assert.equal 'dotted', getComputedStyle(inndiv).borderRightStyle
          assert.equal 'rgb(51, 170, 255)', getComputedStyle(inndiv).borderBottomColor
        done()
      , 50

  describe 'change style element', ->
    it 'append css in new style element', (done) ->
      oldStyle = appendCSS '.inner-div { background: rgb(57, 33, 158); }'
      newStyle = appendCSS.newStyle()
      _newStyle = appendCSS '''
        #test-div {
          background: rgb(123,45,67);
          width: 1234px;
        }
      '''
      setTimeout ->
        innerDivs = Array::slice.call document.querySelectorAll('.inner-div'), 0
        innerDivs.forEach (inndiv) ->
          assert.equal 'rgb(57, 33, 158)', getComputedStyle(inndiv).backgroundColor
        assert.equal 'rgb(123, 45, 67)', getComputedStyle(div).backgroundColor
        assert.equal '1234px', getComputedStyle(div).width
        assert.notEqual oldStyle, newStyle
        assert.equal newStyle, _newStyle
        done()
      , 50
