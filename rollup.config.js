import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import { uglify } from 'rollup-plugin-uglify';

const production = !process.env.ROLLUP_WATCH;

export default {
  input: 'lib/index.ts',
  output: {
    dir: 'package',
    format: 'cjs'
  },
  external: [
    'path',
    'fs',
    'crypto',
  ],
  plugins: [
    resolve(),
    commonjs(),
    typescript(),
    production && uglify(),
  ]
}