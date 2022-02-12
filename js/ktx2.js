import WorkerPool from 'https://cdn.jsdelivr.net/npm/three@0.137.0/examples/js/utils/WorkerPool.js';
import KTX2Loader from 'https://cdn.jsdelivr.net/npm/three@0.137.0/examples/js/loaders/KTX2Loader.js';
ktx2Loader.setTranscoderPath( '.examples/js/libs/basis/' );
var registerComponent = require('../core/component').registerComponent;
var THREE = require('../lib/three');
var utils = require('../utils/');
var warn = utils.debug('components:gltf-model-b:warn');

/**
 * glTF model loader.
 */
module.exports.Component = registerComponent('gltf-model-b', {
  schema: {type: 'model'},

  init: function () {
    var self = this;
    var dracoLoader = this.system.getDRACOLoader();
    var meshoptDecoder = this.system.getMeshoptDecoder();
    this.model = null;
    this.loader = new THREE.GLTFLoader();
    if (dracoLoader) {
      this.loader.setDRACOLoader(dracoLoader);
    }
    if (meshoptDecoder) {
      this.ready = meshoptDecoder.then(function (meshoptDecoder) {
        self.loader.setMeshoptDecoder(meshoptDecoder);
      });
    } else {
      this.ready = Promise.resolve();
    }
    this.setKTX2Loader(new KTX2Loader().detectSupport(renderer));
  },

  update: function () {
    var self = this;
    var el = this.el;
    var src = this.data;

    if (!src) { return; }

    this.remove();

    this.ready.then(function () {
      self.loader.load(src, function gltfLoaded (gltfModel) {
        self.model = gltfModel.scene || gltfModel.scenes[0];
        self.model.animations = gltfModel.animations;
        el.setObject3D('mesh', self.model);
        el.emit('model-loaded', {format: 'gltf', model: self.model});
      }, undefined /* onProgress */, function gltfFailed (error) {
        var message = (error && error.message) ? error.message : 'Failed to load glTF model';
        warn(message);
        el.emit('model-error', {format: 'gltf', src: src});
      });
    });
  },

  remove: function () {
    if (!this.model) { return; }
    this.el.removeObject3D('mesh');
  }
});
