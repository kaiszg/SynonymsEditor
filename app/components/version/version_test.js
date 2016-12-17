'use strict';

describe('synonymsEditor.version module', function() {
  beforeEach(module('synonymsEditor.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
