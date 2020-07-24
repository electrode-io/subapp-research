module.exports = function (content, map, meta) {
  console.log(content);
  console.log(map);
  console.log(meta);

  //   if (content && content.toString().match(/@declaresubapp/i)) {
  //     console.log("subapp detected");
  //   }
  return content;
};
