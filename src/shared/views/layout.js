var Head = require('./components/head')
var Header = require('./components/header')
var Hamburger = require('./components/button-hamburger')
var Logo = require('./components/logo')
var Sidebar = require('./components/sidebar')
var Symbols = require('./components/symbols')
var md = require('marked')

// var script = require('./_script')
// ${script('menu-toggle')}

module.exports = function Layout (state, meta, content, ToC) {
  state = state || {}
  meta = meta || {}
  ToC = ToC || {}

  return `
<!DOCTYPE html>
<html lang="en">
${Head(meta)}
<body>
${Symbols}
<div class="d-flex-lg d-static h-100 o-hidden">
  <aside class="sidebar fg-0 h-100 p-fixed p-static-lg">
    ${Sidebar(state, ToC)}
  </aside>
  <section class="main h-100 fg-1 p-fixed p-static-lg o-scroll-y">
    <div class="d-flex fd-c bg-p1">
      <div class="h-100">
        <header>
          ${Hamburger()}
          <div class="ml4 d-flex pt-1">
            ${Logo({id: 'menu-close'})}
            <div class="d-flex fg-1 jc-e ai-c mr0">
              <a href="https://begin.com" class="fw-book c-p3">Sign up</a>
              <a href="https://github.com/login/oauth/authorize?scope=user:email,repo&amp;client_id=6b14f59e1d015e75badb&amp;redirect_uri=https://begin.com/login" class="cu-pointer pt-4 pr-2 pl-2 pb-3 ml-1 fs0 fw-medium bg-p2 bg-h2 bg-a1 br1 c-p5">Login</a>
            </div>
          </div>
        </header>
        <div class="p0" id="doc">
          <h1 class="fs3 mb2 pt0-lg">${meta.title}</h1>
          ${md(content)}
        </div>
      </div>
    </div>
  </section>
</div>
${state.scripts || ''}
<script>
(function () {
  var open = document.getElementById('menu-open')
  var close = document.getElementById('menu-close')
  var main = document.querySelector('.main')
  function toggle (e) {
    e.preventDefault()
    main.classList.toggle('slide-menu')
  }
  open.onclick = toggle
  close.onclick = toggle
}())
</script>
</body>
</html>
`
}
