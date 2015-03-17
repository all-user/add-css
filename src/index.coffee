styleEle = null

_init = ->
  styleEle = document.createElement 'style'
  document.head.appendChild styleEle

appendCSS = (rule) ->
  styleEle.sheet.insertRule rule, 0
  styleEle

appendCSS.reset = ->
  document.head.removeChild styleEle
  _init()

_init()

module.exports = appendCSS
