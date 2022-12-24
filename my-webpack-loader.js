module.exports = function myWebpackLoader(content) {
    const replacedContent = content.replace('console.log(', 'alert(');
    // console.log(content);
    return replacedContent;
}