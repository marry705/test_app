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

  return tagsTable;
}

export function getLongestPath(webpage: string, tagsCount: tagsCount): number {
  return 10;
}
