#!/usr/bin/env node
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

var fs = require('fs');
var convertTxtToMap = require('./index');

var argv = require('yargs')
  .usage('Usage: $0 [--sourceRoot <sourceRoot>] [--file <filename>] [--output <output-file>] <txtmap-file>')
  .demandCommand(1)
  .nargs('output', 1).alias('o', 'output')
  .nargs('file', 1).alias('f', 'file')
  .nargs('sourceRoot', 1).alias('s', 'sourceRoot')
  .argv;

var txtmapPath = argv._[0];
var outputPath = argv.output;

var opt = {};
if (argv.sourceRoot)
  opt.sourceRoot = argv.sourceRoot;
if (argv.file)
  opt.file = argv.file;

var txt = fs.readFileSync(txtmapPath).toString();

var map = convertTxtToMap(txt, opt);

if (outputPath)
  fs.writeFileSync(outputPath, map);
else
  console.log(map);
