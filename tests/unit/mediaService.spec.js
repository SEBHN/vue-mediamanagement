import mediaService from '../../src/services/mediaService';

let testMedia;
let testMedia1;
let testFolder;
let currentPath;

beforeAll(() => {
  mediaService.removeAll();
  currentPath = '/';
  testMedia = {id: '787793fa', name: 'rocket', isFolder: false, filePath: '/', tags: [], fileId: '123i', fileExtension: 'jpeg'};
  testMedia1 = {id: 'kh123sga', name: 'newHope', isFolder: false, filePath: '/star wars', tags: ['geek'], fileId: 'sml20', fileExtension: 'avi'};
  testFolder = {id: 'juh92pxa', name: 'THI', isFolder: true, filePath: '/', tags: [], fileId: 'tell'};
});

afterEach(() => {
  mediaService.removeAll();
})

/**
 * @param {string} id of the media to be removed
 */
test('Remove media from array.', () => {
  // add media to media array
  mediaService.addOne(testMedia);
  // remove media
  mediaService.remove(testMedia.id);
  expect(mediaService.getAll()).not.toContain(testMedia);
});

/**
 * @param media media object to be added
 */
test('Add 1 media file.', () => {
  // add media to media array
  mediaService.addOne(testMedia);
  expect(mediaService.getAll()).toContain(testMedia);
});

/**
 * @param {string} id id of returned media
 */
test('Get media object for given id', () => {
  // add media to media array
  mediaService.addOne(testMedia);
  const returnedMedia = mediaService.getMediaForId(testMedia.id);
  expect(returnedMedia).toEqual(returnedMedia); // id of added testMedia
});

/**
 * @param {string} id media id
 * @param {string} name the new media name
 */
test('Rename media file.', () => {
  // add media to media array
  mediaService.addOne(testMedia);
  // rename added media
  mediaService.rename(testMedia.id, 'panda');
  expect(mediaService.getMediaForId(testMedia.id).name).toBe('panda');
});

/**
 * @param {array} files array of media to be added
 */
test('Add many files to array.', () => {
  // get current media array length
  const mediaArayLength = mediaService.getAll().length;
  // add many
  mediaService.addMany([testMedia, testMedia1]);
  expect(mediaService.getAll().length).toBe(mediaArayLength + 2);
});

/**
 * @param {string} path of all returned media
 */
test('Get all media for given path.', () => {
  // add many
  mediaService.addMany([testMedia, testMedia1]);
  // get for current path
  expect(mediaService.getAllForPath(currentPath)).toContain(testMedia);
});