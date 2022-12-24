class MyWebpackPlugin {
    apply(compiler) {
        // 플러그인 동작이 완료 되었을때 실행됨
        compiler.hooks.done.tap('My Plugin', stats => {
            console.log('MyPlugin: done');
        });

        // 번들링한 결과물에 내용을 추가하는 코드
        compiler.plugin('emit', (compilation, callback) => {

            // main.js의 소스코드를 가져옴
            const source = compilation.assets['main.js'].source();

            // source함수를 재정의
            compilation.assets['main.js'].source = () => {
                // source 위에 내용을 추가 한 뒤
                const banner = [
                    '/**',
                    ' * 이것은 BannerPlugin이 처리한 결과입니다.',
                    ` * Build Date: ${new Date().toLocaleString()}`,
                    ' */' 
                ].join('\n');

                // 상단에 배너 + 기존 소스코드를 반환
                return banner + '\n\n' + source;
            }

            callback();
        })
    }
}

module.exports = MyWebpackPlugin;