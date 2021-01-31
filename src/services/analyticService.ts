import { tagsCount } from '../redux/type';

export function getTagsCount(webpage: string): tagsCount {
  const regexp = /<([a-z]+)(?=[\s>])(?:[^>=]|='[^']*'|="[^"]*"|=[^'"\s]*)*\s?\/?>/gi;
  let tagName;
  const tagsTable: tagsCount = {};
  do {
    tagName = regexp.exec(webpage);
    if (tagName) {
      if (!(tagName[1] in tagsTable)) {
        tagsTable[tagName[1]] = 0;
      }
      tagsTable[tagName[1]] += 1;
    }
  } while (tagName);

  const sortedTagsTable = Object.entries(tagsTable)
    .sort((a: [string, number], b: [string, number]) => (a[1] < b[1] ? 1 : -1))
    .reduce((reducer: tagsCount, [name, count]) => ({ ...reducer, [name]: count }), {});

  return sortedTagsTable;
}

export function getLongestPath(webpage: string, tagName: string): number {
  const doc = new DOMParser().parseFromString(webpage, 'text/html');
  let route = getDomDepthLevel(doc, tagName);
  return route.route.length;
}

function getDomDepthLevel(root: Document, tagName: string): {route: Document[], level: number} {
  let pathInfo = { route: [root], level: 0 };
  for (let i = 0, j = root.children.length; i < j; i += 1) {
    const curNodePathInfo = getDomDepthLevel(root.children[i], tagName);
    if (curNodePathInfo.level > pathInfo.level) {
      pathInfo = curNodePathInfo;
    }
  }
  pathInfo.route.unshift(root);
  pathInfo.level += 1;
  return pathInfo;
}
