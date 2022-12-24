const path = require("path");
// const MyWebpackPlugin = require('./my-webpack-plugin.js');
const webpack = require("webpack");
// 터미널 명령어를 실행할 수 있는 노드 모듈
const childProcess = require("child_process");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development",
  entry: {
    // 폴더명
    main: "./src/app.js",
  },
  output: {
    // 절대경로를 입력해야하므로 path 모듈을 가져옴
    path: path.resolve("./dist"),
    // 원본파일명이 name에 들어가게됨
    filename: "[name].js",
  },
  module: {
    rules: [
      // 1. 커스텀 로더
      // {
      //     // 처리할 파일의 패턴
      //     test: /\.js$/,
      //     // 해당 파일들을 처리할 로더
      //     use: [
      //         path.resolve('./my-webpack-loader.js'),
      //     ]
      // },

      // 2. css-loader, style-loader
      {
        test: /\.css$/,
        use: [
                process.env.NODE_ENV === 'production' 
                  ? MiniCssExtractPlugin.loader
                  : "style-loader", 
                "css-loader"
            ],
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
        loader: "url-loader",
        options: {
          // file-loader가 처리하는 파일을 모듈로 사용했을때, 경로 앞에 추가되는 문자열
          // publicPath: './dist/',
          // 이름.확장자?캐시무력화
          name: "[name].[ext]?[hash]",
          limit: 20000, // 20kb
        },
      },
    ],
  },
  plugins: [
    // new MyWebpackPlugin(),

    // 배너 플러그인
    new webpack.BannerPlugin({
      // childProcess를 이용하여 commit hash와 username을 넣어준다
      banner: `
                Build Date: ${new Date().toLocaleString()}
                Commit Version: ${childProcess.execSync(
                  "git rev-parse --short HEAD"
                )}
                Author: ${childProcess.execSync("git config user.name")}
            `,
    }),
    // process.env.NODE_ENV를 webpack.config.js의 mode값을 넣어준다.
    new webpack.DefinePlugin({
      TWO: "1+1",
      STRING_TWO: JSON.stringify("1+1"),
      "api.domain": JSON.stringify("https://google.com"),
    }),
    // HTML 처리에 대한 플러그인
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      templateParameters: {
        env: process.env.NODE_ENV === "development" ? "(개발용)" : "",
      },
      // 압축
      minify:
        process.env.NODE_ENV === "production"
          ? {
              // 빈칸 없애기
              collapseWhitespace: true,
              // 주석 없애기
              removeComments: true,
            }
          : false,
    }),
    // 이전 빌드 결과를 삭제
    new CleanWebpackPlugin(),
    ...(process.env.NODE_ENV === 'production'
    ? [new MiniCssExtractPlugin({filename: '[name].css'})]
    : [])
  ],
};
