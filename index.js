/**
 * Created by fima on 29/11/16.
 */

var ConcatSource = require("webpack-core/lib/ConcatSource");
var NameGen = require('./NameGen');


function CssRenamePlugin() {
}
module.exports = CssRenamePlugin;

CssRenamePlugin.prototype.apply = function (compiler) {
  compiler.plugin("compilation", function (compilation) {
    compilation.plugin("optimize-chunk-assets", function (chunks, callback) {
      chunks.forEach(function (chunk) {
        if (!chunk.initial) return;
        chunk.files.forEach(function (file) {

          var source = compilation.assets[file].source();
          var classes = source.match(/___(-?[_a-zA-Z]+[_a-zA-Z0-9-]*)__/gm) || [];
          var classesMap = classes.reduce(function (prev, v) {
            if (!prev[v]) prev[v] = 0;
            prev[v]++;
            return prev;
          }, {});
          var classesData = [];
          var classesMapKeys = Object.keys(classesMap);
          for (var i = 0; i < classesMapKeys.length; i++) {
            classesData.push({
              key: classesMapKeys[i],
              fullLength: classesMapKeys[i].length * classesMap[classesMapKeys[i]],
              count: classesMap[classesMapKeys[i]]
            })
          }
          classesData.sort(function (a, b) {
            return b.fullLength - a.fullLength;
          });
          var ng = new NameGen();
          classesData.map(function (v) {
            v.result = ng.getNext();
          });
          classesData.sort(function (a, b) {
            return b.key.length - a.key.length;
          });
          var profit = classesData.reduce(function (prev, c) {
            return prev + (c.key.length - c.result.length) * c.count;
          }, 0);
          console.log('Profit: ' + profit);
          for (i = 0; i < classesData.length; i++) {
            source = source.split(classesData[i].key).join(classesData[i].result);
          }

          compilation.assets[file] = new ConcatSource(source);
        });
      });
      callback();
    });
  });
};