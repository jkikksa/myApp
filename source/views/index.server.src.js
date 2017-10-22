import React from 'react';
import {renderToString} from 'react-dom/server';
import {extractCritical} from 'emotion-server';
import serialize from 'serialize-javascript';
import {App} from '../client/components';

module.exports = (appData) => {
  const app = renderToString(<App data={appData} />);
  const {html, ids, css} = extractCritical(app);
  const viewData = `window.__data=${serialize({ids, appData})};`;

  return (
    <html lang="ru">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style
          type='text/css'
          dangerouslySetInnerHTML={{__html: css}}>
        </style>
        <link rel="stylesheet" href="css/style.css" />
        <link rel="shortcut icon" href="/public/favicon.ico" />
        <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
        <title>Hello, Node School App!</title>
      </head>
      <body>
        <div
          id='root'
          dangerouslySetInnerHTML={{__html: html}}>
        </div>
        <script dangerouslySetInnerHTML={{__html: viewData}}></script>
        <script src='js/script.js'></script>
      </body>
    </html>
  );
};
