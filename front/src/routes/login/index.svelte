<script context="module">
  export async function load({ session }) {
    if (session?.user) // if already logged in, go home
      return { status: 302, redirect: '/' };
    return {};
  }
</script>


<script>
  import { goto } from '$app/navigation';

  import Textfield from '@smui/textfield';
  import Button, { Label as ButtonLabel } from '@smui/button';
  import Paper, { Title } from '@smui/paper';
  import Snackbar, { Label as SnackbarLabel } from '@smui/snackbar';

  let username='', password='';
  let errorMsg = '', errorSnackbar;

  async function login(e) {
    const response = await fetch('/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: {
	'Content-Type': 'application/json',
	'accept': 'application/json'
      }
    });

    if (!response.ok) {
      errorMsg = (await response.json()).message;
      errorSnackbar.open();
      return;
    }

    console.log(await response.json());
    
    // goto doesn't seem to reload session, so it still looks like the
    // user is not logged in.
    //goto('/');
    window.location = '/';
  }
</script>



<p style="text-align: center;">
  Note: this website is not yet secure. Username and password are sent in cleartext.
</p>

<Paper elevation=7 style="width: fit-content; margin: auto;">
  <Title>Login</Title>
  <form on:submit|preventDefault={login}>
    <Textfield
      bind:value={username} label="username" required />
    <br/>
    <Textfield
      bind:value={password} label="password" required type="password" />
    <br/>
    <div style="display: flex; margin-top: 1rem; justify-content: right;">
    <Button
      variant="raised" type="submit"><ButtonLabel>Login</ButtonLabel></Button>
    </div>
  </form>
  <Snackbar bind:this={errorSnackbar}>
    <SnackbarLabel>{errorMsg}</SnackbarLabel>
  </Snackbar>
</Paper>
