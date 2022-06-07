import { g as getContext, c as create_ssr_component, a as subscribe, b as add_attribute, v as validate_component } from "../../chunks/index-5d6c164c.js";
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    page: {
      subscribe: stores.page.subscribe
    },
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    get preloading() {
      console.error("stores.preloading is deprecated; use stores.navigating instead");
      return {
        subscribe: stores.navigating.subscribe
      };
    },
    session: stores.session,
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
var logo = "/_app/immutable/assets/svelte-logo-87df40b8.svg";
var Header_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "header.svelte-t2wq17.svelte-t2wq17{display:flex;justify-content:space-between}.corner.svelte-t2wq17.svelte-t2wq17{width:3em;height:3em}.corner.svelte-t2wq17 a.svelte-t2wq17{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-t2wq17 img.svelte-t2wq17{width:2em;height:2em;object-fit:contain}nav.svelte-t2wq17.svelte-t2wq17{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-t2wq17.svelte-t2wq17{width:2em;height:3em;display:block}path.svelte-t2wq17.svelte-t2wq17{fill:var(--background)}ul.svelte-t2wq17.svelte-t2wq17{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-t2wq17.svelte-t2wq17{position:relative;height:100%}li.active.svelte-t2wq17.svelte-t2wq17::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-t2wq17 a.svelte-t2wq17{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-t2wq17.svelte-t2wq17:hover{color:var(--accent-color)}")();
const css$1 = {
  code: "header.svelte-t2wq17.svelte-t2wq17{display:flex;justify-content:space-between}.corner.svelte-t2wq17.svelte-t2wq17{width:3em;height:3em}.corner.svelte-t2wq17 a.svelte-t2wq17{display:flex;align-items:center;justify-content:center;width:100%;height:100%}.corner.svelte-t2wq17 img.svelte-t2wq17{width:2em;height:2em;object-fit:contain}nav.svelte-t2wq17.svelte-t2wq17{display:flex;justify-content:center;--background:rgba(255, 255, 255, 0.7)}svg.svelte-t2wq17.svelte-t2wq17{width:2em;height:3em;display:block}path.svelte-t2wq17.svelte-t2wq17{fill:var(--background)}ul.svelte-t2wq17.svelte-t2wq17{position:relative;padding:0;margin:0;height:3em;display:flex;justify-content:center;align-items:center;list-style:none;background:var(--background);background-size:contain}li.svelte-t2wq17.svelte-t2wq17{position:relative;height:100%}li.active.svelte-t2wq17.svelte-t2wq17::before{--size:6px;content:'';width:0;height:0;position:absolute;top:0;left:calc(50% - var(--size));border:var(--size) solid transparent;border-top:var(--size) solid var(--accent-color)}nav.svelte-t2wq17 a.svelte-t2wq17{display:flex;height:100%;align-items:center;padding:0 1em;color:var(--heading-color);font-weight:700;font-size:0.8rem;text-transform:uppercase;letter-spacing:0.1em;text-decoration:none;transition:color 0.2s linear}a.svelte-t2wq17.svelte-t2wq17:hover{color:var(--accent-color)}",
  map: null
};
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$result.css.add(css$1);
  $$unsubscribe_page();
  return `<header class="${"svelte-t2wq17"}"><div class="${"corner svelte-t2wq17"}"><a href="${"https://kit.svelte.dev"}" class="${"svelte-t2wq17"}"><img${add_attribute("src", logo, 0)} alt="${"SvelteKit"}" class="${"svelte-t2wq17"}"></a></div>

	<nav class="${"svelte-t2wq17"}"><svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-t2wq17"}"><path d="${"M0,0 L1,2 C1.5,3 1.5,3 2,3 L2,0 Z"}" class="${"svelte-t2wq17"}"></path></svg>
		<ul class="${"svelte-t2wq17"}"><li class="${["svelte-t2wq17", $page.url.pathname === "/" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/"}" class="${"svelte-t2wq17"}">Home</a></li>
			<li class="${["svelte-t2wq17", $page.url.pathname === "/about" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/about"}" class="${"svelte-t2wq17"}">About</a></li>
			<li class="${["svelte-t2wq17", $page.url.pathname === "/todos" ? "active" : ""].join(" ").trim()}"><a sveltekit:prefetch href="${"/todos"}" class="${"svelte-t2wq17"}">Todos</a></li></ul>
		<svg viewBox="${"0 0 2 3"}" aria-hidden="${"true"}" class="${"svelte-t2wq17"}"><path d="${"M0,0 L0,3 C0.5,3 0.5,3 1,2 L2,0 Z"}" class="${"svelte-t2wq17"}"></path></svg></nav>

	<div class="${"corner svelte-t2wq17"}"></div>
</header>`;
});
var app = /* @__PURE__ */ (() => "/* fira-mono-cyrillic-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-cyrillic-ext-400-normal-3df7909e.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F, U+FE2E-FE2F;\n}\n/* fira-mono-cyrillic-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-cyrillic-400-normal-c7d433fd.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;\n}\n/* fira-mono-greek-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-greek-ext-400-normal-9e2fe623.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+1F00-1FFF;\n}\n/* fira-mono-greek-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-greek-400-normal-a8be01ce.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+0370-03FF;\n}\n/* fira-mono-latin-ext-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-latin-ext-400-normal-6bfabd30.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+0100-024F, U+0259, U+1E00-1EFF, U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;\n}\n/* fira-mono-latin-400-normal*/\n@font-face {\n  font-family: 'Fira Mono';\n  font-style: normal;\n  font-display: swap;\n  font-weight: 400;\n  src: url('/_app/immutable/assets/fira-mono-latin-400-normal-e43b3538.woff2') format('woff2'), url('/_app/immutable/assets/fira-mono-all-400-normal-1e3b098c.woff') format('woff');\n  unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;\n}\n:root {\n	font-family: Arial, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,\n		Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;\n	--font-mono: 'Fira Mono', monospace;\n	--pure-white: #ffffff;\n	--primary-color: #b9c6d2;\n	--secondary-color: #d0dde9;\n	--tertiary-color: #edf0f8;\n	--accent-color: #ff3e00;\n	--heading-color: rgba(0, 0, 0, 0.7);\n	--text-color: #444444;\n	--background-without-opacity: rgba(255, 255, 255, 0.7);\n	--column-width: 42rem;\n	--column-margin-top: 4rem;\n}\nbody {\n	min-height: 100vh;\n	margin: 0;\n	background-color: var(--primary-color);\n	background: linear-gradient(\n		180deg,\n		var(--primary-color) 0%,\n		var(--secondary-color) 10.45%,\n		var(--tertiary-color) 41.35%\n	);\n}\nbody::before {\n	content: '';\n	width: 80vw;\n	height: 100vh;\n	position: absolute;\n	top: 0;\n	left: 10vw;\n	z-index: -1;\n	background: radial-gradient(\n		50% 50% at 50% 50%,\n		var(--pure-white) 0%,\n		rgba(255, 255, 255, 0) 100%\n	);\n	opacity: 0.05;\n}\n#svelte {\n	min-height: 100vh;\n	display: flex;\n	flex-direction: column;\n}\nh1,\nh2,\np {\n	font-weight: 400;\n	color: var(--heading-color);\n}\np {\n	line-height: 1.5;\n}\na {\n	color: var(--accent-color);\n	text-decoration: none;\n}\na:hover {\n	text-decoration: underline;\n}\nh1 {\n	font-size: 2rem;\n	text-align: center;\n}\nh2 {\n	font-size: 1rem;\n}\npre {\n	font-size: 16px;\n	font-family: var(--font-mono);\n	background-color: rgba(255, 255, 255, 0.45);\n	border-radius: 3px;\n	box-shadow: 2px 2px 6px rgb(255 255 255 / 25%);\n	padding: 0.5em;\n	overflow-x: auto;\n	color: var(--text-color);\n}\ninput,\nbutton {\n	font-size: inherit;\n	font-family: inherit;\n}\nbutton:focus:not(:focus-visible) {\n	outline: none;\n}\n@media (min-width: 720px) {\n	h1 {\n		font-size: 2.4rem;\n	}\n}\n")();
var __layout_svelte_svelte_type_style_lang = /* @__PURE__ */ (() => "main.svelte-1izrdc8.svelte-1izrdc8{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:1024px;margin:0 auto;box-sizing:border-box}footer.svelte-1izrdc8.svelte-1izrdc8{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px}footer.svelte-1izrdc8 a.svelte-1izrdc8{font-weight:bold}@media(min-width: 480px){footer.svelte-1izrdc8.svelte-1izrdc8{padding:40px 0}}")();
const css = {
  code: "main.svelte-1izrdc8.svelte-1izrdc8{flex:1;display:flex;flex-direction:column;padding:1rem;width:100%;max-width:1024px;margin:0 auto;box-sizing:border-box}footer.svelte-1izrdc8.svelte-1izrdc8{display:flex;flex-direction:column;justify-content:center;align-items:center;padding:40px}footer.svelte-1izrdc8 a.svelte-1izrdc8{font-weight:bold}@media(min-width: 480px){footer.svelte-1izrdc8.svelte-1izrdc8{padding:40px 0}}",
  map: null
};
const _layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `${validate_component(Header, "Header").$$render($$result, {}, {}, {})}

<main class="${"svelte-1izrdc8"}">${slots.default ? slots.default({}) : ``}</main>

<footer class="${"svelte-1izrdc8"}"><p>visit <a href="${"https://kit.svelte.dev"}" class="${"svelte-1izrdc8"}">kit.svelte.dev</a> to learn SvelteKit</p>
</footer>`;
});
export { _layout as default };
