const path = require('path');

module.exports = {
    mode: 'production',
    entry: './js-src/WebDirt.js',
    experiments: {
        asyncWebAssembly: true
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'WebDirt-packed.js',
        // TODO...tmp for profile app, remove later
        publicPath: '/WebDirt/', // Set the correct path where your assets are served
        library: {
            name: 'WebDirt',
            type: 'umd',
        },
    },
    devtool: "source-map",
};
