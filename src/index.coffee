class AppendCss
  constructor: (cssText) ->
    @cssText = cssText
    @styleEle = document.createElement 'style'
    @styleEle.textContent = @cssText
    document.head.appendChild @styleEle

  enable: ->
    @styleEle.textContent = @cssText

  disable: ->
    @styleEle.textContent = ''

  setCss: (cssText) ->
    @styleEle.textContent = cssText

  dispose: ->
    document.head.removeChild @styleEle
    @cssText = @styleEle = null

module.exports = AppendCss
