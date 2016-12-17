'use strict';

angular.module('synonymsEditor.version', [
  'synonymsEditor.version.interpolate-filter',
  'synonymsEditor.version.version-directive'
])

.value('version', '0.1');
