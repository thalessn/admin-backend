export default {
  displayName: {
    name: 'nestjs',
    color: 'magentaBright',
  },
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  testRegex: '.*\\..*spec\\.ts$',
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  collectCoverageFrom: ['**/*.(t|j)s'],
  coverageDirectory: '../coverage',
  testEnvironment: 'node',
  moduleNameMapper: {
    '@tsn/micro\\-videos/(.*)$':
      '<rootDir>/../../../node_modules/@tsn/micro-videos/dist/$1',
    '#seedwork/(.*)$':
      '<rootDir>/../../../node_modules/@tsn/micro-videos/dist/@seedwork/$1',
    '#seedwork/domain':
      '<rootDir>/../../../node_modules/@tsn/micro-videos/dist/@seedwork/domain/index.js',
    '#category/(.*)$':
      '<rootDir>/../../../node_modules/@tsn/micro-videos/dist/category/$1',
    '#category/domain':
      '<rootDir>/../../../node_modules/@tsn/micro-videos/dist/category/domain/$1',
  },
};
