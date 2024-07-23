class customHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header style="padding: 1rem; background-color: beige">
      <div style="display: flex">
        <div id="ham" class="toggle-btn" style="margin-right: 0.5rem">
          <a href="#"><i class="fi fi-br-menu-burger"></i></a>
        </div>
        <div><a href="">kcc마크</a></div>
      </div>
    </header>`;
  }
}

customElements.define("custom-header", customHeader);

class customNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `     <nav style="position:sticky; top:0;">
        <ul style="list-style: none; margin: 0; padding: 0">
          <li>menu</li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="/pages/material/materialPage.html">자재관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">입고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">출고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">입출고내역</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">기간별입출고순위</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">창고관리</a>
          </li>
        </ul>
      </nav>`;
  }
}

customElements.define("custom-nav", customNav);
