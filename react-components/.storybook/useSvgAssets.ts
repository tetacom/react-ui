const icons = new URL('../src/assets/icons.svg', import.meta.url);
const colorIcons = new URL('../src/assets/color-icons.svg', import.meta.url);
const fileIcons = new URL('../src/assets/file-icons.svg', import.meta.url);

export const useSvgAssets = (StoryFn) => {
  addSvgAssets([icons, colorIcons, fileIcons]);

  return StoryFn();
};

export async function addSvgAssets(url: URL[]): void;
export async function addSvgAssets(url: URL): void;
export async function addSvgAssets(url: URL | URL[]) {
  const loadFx = async () => {
    if (Array.isArray(url)) {
      for (const u of url) {
        const svgString = await downloadAssets(u);
        insertSvg(svgString);
      }

      return;
    }

    const svgString = await downloadAssets(url);
    insertSvg(svgString);
  };

  await loadFx();
}

async function downloadAssets(url: URL): Promise<string> {
  const response = await fetch(url.href);
  return await response.text();
}

function insertSvg(svgString: string): void {
  const svgElement = extractSvg(svgString);
  document.body.appendChild(svgElement);
}

function extractSvg(str: string): SVGElement {
  const container = document.createElement('div');
  container.innerHTML = str;

  const svg = container.querySelector('svg');
  if (!svg) {
    throw new Error('No SVG found!');
  }

  return svg;
}
