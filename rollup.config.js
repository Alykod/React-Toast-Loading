import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [postcss({
    extract: true,
    modules: true,
  }), typescript({ objectHashIgnoreUnknownHack: true })],
  external: ['react', 'react-dom']
}