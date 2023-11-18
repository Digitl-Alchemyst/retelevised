import isEqual from 'lodash/isEqual';

// Interface to define the structure of a box
interface Box {
  content: any; // Specify the type of content
  x: number;
  y: number;
  w: number;
  h: number;
  spaces: number[];
}

// Function to extract boxes from a 2D grid based on view content
export function boxesFromViewContentMap(
  width: number,
  height: number,
  viewContentMap: Map<number, any>,
): Box[] {
  // Array to store the extracted boxes
  const boxes: Box[] = [];
  // Set to keep track of visited indices
  const visited = new Set<number>();

  // Helper function to check if content at a given position matches the provided content
  function isPosContent(x: number, y: number, content: any): boolean {
    const checkIdx = width * y + x;
    return (
      !visited.has(checkIdx) && isEqual(viewContentMap.get(checkIdx), content)
    );
  }

  // Helper function to find the largest box starting from a given position
  function findLargestBox(x: number, y: number): Box {
    const idx = width * y + x;
    const spaces = [idx]; // Array to store indices of the current box
    const content = viewContentMap.get(idx);

    let maxY;
    // Scan vertically to find the maximum height of the box
    for (maxY = y + 1; maxY < height; maxY++) {
      if (!isPosContent(x, maxY, content)) {
        break;
      }
      spaces.push(width * maxY + x);
    }

    let cx = x;
    let cy = y;
    // Scan horizontally to find the maximum width of the box
    scan: for (cx = x + 1; cx < width; cx++) {
      for (cy = y; cy < maxY; cy++) {
        if (!isPosContent(cx, cy, content)) {
          break scan;
        }
      }
      for (let cy = y; cy < maxY; cy++) {
        spaces.push(width * cy + cx);
      }
    }
    const w = cx - x; // Width of the box
    const h = maxY - y; // Height of the box
    spaces.sort(); // Sort the indices for consistency
    return { content, x, y, w, h, spaces };
  }

  // Iterate through the grid to find and store all boxes
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = width * y + x;
      // Skip visited indices or undefined content
      if (visited.has(idx) || viewContentMap.get(idx) === undefined) {
        continue;
      }

      // Find the largest box starting from the current position
      const box = findLargestBox(x, y);
      boxes.push(box); // Add the box to the result array
      // Mark all indices of the box as visited
      for (const boxIdx of box.spaces) {
        visited.add(boxIdx);
      }
    }
  }

  return boxes; // Return the array of extracted boxes
}

// Function to convert linear index to grid coordinates
export function idxToCoords(
  gridCount: number,
  idx: number,
): { x: number; y: number } {
  const x = idx % gridCount;
  const y = Math.floor(idx / gridCount);
  return { x, y };
}

// Function to check if a given index is within a specified box
export function idxInBox(
  gridCount: number,
  start: number,
  end: number,
  idx: number,
): boolean {
  // Convert start and end indices to coordinates
  let { x: startX, y: startY } = idxToCoords(gridCount, start);
  let { x: endX, y: endY } = idxToCoords(gridCount, end);
  const { x, y } = idxToCoords(gridCount, idx);

  // Determine if the index is within the specified box
  const lowX = Math.min(startX, endX);
  const highX = Math.max(startX, endX);
  const lowY = Math.min(startY, endY);
  const highY = Math.max(startY, endY);
  const xInBox = x >= lowX && x <= highX;
  const yInBox = y >= lowY && y <= highY;
  return xInBox && yInBox;
}
