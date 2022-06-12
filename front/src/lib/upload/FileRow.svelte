<!-- This is just a modified version of @smui/data-table/Row to
support animations. This is good enough for now, but I would like to use animate:flip, except that the compiler can't tell that <tr> really is the direct child of a keyed #each... 

See: https://github.com/sveltejs/svelte/issues/7209
  -->
  <script context="module">
  let counter = 0;
</script>

<script>
  //import {flip} from 'svelte/animate';
  import {fly} from 'svelte/transition';
  import { onMount, getContext } from 'svelte';
  import { get_current_component } from 'svelte/internal';
  import {
    forwardEventsBuilder,
    classMap,
    useActions,
    dispatch,
  } from '@smui/common/internal';


  const forwardEvents = forwardEventsBuilder(get_current_component());

  // Remember to update types file if you add/remove/rename props.
  export let use = [];
  let className = '';
  export { className as class };
  export let rowId = 'SMUI-data-table-row-' + counter++;

  let element;
  let checkbox = undefined;
  let internalClasses = {};
  let internalAttrs = {};
  let header = getContext('SMUI:data-table:row:header');

  onMount(() => {
    const accessor = header
      ? {
          _smui_data_table_row_accessor: false,
          get element() {
            return getElement();
          },
          get checkbox() {
            return checkbox;
          },
          get rowId() {
            return undefined;
          },
          get selected() {
            return (checkbox && checkbox.checked) ?? false;
          },
          addClass,
          removeClass,
          getAttr,
          addAttr,
        }
      : {
          _smui_data_table_row_accessor: true,
          get element() {
            return getElement();
          },
          get checkbox() {
            return checkbox;
          },
          get rowId() {
            return rowId;
          },
          get selected() {
            return (checkbox && checkbox.checked) ?? false;
          },
          addClass,
          removeClass,
          getAttr,
          addAttr,
        };

    dispatch(getElement(), 'SMUIDataTableRow:mount', accessor);

    return () => {
      dispatch(getElement(), 'SMUIDataTableRow:unmount', accessor);
    };
  });

  function addClass(className) {
    if (!internalClasses[className]) {
      internalClasses[className] = true;
    }
  }

  function removeClass(className) {
    if (!(className in internalClasses) || internalClasses[className]) {
      internalClasses[className] = false;
    }
  }

  function getAttr(name) {
    return name in internalAttrs
      ? internalAttrs[name] ?? null
      : getElement().getAttribute(name);
  }

  function addAttr(name, value) {
    if (internalAttrs[name] !== value) {
      internalAttrs[name] = value;
    }
  }

  function notifyHeaderClick(event) {
    dispatch(getElement(), 'SMUIDataTableHeader:click', event);
  }

  function notifyRowClick(event) {
    dispatch(getElement(), 'SMUIDataTableRow:click', {
      rowId,
      target: event.target,
    });
  }

  export function getElement() {
    return element;
  }
</script>

<tr
  in:fly
  out:fly={{duration: 100}}
  bind:this={element}
  use:useActions={use}
  use:forwardEvents
  class={classMap({
    [className]: true,
    'mdc-data-table__header-row': header,
    'mdc-data-table__row': !header,
    'mdc-data-table__row--selected': !header && checkbox && checkbox.checked,
    ...internalClasses,
  })}
  on:click={(event) =>
    header ? notifyHeaderClick(event) : notifyRowClick(event)}
  on:SMUICheckbox:mount={(event) => (checkbox = event.detail)}
  on:SMUICheckbox:unmount={() => (checkbox = undefined)}
  aria-selected={checkbox ? (checkbox.checked ? 'true' : 'false') : undefined}
  {...internalAttrs}
  {...$$restProps}><slot /></tr
>

