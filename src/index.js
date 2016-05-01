class AppendCss {
  constructor(css) {
    let ele = document.createElement('style');
    ele.textContent = css;
    document.head.appendChild(ele);
    this.cssText = css;
    this.styleEle = ele;
  }

  enable() {
    this.styleEle.textContent = this.cssText;
  }

  disable() {
    this.styleEle.textContent = '';
  }

  set textContent(css) {
    this.cssText = css;
    this.styleEle.textContent = css;
  }

  get textContent() {
    return this.cssText;
  }

  dispose() {
    document.head.removeChild(this.styleEle);
    this.cssText = this.styleEle = null;
  }
}

module.exports = AppendCss;
