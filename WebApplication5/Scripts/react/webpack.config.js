module.exports = {
    context: __dirname,
    mode: 'development',
    entry: {
        Customer: "./Customer.jsx",
        Product: "./Product.jsx",
        ProductSold: "./ProductSold.jsx",
        Store: "./Store.jsx",

        app: "./app.js",
    }
    
,
    output: {
        path: __dirname + "/dist",
        filename: "[name].bundle.js"
    }
            ,
            watch: true,
            resolve: {
                extensions: [".jsx", ".js"]
            },
            module: {
                rules: [
                    {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_models)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ["@babel/preset-env", "@babel/preset-react"]


                        }
                    }
              },
                    {
                        test: /\.css?$/,
                        loaders: [
                            require.resolve('style-loader'),
                            require.resolve('css-loader'),
                            require.resolve('sass-loader')
                        ],
                        include: __dirname
                    }

]
        }
    };
