module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: JSON.stringify(process.env.BASE_URL || "http://localhost:8080"),
  firebase: {
    apiKey: JSON.stringify(process.env.FIREBASE_API_KEY||''),
    projectId: JSON.stringify(process.env.FIREBASE_PROJECT_ID||''),
    storageBucket: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET||''),
  }
};
