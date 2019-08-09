import './app.element.scss';

export class AppElement extends HTMLElement {
  public static observedAttributes = [];

  connectedCallback() {
    const title = 'parcel-vue';
    this.innerHTML = `
      <div style="text-align: center">
        <h1>Welcome to ${title}!</h1>
        <img
          width="450"
          src="https://raw.githubusercontent.com/nrwl/nx/master/nx-logo.png"
        />
      </div>
      <p>This is a Web Components app built with <a href="https://nx.dev/web">Nx</a>.</p>
      <p>🔎 **Nx is a set of Extensible Dev Tools for Monorepos.**</p>
      <h2>Quick Start & Documentation</h2>
      <ul>
        <li>
          <a href="https://nx.dev/web/getting-started/what-is-nx">10-minute video showing all Nx features</a>
        </li>
        <li>
          <a href="https://nx.dev/web/tutorial/01-create-application">Interactive tutorial</a>
        </li>
      </ul>
    `;
  }
}
customElements.define('parcel-vue-root', AppElement);
