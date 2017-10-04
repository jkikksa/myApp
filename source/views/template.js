import React from 'react';
import {renderToString} from 'react-dom/server';
import {App} from '../client/components';
import {extractCritical} from 'emotion-server';

const renderedApp = renderToString(<App/>);
const {css} = extractCritical(renderedApp);
const template = `
<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="css/common.css">
  <link rel="stylesheet" href="css/style.css">
  <link rel="shortcut icon" href="/public/favicon.ico">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Hello, Node School App!</title>
</head>
<body>
  <div id="root">
    ${renderedApp}
  </div>
  <script src="js/bundle.js"></script>
</body>
</html>
`;

export {css, template};
