class customHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<header style="padding: 1rem; background-color: beige">
      <div style="display: flex">
        <div id="ham" class="toggle-btn" style="margin-right: 0.5rem">
          <a href="">햄버거 버튼</a>
        </div>
        <div><a href="">kcc마크</a></div>
      </div>
    </header>`;
  }
}

customElements.define("custom-header", customHeader);

class customNav extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `     <nav>
        <ul style="list-style: none; margin: 0; padding: 0">
          <li>menu</li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">Dashboard</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
          <li>
            <a style="padding: 1rem 2rem; display: block" href="">재고관리</a>
          </li>
        </ul>
      </nav>`;
  }
}

customElements.define("custom-nav", customNav);
