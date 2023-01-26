# [@voidpkg/console](https://npmjs.com/package/@voidpkg/console)
[Do you need my help? Visit our Discord server.](https://voiddevs.org/discord)

![NPM Downloads](https://img.shields.io/npm/dm/@voidpkg/console?style=for-the-badge)
![License](https://img.shields.io/npm/l/@voidpkg/console?style=for-the-badge)
```bash
Node Version >= 16.16.0
```

### Installation
```bash
npm i @voidpkg/console --save
# or
yarn add @voidpkg/console
```

<br>

### Importing

```js
// CJS
require("@voidpkg/console");

// ESM
import "@voidpkg/console";
```

<br>

# Usage

```js
// Importing
import { Consoler } from '@voidpkg/console'; // ESM
const { Consoler } = require('@voidpkg/console'); // CJS
new Consoler({
    timestamp: false, // (default: false)
    variant: 'background', // or 'foreground' (default: 'foreground')
    title: "Global Title" // (default: 'SUCCESS', 'ERROR', 'WARN', 'INFO', 'LOADING')
});


// Basic Usage
console.success('Successfully passed!');
console.error('An error occurred!');
console.warn('This is a warning!');
console.info('This is an info message!');

// With Custom Style
console.success('This is a {b}bold{reset}{c.green} message!{r}', { title: 'Custom Title' });
console.error('This is a {bold}bold and {italic}italic{reset}{c.red} message!{r}', { title: 'Custom Title' });
console.warn('This is a {i}italic{r}{c.yellow}  and {b}bold{r}{c.yellow} message!{r}', { title: 'Custom Title' });
console.info('This is a {i}italic{r}{c.blue}, {b}bold{r}{c.blue} and {italic}{bold}both{reset}{c.blue} message!{r}', { title: 'Custom Title' });
console.info('The time is {tt}!{r}', { title: 'Custom Title' });
console.success('This is a {c.red}red{r}{c.green} message!{r}', { title: 'Custom Title' });
console.error('This is a {c.green}green{reset}{c.red} message and a timestamp!{r}', { title: 'Custom Title', timestamp: true });

// Loading
setTimeout(() => {
    console.loading(10 * 1000, '{indicator} Loading...', () => {
        console.success('Loading finished!');
    }, { title: 'Custom Title' });
}, 10000);
```

<br>

---
<h6 align="center">Developed with ❤️ by Void Development</h6>
