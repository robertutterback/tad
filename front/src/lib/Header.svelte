<script>
  import { page } from '$app/stores';
  import { mdiMenu, mdiAccount } from '@mdi/js'
</script>

<header>
  <div>
    <span>
      <svg viewBox="0 0 24 24">
	<path fill="currentColor" d={mdiMenu} />
      </svg>
    </span>
    <span>TAD</span>
  </div>

  <nav>
    <ul>
      <li class:active={$page.url.pathname === '/'}><a sveltekit:prefetch href="/">Home</a></li>
      <li class:active={$page.url.pathname === '/about'}>
	<a sveltekit:prefetch href="/about">About</a>
      </li>
      <li class:active={$page.url.pathname === '/datasets'}>
	<a sveltekit:prefetch href="/datasets">Datasets</a>
      </li>
    </ul>
  </nav>

  <div>
    <span>
      <svg viewBox="0 0 24 24">
	<path fill="currentColor" d={mdiAccount} />
      </svg>
    </span>
  </div>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
  }

  nav {
    display: flex;
    justify-content: center;
    --background: rgba(255, 255, 255, 0.7);
  }

  svg {
    width: 2em;
    height: 3em;
    display: block;
  }

  path {
    fill: var(--background);
  }

  ul {
    position: relative;
    padding: 0;
    margin: 0;
    height: 3em;
    display: flex;
    justify-content: center;
    align-items: center;
    list-style: none;
    background: var(--background);
    background-size: contain;
  }

  li {
    position: relative;
    height: 100%;
  }

  li.active::before {
    --size: 6px;
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: calc(50% - var(--size));
    border: var(--size) solid transparent;
    border-top: var(--size) solid var(--accent-color);
  }

  nav a {
    display: flex;
    height: 100%;
    align-items: center;
    padding: 0 1em;
    color: var(--heading-color);
    font-weight: 700;
    font-size: 0.8rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    text-decoration: none;
    transition: color 0.2s linear;
  }

  a:hover {
    color: var(--accent-color);
  }
</style>
