module.exports = {
  NODE_ENV: '"production"',
  BASE_URL: JSON.stringify(process.env.BASE_URL || "http://localhost:8080"),
  FIREBASE_API_KEY: JSON.stringify(process.env.FIREBASE_API_KEY||''),
  FIREBASE_PROJECT_ID: JSON.stringify(process.env.FIREBASE_PROJECT_ID||''),
  FIREBASE_STORAGE_BUCKET: JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET||'')
}
