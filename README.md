<h1 align=center>HomeAssistant - Material Design Icons</h1>

Material Design Icons for [Home Assistant](https://www.home-assistant.io/) custom card development.

```
npm install @mibu/ha-mdi
```

The [Home Assistant frontend](https://github.com/home-assistant/frontend) bundles the latest MDI with [older icons](https://github.com/home-assistant/frontend/blob/dev/build-scripts/removedIcons.json) that were removed. Custom cards can use these icons by providing an icon identifier: `<icon-collection>:<icon-name>` (e.g. `mdi:home-assistant`).

This library provides these identifiers and also the SVG paths as an alternative.

## Usage

Javascript:

```ts
import { mdiHomeAssistant } from '@mibu/ha-mdi'; // Icon identifier
import { mdiHomeAutomation } from '@mibu/ha-mdi/path'; // SVG path

console.log(mdiHomeAssistant); // mdi:home-assistant
console.log(mdiHomeAutomation); // M12,3L2,12H5V20H19V12...
```

Svelte:

```svelte
<script>
  import { mdiHomeAssistant } from '@mibu/ha-mdi';
  import { mdiHomeAutomation } from '@mibu/ha-mdi/path';
</script>

<ha-icon icon={mdiHomeAssistant}/>
<ha-svg-icon path={mdiHomeAutomation}/>
```

## Related

- [Home Assistant Frontend](https://github.com/home-assistant/frontend)
- [Material Design Icons - SVG](https://github.com/Templarian/MaterialDesign-SVG)
