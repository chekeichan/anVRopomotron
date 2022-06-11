AFRAME.registerComponent('nav-mesh-2', {
    schema: {},
    init: function() {
        this.el.addEventListener('model-loaded', (event) => {
            this.system.updateNavMeshes(this.el);
        });
        this.system.registerNavMesh(this.el);
    },

    remove: function() {
        this.system.unregisterNavMesh(this.el);
    }
});