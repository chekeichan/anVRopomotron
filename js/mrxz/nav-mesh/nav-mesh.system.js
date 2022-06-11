AFRAME.registerSystem('nav-mesh-2', {
    schema: {},
    active: false,

    init: function() {
        this.navMeshEntities = [];
        this.navMeshes = [];
        this.navMeshStrategy = null;
    },

    registerNavMesh: function(el) {
        this.navMeshEntities.push(el);
        this.updateNavMeshes();
        console.log("nav-mesh-2 is here");
    },

    unregisterNavMesh: function(el) {
        var index = this.navMeshEntities.indexOf(el);
        this.navMeshEntities.splice(index, 1);
        this.updateNavMeshes();
    },

    updateNavMeshes: function() {
        this.navMeshes = this.navMeshEntities
            .map(el => el.getObject3D('mesh'))
            .filter(mesh => mesh);
    },

    switchStrategy: function(strategy) {
        this.navMeshStrategy = strategy;
    },

    approveMovement: function(oldPosition, newPosition, candidateValidator) {
        return this.navMeshStrategy.approveMovement(oldPosition, newPosition, this.navMeshes, candidateValidator || (() => true));
    }

    
});