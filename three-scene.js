// Three.js 3D Background
let scene, camera, renderer, controls;
let particles = [];
let floatingShapes = [];

function init3D() {
    // Create scene
    scene = new THREE.Scene();
    window.scene = scene;
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    window.camera = camera;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ 
        antialias: true, 
        alpha: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.3;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x64a0ff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Add point light
    const pointLight = new THREE.PointLight(0xa064ff, 0.6, 100);
    pointLight.position.set(-10, -10, 10);
    scene.add(pointLight);
    
    // Create floating particles
    createParticles();
    
    // Create floating 3D shapes
    createFloatingShapes();
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function createParticles() {
    const particleCount = 300;
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x64a0ff, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0xa064ff, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0xff6480, transparent: true, opacity: 0.8 }),
        new THREE.MeshBasicMaterial({ color: 0x64ffa0, transparent: true, opacity: 0.8 })
    ];
    
    for(let i = 0; i < particleCount; i++) {
        const material = particleMaterials[Math.floor(Math.random() * particleMaterials.length)];
        const particle = new THREE.Mesh(particleGeometry, material);
        
        // Random position in a sphere
        const radius = 50;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos((Math.random() * 2) - 1);
        const r = radius * Math.cbrt(Math.random());
        
        particle.position.x = r * Math.sin(phi) * Math.cos(theta);
        particle.position.y = r * Math.sin(phi) * Math.sin(theta);
        particle.position.z = r * Math.cos(phi);
        
        // Random scale
        const scale = Math.random() * 1.5 + 0.5;
        particle.scale.set(scale, scale, scale);
        
        // Store velocity and other properties
        particle.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            ),
            originalPosition: particle.position.clone(),
            floatSpeed: Math.random() * 0.01 + 0.005,
            floatAmplitude: Math.random() * 2 + 1
        };
        
        scene.add(particle);
        particles.push(particle);
    }
}

function createFloatingShapes() {
    // Python logo (torus)
    const pythonGeometry = new THREE.TorusGeometry(3, 1, 8, 16);
    const pythonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3776ab,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const pythonShape = new THREE.Mesh(pythonGeometry, pythonMaterial);
    pythonShape.position.set(-15, 5, -10);
    scene.add(pythonShape);
    floatingShapes.push({
        mesh: pythonShape,
        rotationSpeed: new THREE.Vector3(0.005, 0.01, 0.003),
        floatSpeed: 0.002,
        floatAmplitude: 3
    });
    
    // Java logo (octahedron)
    const javaGeometry = new THREE.OctahedronGeometry(3);
    const javaMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x007396,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const javaShape = new THREE.Mesh(javaGeometry, javaMaterial);
    javaShape.position.set(15, -5, -15);
    scene.add(javaShape);
    floatingShapes.push({
        mesh: javaShape,
        rotationSpeed: new THREE.Vector3(0.003, 0.008, 0.005),
        floatSpeed: 0.003,
        floatAmplitude: 4
    });
    
    // Database (cylinder)
    const dbGeometry = new THREE.CylinderGeometry(2, 2, 4, 12);
    const dbMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff9900,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const dbShape = new THREE.Mesh(dbGeometry, dbMaterial);
    dbShape.position.set(-10, -10, -20);
    scene.add(dbShape);
    floatingShapes.push({
        mesh: dbShape,
        rotationSpeed: new THREE.Vector3(0.004, 0.006, 0.002),
        floatSpeed: 0.0025,
        floatAmplitude: 3.5
    });
    
    // AI (icosahedron)
    const aiGeometry = new THREE.IcosahedronGeometry(3);
    const aiMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00cc88,
        wireframe: true,
        shininess: 100,
        transparent: true,
        opacity: 0.8
    });
    const aiShape = new THREE.Mesh(aiGeometry, aiMaterial);
    aiShape.position.set(10, 10, -25);
    scene.add(aiShape);
    floatingShapes.push({
        mesh: aiShape,
        rotationSpeed: new THREE.Vector3(0.006, 0.004, 0.007),
        floatSpeed: 0.0035,
        floatAmplitude: 5
    });
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

let time = 0;
function animate() {
    requestAnimationFrame(animate);
    time += 0.01;
    
    // Animate particles
    particles.forEach(particle => {
        // Update position with velocity
        particle.position.add(particle.userData.velocity);
        
        // Bounce off boundaries
        if (Math.abs(particle.position.x) > 50) particle.userData.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 50) particle.userData.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 50) particle.userData.velocity.z *= -1;
        
        // Add floating animation
        particle.position.y = particle.userData.originalPosition.y + 
            Math.sin(time * particle.userData.floatSpeed) * particle.userData.floatAmplitude;
        
        // Gentle rotation
        particle.rotation.x += 0.005;
        particle.rotation.y += 0.005;
    });
    
    // Animate floating shapes
    floatingShapes.forEach(shape => {
        // Rotation
        shape.mesh.rotation.x += shape.rotationSpeed.x;
        shape.mesh.rotation.y += shape.rotationSpeed.y;
        shape.mesh.rotation.z += shape.rotationSpeed.z;
        
        // Floating motion
        const floatY = Math.sin(time * shape.floatSpeed) * shape.floatAmplitude;
        shape.mesh.position.y = shape.mesh.userData.originalY || shape.mesh.position.y;
        shape.mesh.position.y += floatY;
        
        if (!shape.mesh.userData.originalY) {
            shape.mesh.userData.originalY = shape.mesh.position.y - floatY;
        }
    });
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize 3D background when page loads
window.addEventListener('load', init3D);