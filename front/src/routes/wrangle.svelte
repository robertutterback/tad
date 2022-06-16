<script context="module">
  export async function load({ session }) {
    if (!session?.user)
      return { status: 302, redirect: '/protected' };
    return { props: { user: session.user } };
  }
</script>

This is wrangle.
