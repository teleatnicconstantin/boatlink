declare module '@env' {
  export const API_URL: string;
  export const FIREBASE_DATABASE_URL: string;
  export const GOOGLE_WEB_CLIENT_ID: string;
  export const CRYPO_SECRET_KEY: string;
}

declare module '*.gif' {
  const value: any;
  export default value;
}

declare module '*.svg' {
  const value: number;
  export default value;
}
