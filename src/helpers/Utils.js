function isDevEnv() {
  return [process, process.env, process.env.NODE_ENV === "development"].every(
    (each) => each !== null && each !== false,
  );
}

export { isDevEnv };