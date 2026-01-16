// Three.js 3D Background
let scene, camera, renderer, controls;
let particles = [];

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
    renderer.setPixelRatio(window.devicePixelRatio);
    document.getElementById('canvas-container').appendChild(renderer.domElement);
    
    // Add orbit controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0x64a0ff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Create floating particles with tech icons
    const particleGeometry = new THREE.SphereGeometry(0.1, 8, 8);
    const particleMaterials = [
        new THREE.MeshBasicMaterial({ color: 0x64a0ff }),
        new THREE.MeshBasicMaterial({ color: 0xa064ff }),
        new THREE.MeshBasicMaterial({ color: 0xff6480 }),
        new THREE.MeshBasicMaterial({ color: 0x64ffa0 })
    ];
    
    // Create floating 3D shapes representing tech skills
    createFloatingShapes();
    
    // Create background particles
    for(let i = 0; i < 500; i++) {
        const material = particleMaterials[Math.floor(Math.random() * particleMaterials.length)];
        const particle = new THREE.Mesh(particleGeometry, material);
        
        // Random position
        particle.position.x = (Math.random() - 0.5) * 100;
        particle.position.y = (Math.random() - 0.5) * 100;
        particle.position.z = (Math.random() - 0.5) * 100;
        
        // Random scale
        const scale = Math.random() * 1.5 + 0.5;
        particle.scale.set(scale, scale, scale);
        
        // Store velocity
        particle.userData = {
            velocity: new THREE.Vector3(
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02,
                (Math.random() - 0.5) * 0.02
            )
        };
        
        scene.add(particle);
        particles.push(particle);
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation
    animate();
}

function createFloatingShapes() {
    // Create tech-related 3D shapes
    const shapes = [];
    
    // Python logo shape
    const pythonGeometry = new THREE.TorusGeometry(3, 1, 8, 16);
    const pythonMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x3776ab,
        shininess: 100 
    });
    const pythonShape = new THREE.Mesh(pythonGeometry, pythonMaterial);
    pythonShape.position.set(-15, 5, -10);
    scene.add(pythonShape);
    shapes.push(pythonShape);
    
    // Java logo shape
    const javaGeometry = new THREE.OctahedronGeometry(3);
    const javaMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x007396,
        shininess: 100 
    });
    const javaShape = new THREE.Mesh(javaGeometry, javaMaterial);
    javaShape.position.set(15, -5, -15);
    scene.add(javaShape);
    shapes.push(javaShape);
    
    // Database shape
    const dbGeometry = new THREE.CylinderGeometry(2, 2, 4, 12);
    const dbMaterial = new THREE.MeshPhongMaterial({ 
        color: 0xff9900,
        shininess: 100 
    });
    const dbShape = new THREE.Mesh(dbGeometry, dbMaterial);
    dbShape.position.set(-10, -10, -20);
    scene.add(dbShape);
    shapes.push(dbShape);
    
    // AI brain shape
    const aiGeometry = new THREE.IcosahedronGeometry(3);
    const aiMaterial = new THREE.MeshPhongMaterial({ 
        color: 0x00cc88,
        wireframe: true,
        shininess: 100 
    });
    const aiShape = new THREE.Mesh(aiGeometry, aiMaterial);
    aiShape.position.set(10, 10, -25);
    scene.add(aiShape);
    shapes.push(aiShape);
    
    // Store shapes for animation
    shapes.forEach(shape => {
        shape.userData = {
            rotationSpeed: new THREE.Vector3(
                Math.random() * 0.01,
                Math.random() * 0.01,
                Math.random() * 0.01
            )
        };
    });
    
    return shapes;
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    
    // Animate particles
    particles.forEach(particle => {
        particle.position.add(particle.userData.velocity);
        
        // Bounce off boundaries
        if (Math.abs(particle.position.x) > 50) particle.userData.velocity.x *= -1;
        if (Math.abs(particle.position.y) > 50) particle.userData.velocity.y *= -1;
        if (Math.abs(particle.position.z) > 50) particle.userData.velocity.z *= -1;
        
        // Gentle rotation
        particle.rotation.x += 0.005;
        particle.rotation.y += 0.005;
    });
    
    // Update controls
    controls.update();
    
    // Render scene
    renderer.render(scene, camera);
}

// Initialize 3D background when page loads
window.addEventListener('load', init3D);