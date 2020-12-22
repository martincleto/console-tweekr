/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ReactEnv extends ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PUBLIC_URL: string;
  }

  interface Process {
    env: ReactEnv;
  }
}