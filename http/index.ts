async function sleep(t = 1000) {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, t);
  });
}

export async function mock<T>(data: T): Promise<T> {
  await sleep();
  return data;
}
