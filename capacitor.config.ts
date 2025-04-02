import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.yourbibleapp.app',
  appName: 'Bible App',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: 'release-key.keystore',
      keystorePassword: 'your-keystore-password',
      keystoreAlias: 'key0',
      keystoreAliasPassword: 'your-alias-password'
    }
  }
};

export default config; 