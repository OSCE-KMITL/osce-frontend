// pages/_document.js
import { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';

export default function Document() {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Noto+Sans+Thai:wght@400;500;600;700&family=Sarabun:wght@400;500;600;700&display=swap"
                    rel="stylesheet"
                />
                <link rel="stylesheet" href="https://unpkg.com/react-quill@1.3.3/dist/quill.snow.css" />
                <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
                <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
                <script src="https://unpkg.com/react-quill@1.3.3/dist/react-quill.js"></script>
                <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
                <script type="text/babel" src="/my-scripts.js"></script>
                <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
