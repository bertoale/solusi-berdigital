export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { testDatabaseConnection } = await import("@/db");
    await testDatabaseConnection();
  }
}
