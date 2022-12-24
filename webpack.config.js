const path = require('path');

module.exports = {
    mode: 'development',
    entry: {
        // 폴더명
        main: './src/app.js',
    },
    output: {
        // 절대경로를 입력해야하므로 path 모듈을 가져옴
        path: path.resolve('./dist'),
        // 원본파일명이 name에 들어가게됨
        filename: '[name].js'
    },
    module: {
        rules: [
            // 1. 커스텀 로더
            {
                // 처리할 파일의 패턴
                test: /\.js$/,
                // 해당 파일들을 처리할 로더
                use: [
                    path.resolve('./my-webpack-loader.js'),
                ]
            },

            // 2. css-loader, style-loader
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            
            // 3. file-loader
            // {
            //     test: /\.(png|jpg|gif|svg)$/,
            //     loader: 'file-loader',
            //     options: {
            //         // file-loader가 처리하는 파일을 모듈로 사용했을때, 경로 앞에 추가되는 문자열
            //         publicPath: './dist/',
            //         // 이름.확장자?캐시무력화
            //         name: '[name].[ext]?[hash]',
            //     },
            // },

            // 4. url-loader
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    // file-loader가 처리하는 파일을 모듈로 사용했을때, 경로 앞에 추가되는 문자열
                    publicPath: './dist/',
                    // 이름.확장자?캐시무력화
                    name: '[name].[ext]?[hash]',
                    limit: 20000, // 20kb
                },
            },
        ]
    }
}