
var React = require('react');

var App = React.createClass({
    render() {
        return (
            <html>
            <head lang="en">
                <meta charSet="UTF-8"/>
                <title>Example ES6 Isomorphic React App</title>
                <link rel="stylesheet" type="text/css" href="/main.css" />
            </head>
            <body>
            <div id="main">
                <h1>Hello World</h1>
            </div>
            <script type="text/javascript" src="/bundle.js"></script>
            </body>
            </html>
        );
    }
});

module.exports = App;

