## Quick-start

### Codegen

After pulling the code head to `codegen.js` and modify as mentioned below:

*   The JSON object represents the `{Name of the Page : routeUrl}`.
*   For default purpose the user needs to maintain `"/"` always in one of  `routeUrl` as value for any `Name of the Page` for the root landing page.
*   Order of the JSON value is important, that's how the UI will be rendered.
*   All the files will be auto generated under `src/app/Pages/` path with necessary basic implementations based on the user input as per the `inputJson`.

```plaintext
const inputJson = {
  'Landing Page': '/',
  'Single Nav Item': '/single-nav-item',
  'Group Nav Item': {
    'Group Nav Item 1': '/group-nav-item-1',
    'Group Nav Item 2': '/group-nav-item-2',
  },
};
```

This will be the generated Navigation Item(s) and routes. After that the `npm install` will take care of everything.

```plaintext
# localhost url
http://localhost:4200/ui-template/
```

```plaintext
npm install && npm run start:dev
```

## Development scripts

```plaintext
# Install development/build dependencies
npm install

# Start the development server
npm run start:dev

# Run a production build (outputs to "dist" dir)
npm run build

# Run the test suite
npm run test

# Run the test suite with coverage
npm run test:coverage

# Run the linter
npm run lint

# Run the code formatter
npm run format

# Launch a tool to inspect the bundle size
npm run bundle-profile:analyze

# Start the express server (run a production build first)
npm run start

# Start storybook component explorer
npm run storybook

# Build storybook component explorer as standalone app (outputs to "storybook-static" dir)
npm run build:storybook
```

## Configurations

*   [TypeScript Config](./tsconfig.json)
*   [Webpack Config](./webpack.common.js)
*   [Jest Config](./jest.config.js)
*   [Editor Config](./.editorconfig)

## Raster image support

To use an image asset that's shipped with PatternFly core, you'll prefix the paths with "@assets". `@assets` is an alias for the PatternFly assets directory in node\_modules.

For example:

```plaintext
import imgSrc from '@assets/images/g_sizing.png';
<img src={imgSrc} alt="Some image" />
```

You can use a similar technique to import assets from your local app, just prefix the paths with "@app". `@app` is an alias for the main src/app directory.

```plaintext
import loader from '@app/assets/images/loader.gif';
<img src={loader} alt="Content loading />
```

## Vector image support

Inlining SVG in the app's markup is also possible.

```plaintext
import logo from '@app/assets/images/logo.svg';
<span dangerouslySetInnerHTML={{__html: logo}} />
```

You can also use SVG when applying background images with CSS. To do this, your SVG's must live under a `bgimages` directory (this directory name is configurable in [webpack.common.js](./webpack.common.js#L5)). This is necessary because you may need to use SVG's in several other context (inline images, fonts, icons, etc.) and so we need to be able to differentiate between these usages so the appropriate loader is invoked.

```css
body {
  background: url(./assets/bgimages/img_avatar.svg);
}
```

## Adding custom CSS

When importing CSS from a third-party package for the first time, you may encounter the error `Module parse failed: Unexpected token... You may need an appropriate loader to handle this file typ...`. You need to register the path to the stylesheet directory in [stylePaths.js](./stylePaths.js). We specify these explicity for performance reasons to avoid webpack needing to crawl through the entire node\_modules directory when parsing CSS modules.

## Code quality tools

*   For accessibility compliance, we use [react-axe](https://github.com/dequelabs/react-axe)
*   To keep our bundle size in check, we use [webpack-bundle-analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
*   To keep our code formatting in check, we use [prettier](https://github.com/prettier/prettier)
*   To keep our code logic and test coverage in check, we use [jest](https://github.com/facebook/jest)
*   To ensure code styles remain consistent, we use [eslint](https://eslint.org/)
*   To provide a place to showcase custom components, we integrate with [storybook](https://storybook.js.org/)

## Multi environment configuration

This project uses [dotenv-webpack](https://www.npmjs.com/package/dotenv-webpack) for exposing environment variables to your code. Either export them at the system level like `export MY_ENV_VAR=http://dev.myendpoint.com && npm run start:dev` or simply drop a `.env` file in the root that contains your key-value pairs like below:

```plaintext
ENV_1=http://1.myendpoint.com
ENV_2=http://2.myendpoint.com
```

With that in place, you can use the values in your code like `console.log(process.env.ENV_1);`
