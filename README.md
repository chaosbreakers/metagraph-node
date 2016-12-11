# metagraph-node

## Usage

Add `npm` dependency in `package.json`.

```json
{
  "name": "awesome-project",
  "dependencies": {
    "metagraph-node": "^0.1.0"
  }
}
```

Start playing with graphs.

```javascript
import Metagraph from 'metagraph-node';

const mg = new Metagraph();
const g = mg.addGraph();

const v = g.addVertex('PLANET');
v.setProperties({ 'name': 'Mars' });
```

## Contribute

First, clone the repo via git:

```bash
git clone git@github.com:openmg/metagraph-node.git
```

And then install dependencies.

```bash
$ cd metagraph-node && npm install
```

## Editor Configuration
**Atom**
```bash
apm install autocomplete-flow autocomplete-modules ava editorconfig es6-javascript language-babel linter linter-flow linter-xo
```
