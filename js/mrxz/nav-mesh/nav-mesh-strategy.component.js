import { simpleNavMeshStrategy } from "./strategy/simple-strategy.js";
import { scanNavMeshStrategy } from "./strategy/scan-strategy.js";

const STRATEGIES = {
    'simple': simpleNavMeshStrategy,
    'scan': scanNavMeshStrategy
}

AFRAME.registerComponent('nav-mesh-strategy', {
    schema: {
        strategy: { default: 'scan' }
    },
    init: function() {
        this.navMeshSystem = this.el.sceneEl.systems['nav-mesh-2'];
        this.navMeshSystem.active = true;
        this.updateStrategy = () => {
            const strategy = STRATEGIES[this.data.strategy] || simpleNavMeshStrategy;
            this.navMeshSystem.switchStrategy(strategy);
        };
        this.updateStrategy();
        console.log("nav-mesh-2 strategy is here");
    },
    update: function(oldData) {
        if(oldData.strategy !== this.data.strategy) {
            this.updateStrategy();
        }
    },

})