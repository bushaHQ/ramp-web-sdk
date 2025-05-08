# Busha Ramp Web SDK

Buy and sell

## Installation

As a package

```
yarn add @busha/ramp-web

# OR

npm i @busha/ramp-web
```

```
import BushaCommerce from "@busha/ramp-web";
```

Browser(via CDN)

```
<script src="https://cdn.jsdelivr.net/npm/@busha/ramp-web/dist/index.min.js"></script>

<script>
    const { BushaRampWidget } = window.BushaRampWeb

    const ramp = new BushaRampWidget({
        publicKey: "pub_1S34",
        side: "buy",
        onSuccess: () => {},
        onClose: () => {},
    })

    ramp.show();
</script>
```
