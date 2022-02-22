# <div align="center"> Express-Body-Encryption </div>

<div align="center">

Express-Body-Encryption 라이브러리는 Express 미들웨어 라이브러리 입니다.

</div>

### Alternate Rate Limiters

> 이 모듈은 기본적으로 다른 프로세스/서버와 상태를 공유하지 않습니다. 좀 더 강력한 솔루션이 필요하다면 외부 라이브러리를 이용하는 것을 추천합니다.

이 모듈은 기본 사항만 다루도록 설계되었으며 지원조차 하지 않았습니다. 작고 가볍지만 강력한 라이브러리를 사용하여 서버를 안정화시킬 수 있습니다.

## Installation

From Github Releases:

```sh
git clone https://github.com/A-big-fish-in-a-small-pond/Express-Concurrent-Control.git
```

## Usage

### Importing

이 라이브러리는 CJS 형태로 제공되며 자바스크립트와 타입스크립트 프로젝트 모두에서 사용할 수 있습니다.

아래는 CJS 형태에서 임포트를 하기 위한 방법입니다.

```ts
const { moduleExports } = require("./body-security");
```

### Examples

모든 요청에 적용해야 하는 API 전용 서버에서 사용하려면 아래와 같이 사용합니다:

```ts
const express = require("express");
const { moduleExports } = require("./body-security");
const app = express();

let options = {
    enabled: true /** 암호화를 시행하기 위해서는 명시해주어야 합니다. */,
    store: "default" /** 기본적인 키 저장은 메모리로부터 저장합니다. redis 를 따로 구현하셔도 됩니다. */,
    key: "abcdefghijklmnop" /** 암호화 키를 입력합니다. ipv4 의 암호화와 세션키를 암호화할 때 사용합니다. */,
    path: "/security" /** 세션키 발급을 위한 path 지정장소입니다. */,
    handler: null /** 세션키의 발급을 받지 않은채로 비인가 웹페이지로 접근할 경우 처리되는 핸들러입니다. */,
    accessPath: [] /** 암호화를 수행할 경로를 지정합니다. 경로를 지정하지 않을 경우 모든 post 메소드는 암호화처리를 수행합니다. */,
};

const security = moduleExports.expressEncryption(options);

/** middle ware */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(security.bodyEncryptionHandler); /** 암호화 핸들러를 미들웨어에 등록합니다. */

app.use("/", (req, res) => {
    setTimeout(() => {
        res.json({ ...req.body });
    }, 1);
});

app.listen(3000, "0.0.0.0", () => {
    console.log("server open");
});
```

## Issues and Contributing

If you encounter a bug or want to see something added/changed, please go ahead
and [open an issue](https://github.com/A-big-fish-in-a-small-pond/Express-Concurrent-Control/issues/new)!
If you need help with something, feel free to
[start a discussion](https://github.com/A-big-fish-in-a-small-pond/Express-Concurrent-Control/discussions/new)!

## License

MIT © [Park and Kim](http://github.com/nusgnojkrap)
MIT © [Park and Kim](http://github.com/libtv)
