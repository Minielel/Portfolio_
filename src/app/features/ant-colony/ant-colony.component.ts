import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild
} from '@angular/core';

import * as THREE from 'three';


// ============================================================
// ANT
// ============================================================

interface Ant {
  group: THREE.Group;

  position: THREE.Vector2;

  direction: THREE.Vector2;

  speed: number;

  phase: number;

  wander: THREE.Vector2;

  material: THREE.MeshStandardMaterial;
}


// ============================================================
// PHEROMONE
// ============================================================

interface PheromoneCell {
  value: number;
  lastUpdate: number;
}


// ============================================================
// COLONY
// ============================================================

interface Colony {
  ants: Ant[];

  start: THREE.Vector2;

  goal: THREE.Vector2;

  pheromones: Map<number, PheromoneCell>;

  age: number;

  lifetime: number;

  dying: boolean;
}


// ============================================================
// COMPONENT
// ============================================================

@Component({
  selector: 'app-ant-colony',

  standalone: true,

  template: `
    <canvas
      #canvas
      class="ant-colony-canvas">
    </canvas>
  `,

  styleUrl: './ant-colony.component.css'
})
export class AntColonyComponent
  implements AfterViewInit, OnDestroy {


  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;


  // ==========================================================
  // THREE
  // ==========================================================

  private renderer!: THREE.WebGLRenderer;

  private scene!: THREE.Scene;

  private camera!: THREE.OrthographicCamera;

  private animationId = 0;


  // ==========================================================
  // COLONIES
  // ==========================================================

  private colonies: Colony[] = [];


  // ==========================================================
  // VIEW
  // ==========================================================

  /*
   * Höhe der sichtbaren Welt in World Units.
   */
  private readonly VIEW_HEIGHT = 7;


  // ==========================================================
  // ANTS
  // ==========================================================

  private readonly ANTS_PER_COLONY = 23;

  private readonly ANT_SPEED = 0.32;

  private readonly ANT_SCALE = 0.32;

  private readonly ANT_DISTANCE = 0.35;


  // ==========================================================
  // PHEROMONES
  // ==========================================================

  private readonly PHEROMONE_CELL = 0.22;

  private readonly PHEROMONE_DEPOSIT = 0.055;

  private readonly PHEROMONE_DECAY = 0.025;

  private readonly MAX_PHEROMONE = 1;


  /*
   * Gewichtung der Navigation.
   *
   * Pheromon = bevorzugte Straße
   * Ziel     = grobe Orientierung
   * Wander   = sorgt für Kurven
   */

  private readonly PHEROMONE_WEIGHT = 0.75;

  private readonly GOAL_WEIGHT = 0.12;

  private readonly RANDOM_WEIGHT = 0.33;


  // ==========================================================
  // MOVEMENT
  // ==========================================================

  private readonly SENSOR_DISTANCE = 0.42;

  private readonly SENSOR_ANGLE =
    Math.PI / 5;

  private readonly TURN_SPEED = 2.0;


  // ==========================================================
  // SPAWN
  // ==========================================================

  /*
   * Erste Straße nach 20 Sekunden.
   */
  private spawnTimer = 20;

  private readonly MIN_SPAWN_INTERVAL = 8;

  private readonly MAX_SPAWN_INTERVAL = 17;

  private readonly MAX_COLONIES = 7;


  // ==========================================================
  // LIFETIME
  // ==========================================================

  private readonly MIN_LIFETIME = 120;

  private readonly MAX_LIFETIME = 360;


  // ==========================================================
  // TIME
  // ==========================================================

  private simulationTime = 0;

  private lastTime = 0;


  // ==========================================================
  // SCROLL
  // ==========================================================

  private scrollY = 0;


  // ==========================================================
  // INIT
  // ==========================================================

  ngAfterViewInit(): void {

    const canvas =
      this.canvasRef.nativeElement;


    // --------------------------------------------------------
    // RENDERER
    // --------------------------------------------------------

    this.renderer =
      new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true
      });


    this.renderer.setPixelRatio(
      Math.min(
        window.devicePixelRatio,
        2
      )
    );


    this.renderer.shadowMap.enabled =
      true;


    this.renderer.shadowMap.type =
      THREE.PCFSoftShadowMap;


    this.updateRendererSize();


    // --------------------------------------------------------
    // SCENE
    // --------------------------------------------------------

    this.scene =
      new THREE.Scene();


    // --------------------------------------------------------
    // CAMERA
    // --------------------------------------------------------

    this.createCamera();


    // --------------------------------------------------------
    // LIGHT
    // --------------------------------------------------------

    this.createLights();


    // --------------------------------------------------------
    // EVENTS
    // --------------------------------------------------------

    window.addEventListener(
      'resize',
      this.onResize
    );


    window.addEventListener(
      'scroll',
      this.onScroll,
      {
        passive: true
      }
    );


    this.scrollY =
      window.scrollY;


    // --------------------------------------------------------
    // START
    // --------------------------------------------------------

    this.lastTime =
      performance.now();


    this.updateCamera();

    this.animate();
  }


  // ==========================================================
  // CAMERA
  // ==========================================================

  private createCamera(): void {

    const aspect =
      window.innerWidth /
      window.innerHeight;


    const halfHeight =
      this.VIEW_HEIGHT / 2;


    const halfWidth =
      halfHeight * aspect;


    this.camera =
      new THREE.OrthographicCamera(

        -halfWidth,
        halfWidth,

        halfHeight,
        -halfHeight,

        0.1,
        100
      );


    /*
     * Die Welt benutzt:
     *
     * Y = 0
     *   = ganz oben
     *
     * Y wird nach unten negativ.
     */

    this.camera.position.set(
      0,
      -halfHeight,
      10
    );


    this.camera.lookAt(
      0,
      -halfHeight,
      0
    );
  }


  // ==========================================================
  // CAMERA + SCROLL
  // ==========================================================

  private updateCamera(): void {

    /*
     * Pixel -> World Units.
     */
    const pixelsPerUnit =
      window.innerHeight /
      this.VIEW_HEIGHT;


    /*
     * Scrollposition in World Units.
     */
    const scrollWorld =
      this.scrollY /
      pixelsPerUnit;


    /*
     * WICHTIG:
     *
     * Beim Scrollen bewegt sich ausschließlich
     * die Kamera.
     *
     * Die Ameisen selbst bekommen hier
     * keinerlei Positionsänderung.
     */

    const cameraY =
      -scrollWorld -
      this.VIEW_HEIGHT / 2;


    this.camera.position.y =
      cameraY;


    this.camera.lookAt(
      0,
      cameraY,
      0
    );
  }


  // ==========================================================
  // RENDERER
  // ==========================================================

  private updateRendererSize(): void {

    this.renderer.setSize(
      window.innerWidth,
      window.innerHeight,
      false
    );
  }


  // ==========================================================
  // RESIZE
  // ==========================================================

  private onResize = (): void => {

    const aspect =
      window.innerWidth /
      window.innerHeight;


    const halfHeight =
      this.VIEW_HEIGHT / 2;


    const halfWidth =
      halfHeight * aspect;


    this.camera.left =
      -halfWidth;


    this.camera.right =
      halfWidth;


    this.camera.top =
      halfHeight;


    this.camera.bottom =
      -halfHeight;


    this.camera.updateProjectionMatrix();


    this.updateRendererSize();


    this.updateCamera();
  };


  // ==========================================================
  // SCROLL
  // ==========================================================

  private onScroll = (): void => {

    this.scrollY =
      window.scrollY;


    this.updateCamera();
  };


  // ==========================================================
  // LIGHT
  // ==========================================================

  private createLights(): void {

    const ambient =
      new THREE.AmbientLight(
        0xffffff,
        1.5
      );


    this.scene.add(
      ambient
    );


    const directional =
      new THREE.DirectionalLight(
        0xffffff,
        2.5
      );


    directional.position.set(
      -3,
      5,
      7
    );


    directional.castShadow =
      true;


    directional.shadow.mapSize.set(
      512,
      512
    );


    this.scene.add(
      directional
    );
  }


  // ==========================================================
  // COLOR
  // ==========================================================

  private getAntColor(): number {

    let element:
      HTMLElement | null =
      document.body;


    let background =
      '';


    while (
      element
    ) {

      const style =
        window.getComputedStyle(
          element
        );


      background =
        style.backgroundColor;


      if (
        background &&
        background !==
        'rgba(0, 0, 0, 0)'
      ) {

        break;
      }


      element =
        element.parentElement;
    }


    const match =
      background.match(
        /rgba?\(\s*(\d+),\s*(\d+),\s*(\d+)/
      );


    if (!match) {
      return 0x222222;
    }


    const r =
      Number(match[1]);


    const g =
      Number(match[2]);


    const b =
      Number(match[3]);


    const brightness =
      (
        r * 299 +
        g * 587 +
        b * 114
      ) / 1000;


    /*
     * Darkmode:
     * helle Ameisen
     *
     * Lightmode:
     * dunkle Ameisen
     */

    return brightness < 130
      ? 0xe8e8e8
      : 0x222222;
  }


  // ==========================================================
  // ROTATE VECTOR
  // ==========================================================

  private rotateVector(
    vector: THREE.Vector2,
    angle: number
  ): THREE.Vector2 {

    const cos =
      Math.cos(angle);


    const sin =
      Math.sin(angle);


    const x =
      vector.x * cos -
      vector.y * sin;


    const y =
      vector.x * sin +
      vector.y * cos;


    vector.set(
      x,
      y
    );


    return vector;
  }


  // ==========================================================
  // CREATE ANT
  // ==========================================================

  private createAnt(): Ant {

    const group =
      new THREE.Group();


    const material =
      new THREE.MeshStandardMaterial({

        color:
          this.getAntColor(),

        roughness:
          0.75,

        metalness:
          0.05
      });


    // --------------------------------------------------------
    // ABDOMEN
    // --------------------------------------------------------

    const abdomen =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.085,
          6,
          4
        ),

        material
      );


    abdomen.scale.set(
      1.45,
      0.72,
      0.72
    );


    abdomen.position.x =
      -0.12;


    abdomen.castShadow =
      true;


    group.add(
      abdomen
    );


    // --------------------------------------------------------
    // THORAX
    // --------------------------------------------------------

    const thorax =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.065,
          6,
          4
        ),

        material
      );


    thorax.position.x =
      0.015;


    thorax.castShadow =
      true;


    group.add(
      thorax
    );


    // --------------------------------------------------------
    // HEAD
    // --------------------------------------------------------

    const head =
      new THREE.Mesh(

        new THREE.SphereGeometry(
          0.055,
          6,
          4
        ),

        material
      );


    head.position.x =
      0.14;


    head.castShadow =
      true;


    group.add(
      head
    );


    // --------------------------------------------------------
    // LEGS
    // --------------------------------------------------------

    for (
      let side = -1;
      side <= 1;
      side += 2
    ) {

      for (
        let i = 0;
        i < 3;
        i++
      ) {

        const leg =
          new THREE.Mesh(

            new THREE.CylinderGeometry(
              0.006,
              0.010,
              0.17,
              4
            ),

            material
          );


        leg.position.set(

          0.055 -
          i * 0.075,

          side * 0.055,

          0
        );


        leg.rotation.z =
          side *
          Math.PI /
          2.8;


        leg.castShadow =
          true;


        group.add(
          leg
        );
      }
    }


    // --------------------------------------------------------
    // ANTENNAE
    // --------------------------------------------------------

    for (
      let side = -1;
      side <= 1;
      side += 2
    ) {

      const antenna =
        new THREE.Mesh(

          new THREE.CylinderGeometry(
            0.003,
            0.004,
            0.11,
            4
          ),

          material
        );


      antenna.position.set(
        0.17,
        side * 0.025,
        0
      );


      antenna.rotation.z =
        side * -0.6;


      group.add(
        antenna
      );
    }


    group.scale.setScalar(
      this.ANT_SCALE
    );


    return {

      group,

      position:
        new THREE.Vector2(),

      direction:
        new THREE.Vector2(
          1,
          0
        ),

      speed:
        this.ANT_SPEED *
        (
          0.85 +
          Math.random() * 0.25
        ),

      phase:
        Math.random() *
        Math.PI * 2,

      wander:
        new THREE.Vector2(
          Math.random() - 0.5,
          Math.random() - 0.5
        ).normalize(),

      material
    };
  }


  // ==========================================================
  // DOCUMENT WORLD
  // ==========================================================

  private getDocumentWorld(): {
    width: number;
    height: number;
  } {

    const pixelsPerUnit =
      window.innerHeight /
      this.VIEW_HEIGHT;


    /*
     * Tatsächliche Dokumenthöhe.
     */
    const documentHeight =
      Math.max(

        document.documentElement
          .scrollHeight,

        document.body
          .scrollHeight,

        window.innerHeight
      );


    const aspect =
      window.innerWidth /
      window.innerHeight;


    const worldWidth =
      this.VIEW_HEIGHT *
      aspect;


    const worldHeight =
      documentHeight /
      pixelsPerUnit;


    return {

      width:
        worldWidth,

      height:
        worldHeight
    };
  }


  // ==========================================================
  // PHEROMONE KEY
  // ==========================================================

  private getPheromoneKey(
    position: THREE.Vector2
  ): number {

    const x =
      Math.floor(
        position.x /
        this.PHEROMONE_CELL
      );


    const y =
      Math.floor(
        position.y /
        this.PHEROMONE_CELL
      );


    /*
     * Zwei Integer werden zu einem
     * einzelnen Key kombiniert.
     */

    return (
      ((x & 0xffff) << 16) |
      (y & 0xffff)
    );
  }


  // ==========================================================
  // DEPOSIT PHEROMONE
  // ==========================================================

  private depositPheromone(
    colony: Colony,
    position: THREE.Vector2
  ): void {

    const key =
      this.getPheromoneKey(
        position
      );


    const existing =
      colony.pheromones.get(
        key
      );


    if (existing) {

      existing.value =
        Math.min(

          this.MAX_PHEROMONE,

          existing.value +
          this.PHEROMONE_DEPOSIT
        );


      existing.lastUpdate =
        this.simulationTime;

    } else {

      colony.pheromones.set(

        key,

        {

          value:
            this.PHEROMONE_DEPOSIT,

          lastUpdate:
            this.simulationTime
        }
      );
    }
  }


  // ==========================================================
  // GET PHEROMONE
  // ==========================================================

  private getPheromone(
    colony: Colony,
    position: THREE.Vector2
  ): number {

    const key =
      this.getPheromoneKey(
        position
      );


    const cell =
      colony.pheromones.get(
        key
      );


    if (!cell) {
      return 0;
    }


    const age =
      this.simulationTime -
      cell.lastUpdate;


    const value =
      cell.value *
      Math.exp(
        -this.PHEROMONE_DECAY *
        age
      );


    if (
      value < 0.005
    ) {

      colony.pheromones.delete(
        key
      );


      return 0;
    }


    return value;
  }


  // ==========================================================
  // SAMPLE PHEROMONE
  // ==========================================================

  private samplePheromone(
    colony: Colony,
    position: THREE.Vector2
  ): number {

    let total =
      this.getPheromone(
        colony,
        position
      );


    const c =
      this.PHEROMONE_CELL;


    const offsets = [

      [ c, 0 ],

      [ -c, 0 ],

      [ 0, c ],

      [ 0, -c ],

      [ c, c ],

      [ -c, c ],

      [ c, -c ],

      [ -c, -c ]

    ];


    for (
      const [x, y] of offsets
    ) {

      total +=

        this.getPheromone(

          colony,

          new THREE.Vector2(

            position.x + x,

            position.y + y
          )

        ) * 0.35;
    }


    return total;
  }


  // ==========================================================
  // PHEROMONE DIRECTION
  // ==========================================================

  private getPheromoneDirection(
    colony: Colony,
    ant: Ant
  ): THREE.Vector2 {

    const forward =
      ant.direction
        .clone()
        .normalize();


    const left =
      this.rotateVector(

        forward.clone(),

        this.SENSOR_ANGLE
      );


    const right =
      this.rotateVector(

        forward.clone(),

        -this.SENSOR_ANGLE
      );


    const frontPosition =
      ant.position.clone()
        .add(

          forward.clone()
            .multiplyScalar(
              this.SENSOR_DISTANCE
            )
        );


    const leftPosition =
      ant.position.clone()
        .add(

          left.clone()
            .multiplyScalar(
              this.SENSOR_DISTANCE
            )
        );


    const rightPosition =
      ant.position.clone()
        .add(

          right.clone()
            .multiplyScalar(
              this.SENSOR_DISTANCE
            )
        );


    const front =
      this.samplePheromone(

        colony,

        frontPosition
      );


    const leftStrength =
      this.samplePheromone(

        colony,

        leftPosition
      );


    const rightStrength =
      this.samplePheromone(

        colony,

        rightPosition
      );


    const result =
      new THREE.Vector2();


    result.add(

      forward.multiplyScalar(
        front
      )
    );


    result.add(

      left.multiplyScalar(
        leftStrength
      )
    );


    result.add(

      right.multiplyScalar(
        rightStrength
      )
    );


    if (
      result.lengthSq() >
      0.0001
    ) {

      result.normalize();
    }


    return result;
  }


  // ==========================================================
  // UPDATE ANT
  // ==========================================================

  private updateAnt(
    colony: Colony,
    ant: Ant,
    delta: number
  ): void {

    // --------------------------------------------------------
    // PHEROMONE
    // --------------------------------------------------------

    if (
      !colony.dying
    ) {

      this.depositPheromone(

        colony,

        ant.position
      );
    }


    // --------------------------------------------------------
    // GOAL
    // --------------------------------------------------------

    const toGoal =
      colony.goal.clone()
        .sub(
          ant.position
        );


    if (
      toGoal.lengthSq() >
      0.0001
    ) {

      toGoal.normalize();
    }


    // --------------------------------------------------------
    // PHEROMONE
    // --------------------------------------------------------

    const pheromone =
      this.getPheromoneDirection(

        colony,

        ant
      );


    // --------------------------------------------------------
    // WANDER
    // --------------------------------------------------------

    /*
     * Langsame Richtungsänderung.
     *
     * Das erzeugt große Kurven.
     */

    const wanderChange =
      new THREE.Vector2(

        Math.random() - 0.5,

        Math.random() - 0.5
      );


    ant.wander.add(

      wanderChange.multiplyScalar(
        delta * 0.30
      )
    );


    ant.wander.normalize();


    // --------------------------------------------------------
    // DESIRED
    // --------------------------------------------------------

    const desired =
      new THREE.Vector2();


    if (
      pheromone.lengthSq() >
      0.0001
    ) {

      desired.add(

        pheromone.multiplyScalar(
          this.PHEROMONE_WEIGHT
        )
      );
    }


    desired.add(

      toGoal.multiplyScalar(
        this.GOAL_WEIGHT
      )
    );


    desired.add(

      ant.wander
        .clone()
        .multiplyScalar(
          this.RANDOM_WEIGHT
        )
    );


    if (
      desired.lengthSq() >
      0.0001
    ) {

      desired.normalize();

    } else {

      desired.copy(
        ant.direction
      );
    }


    // --------------------------------------------------------
    // TURN
    // --------------------------------------------------------

    const currentAngle =
      Math.atan2(

        ant.direction.y,

        ant.direction.x
      );


    const desiredAngle =
      Math.atan2(

        desired.y,

        desired.x
      );


    let difference =
      desiredAngle -
      currentAngle;


    while (
      difference >
      Math.PI
    ) {

      difference -=
        Math.PI * 2;
    }


    while (
      difference <
      -Math.PI
    ) {

      difference +=
        Math.PI * 2;
    }


    const maxTurn =
      this.TURN_SPEED *
      delta;


    const turn =
      THREE.MathUtils.clamp(

        difference,

        -maxTurn,

        maxTurn
      );


    this.rotateVector(

      ant.direction,

      turn
    );


    ant.direction.normalize();


    // --------------------------------------------------------
    // MOVE
    // --------------------------------------------------------

    ant.position.add(

      ant.direction
        .clone()
        .multiplyScalar(

          ant.speed *
          delta
        )
    );


    // --------------------------------------------------------
    // VISUAL
    // --------------------------------------------------------

    this.syncAnt(
      ant
    );


    this.animateLegs(
      ant,
      delta
    );
  }


  // ==========================================================
  // VISUAL POSITION
  // ==========================================================

  private syncAnt(
    ant: Ant
  ): void {

    /*
     * WICHTIG:
     *
     * Hier wird NIEMALS scrollY verwendet.
     *
     * Die Weltposition der Ameise bleibt
     * vollständig unabhängig vom Scrollen.
     */

    ant.group.position.set(

      ant.position.x,

      ant.position.y,

      0
    );


    ant.group.rotation.z =
      Math.atan2(

        ant.direction.y,

        ant.direction.x
      );
  }


  // ==========================================================
  // LEGS
  // ==========================================================

  private animateLegs(
    ant: Ant,
    delta: number
  ): void {

    ant.phase +=

      delta *
      ant.speed *
      38;


    let meshIndex = 0;


    ant.group.children.forEach(
      child => {

        if (
          child instanceof THREE.Mesh
        ) {

          /*
           * 0 = abdomen
           * 1 = thorax
           * 2 = head
           *
           * Danach Beine.
           */

          if (
            meshIndex >= 3 &&
            meshIndex < 9
          ) {

            const legIndex =
              meshIndex - 3;


            const side =
              legIndex % 2 === 0
                ? 1
                : -1;


            child.rotation.x =

              Math.sin(

                ant.phase +

                legIndex *
                1.1

              ) *

              0.55 *

              side;
          }


          meshIndex++;
        }
      }
    );
  }


  // ==========================================================
  // CREATE COLONY
  // ==========================================================

  private createColony(): void {

    if (
      this.colonies.length >=
      this.MAX_COLONIES
    ) {

      return;
    }


    const world =
      this.getDocumentWorld();


    const halfWidth =
      world.width / 2;


    /*
     * Die Straße wird irgendwo auf
     * der kompletten Dokumenthöhe erzeugt.
     *
     * Y = 0 ist ganz oben.
     *
     * Nach unten wird Y negativ.
     */

    const centerY =
      -Math.random() *
      world.height;


    /*
     * Links oder rechts.
     */

    const fromLeft =
      Math.random() < 0.5;


    const startX =
      fromLeft

        ? -halfWidth - 2

        : halfWidth + 2;


    const goalX =
      fromLeft

        ? halfWidth + 2

        : -halfWidth - 2;


    /*
     * Großer vertikaler Versatz.
     *
     * Dadurch entstehen diagonale
     * Straßen über die Seite.
     */

    const verticalTravel =
      (
        Math.random() -
        0.5
      ) * 14;


    const start =
      new THREE.Vector2(

        startX,

        centerY
      );


    const goal =
      new THREE.Vector2(

        goalX,

        centerY +
        verticalTravel
      );


    const ants:
      Ant[] = [];


    const initialDirection =
      goal.clone()
        .sub(start)
        .normalize();


    // --------------------------------------------------------
    // CREATE ANTS
    // --------------------------------------------------------

    for (
      let i = 0;
      i < this.ANTS_PER_COLONY;
      i++
    ) {

      const ant =
        this.createAnt();


      /*
       * Kette.
       */

      ant.position.copy(
        start
      );


      ant.position.sub(

        initialDirection
          .clone()
          .multiplyScalar(

            i *
            this.ANT_DISTANCE
          )
      );


      /*
       * Kleine seitliche Streuung.
       */

      const perpendicular =
        new THREE.Vector2(

          -initialDirection.y,

          initialDirection.x
        );


      ant.position.add(

        perpendicular.multiplyScalar(

          (
            Math.random() -
            0.5
          ) * 0.5
        )
      );


      /*
       * Nicht alle exakt gleich ausrichten.
       */

      ant.direction =
        initialDirection.clone();


      this.rotateVector(

        ant.direction,

        (
          Math.random() -
          0.5
        ) * 0.7
      );


      ant.direction.normalize();


      this.syncAnt(
        ant
      );


      this.scene.add(
        ant.group
      );


      ants.push(
        ant
      );
    }


    // --------------------------------------------------------
    // COLONY
    // --------------------------------------------------------

    const colony:
      Colony = {

      ants,

      start:
        start.clone(),

      goal:
        goal.clone(),

      pheromones:
        new Map(),

      age:
        0,

      lifetime:

        this.MIN_LIFETIME +

        Math.random() *

        (
          this.MAX_LIFETIME -
          this.MIN_LIFETIME
        ),

      dying:
        false
    };


    this.colonies.push(
      colony
    );
  }


  // ==========================================================
  // UPDATE COLONY
  // ==========================================================

  private updateColony(
    colony: Colony,
    delta: number
  ): void {

    colony.age +=
      delta;


    if (
      colony.age >
      colony.lifetime
    ) {

      colony.dying =
        true;
    }


    for (
      const ant of colony.ants
    ) {

      if (
        colony.dying
      ) {

        ant.speed =
          THREE.MathUtils.lerp(

            ant.speed,

            0.10,

            delta * 0.3
          );
      }


      this.updateAnt(

        colony,

        ant,

        delta
      );
    }


    /*
     * Nach Ablauf entfernen.
     */

    if (
      colony.dying &&

      colony.age >
      colony.lifetime +
      10
    ) {

      this.destroyColony(
        colony
      );
    }
  }


  // ==========================================================
  // DESTROY COLONY
  // ==========================================================

  private destroyColony(
    colony: Colony
  ): void {

    for (
      const ant of colony.ants
    ) {

      this.scene.remove(
        ant.group
      );


      ant.group.traverse(
        object => {

          if (
            object instanceof THREE.Mesh
          ) {

            object.geometry.dispose();
          }
        }
      );


      ant.material.dispose();
    }


    colony.pheromones.clear();


    const index =
      this.colonies.indexOf(
        colony
      );


    if (
      index !== -1
    ) {

      this.colonies.splice(
        index,
        1
      );
    }
  }


  // ==========================================================
  // SPAWNER
  // ==========================================================

  private updateSpawner(
    delta: number
  ): void {

    this.spawnTimer -=
      delta;


    if (
      this.spawnTimer > 0
    ) {

      return;
    }


    this.createColony();


    this.spawnTimer =

      this.MIN_SPAWN_INTERVAL +

      Math.random() *

      (
        this.MAX_SPAWN_INTERVAL -
        this.MIN_SPAWN_INTERVAL
      );
  }


  // ==========================================================
  // ANIMATION
  // ==========================================================

  private animate =
    (): void => {

      this.animationId =
        requestAnimationFrame(
          this.animate
        );


      const now =
        performance.now();


      let delta =
        (
          now -
          this.lastTime
        ) / 1000;


      this.lastTime =
        now;


      /*
       * Schutz bei Tabwechsel.
       */
      delta =
        Math.min(
          delta,
          0.05
        );


      this.simulationTime +=
        delta;


      /*
       * Nur Kamera an Scrollposition
       * anpassen.
       *
       * Ameisen bleiben unberührt.
       */

      this.updateCamera();


      /*
       * Neue Straßen.
       */

      this.updateSpawner(
        delta
      );


      /*
       * Simulation.
       */

      for (
        const colony of [
          ...this.colonies
        ]
      ) {

        this.updateColony(

          colony,

          delta
        );
      }


      /*
       * Render.
       */

      this.renderer.render(

        this.scene,

        this.camera
      );
  };


  // ==========================================================
  // DESTROY
  // ==========================================================

  ngOnDestroy(): void {

    cancelAnimationFrame(
      this.animationId
    );


    window.removeEventListener(
      'resize',
      this.onResize
    );


    window.removeEventListener(
      'scroll',
      this.onScroll
    );


    this.scene.traverse(
      object => {

        if (
          object instanceof THREE.Mesh
        ) {

          object.geometry.dispose();


          if (
            Array.isArray(
              object.material
            )
          ) {

            for (
              const material
              of object.material
            ) {

              material.dispose();
            }

          } else {

            object.material.dispose();
          }
        }
      }
    );


    this.renderer.dispose();
  }
}