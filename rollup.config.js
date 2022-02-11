import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import versionInjector from 'rollup-plugin-version-injector'

import ts from 'rollup-plugin-ts'

import path from 'path'

const { LERNA_PACKAGE_NAME, LERNA_ROOT_PATH } = process.env
const PACKAGE_ROOT_PATH = process.cwd()
export default [
  {
    input: path.join(PACKAGE_ROOT_PATH, 'src', 'index.ts'),
    output: [
      {
        file: `dist/index.cjs.js`,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: `dist/index.esm.js`,
        format: 'esm',
        sourcemap: true,
        exports: 'named',
      },
      {
        name: LERNA_PACKAGE_NAME,
        file: `dist/index.umd.js`,
        sourcemap: true,
        format: 'umd',
        exports: 'named',
      },
    ],
    plugins: [
      versionInjector(),
      ts(),
      resolve(),
      terser()
    ],
  },
]
