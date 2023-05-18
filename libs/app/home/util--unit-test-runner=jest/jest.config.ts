/* eslint-disable */
export default {
  displayName: 'app-home-util--unit-test-runner=jest',
  preset: '../../../../jest.preset.js',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/app/home/util--unit-test-runner=jest',
};
