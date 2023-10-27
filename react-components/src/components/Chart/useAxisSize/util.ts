function determineWidth(text: string, size = 11): TextMetrics {
  const ctx = document
    .createElement('canvas')
    .getContext('2d') as CanvasRenderingContext2D;

  ctx.font = `${size}px Inter`;

  const measure = ctx.measureText(text);
  return measure;
}
async function fontOnload(
  fontName: string,
  maxTime = Infinity,
  timeInterval = 10,
): Promise<boolean> {
  const startTime = performance.now();

  return new Promise((resolve, reject) => {
    setInterval(() => {
      const currentTime = performance.now(),
        elapsedTime = currentTime - startTime;
      if (document.fonts.check('11px ' + fontName)) {
        resolve(true);
      } else if (elapsedTime >= maxTime) {
        reject(false);
      }
    }, timeInterval);
  });
}

export { determineWidth, fontOnload };
