const mediaService = require('../services/mediaService');
/**
 * Tests add() from mediaService
 */
test('Adds 1 media file.', () => {
  // get current media array length
  const mediaArayLength = mediaService.getAll().length;
  // add media to media array
  mediaService.add({id: '787793fa', name: 'rocket', filePath: '/', tags: [], fileId: '123i', fileExtension: 'jpeg'});
  expect(mediaService.getAll().length).toBe(mediaArayLength + 1);
});

/**
 * Test update(id, name) from mediaService
 * @param {string} id media id
 * @param {string} name new media name
 */
test('Renames media file.', () => {

});