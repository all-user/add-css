styleEle = null

_init = ->
  styleEle = document.createElement 'style'
  document.head.appendChild styleEle

appendCSS = (rule) ->
  sheet = styleEle.sheet
  sheet.insertRule rule, sheet.cssRules.length
  styleEle

appendCSS.reset = ->
  document.head.removeChild styleEle
  _init()

appendCSS.newStyle = ->
  _init()

_init()

module.exports = appendCSS
