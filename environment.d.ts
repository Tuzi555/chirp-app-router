declare namespace NodeJS {
  export interface ProcessEnv {
    readonly DATABASE_URL: string;
    readonly NODE_ENV: 'development' | 'production' | 'test';
  }
}
