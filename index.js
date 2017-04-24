/* Copyright 2016 Mozilla Foundation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var SourceMapGenerator = require('source-map').SourceMapGenerator;

module.exports = function (txt, opt) {
  var map = new SourceMapGenerator(opt || {});

  var lines = txt.split('\n').forEach(function (line) {
    var parts = line.split(':');
    if (parts.length < 2)
      return;
    var offset = +parts[0];
    var file = parts[1];
    var line = +parts[2];

    map.addMapping({
      generated: {
        line: offset,
        column: 0
      },
      source: file,
      original: {
        line: line,
        column: 0
      }
    });
  });
  return map.toString();
};
