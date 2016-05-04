class AppendCss {
  constructor(css, { prepend } = {
    prepend: false
  }) {
    let ele = document.createElement('style');
    ele.textContent = css;
    if (document.head.firstChild && prepend === true) {
      document.head.insertBefore(ele, document.head.firstChild);
    } else {
      document.head.appendChild(ele);
    }
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
