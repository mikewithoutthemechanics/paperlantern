import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function LanternScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(55, mount.clientWidth / mount.clientHeight, 0.1, 120)
    camera.position.z = 8

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.2
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    // ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(ambient)

    // warm key light
    const key = new THREE.PointLight(0xffb42e, 3.2, 24)
    key.position.set(1.5, 1, 4)
    scene.add(key)

    // rim light (amber-hot)
    const rim = new THREE.PointLight(0xff4d2c, 1.5, 20)
    rim.position.set(-2.5, -1, 2)
    scene.add(rim)

    // soft fill
    const fill = new THREE.PointLight(0x2233ff, 0.5, 18)
    fill.position.set(0, 2, -3)
    scene.add(fill)

    // core orb
    const coreGeo = new THREE.IcosahedronGeometry(1.15, 2)
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0xffa824,
      emissive: 0xff7c18,
      emissiveIntensity: 0.95,
      roughness: 0.25,
      metalness: 0.15,
      flatShading: true,
    })
    const core = new THREE.Mesh(coreGeo, coreMat)
    group.add(core)

    // inner glow ring - orbiting
    const ringGeo = new THREE.TorusGeometry(1.7, 0.012, 8, 90)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb42e, transparent: true, opacity: 0.8 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    group.add(ring)

    const ring2Geo = new THREE.TorusGeometry(2.1, 0.006, 8, 90)
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xff6b2c, transparent: true, opacity: 0.45 })
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat)
    ring2.rotation.x = Math.PI / 2.4
    group.add(ring2)

    // exploded low-poly shards around the core
    const shardCount = 36
    for (let i = 0; i < shardCount; i++) {
      const sGeo = new THREE.TetrahedronGeometry(0.18, 0)
      const sMat = new THREE.MeshBasicMaterial({ color: 0xffa824, transparent: true, opacity: 0.5 })
      const shard = new THREE.Mesh(sGeo, sMat)
      const theta = (i / shardCount) * Math.PI * 2
      const r = 1.7 + Math.random() * 1.3
      shard.position.set(Math.cos(theta) * r, (Math.random() - 0.5) * 1.6, Math.sin(theta) * r)
      shard.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      group.add(shard)
    }

    // wireframe lattice cage
    const cageGeo = new THREE.IcosahedronGeometry(2.6, 1)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffb42e,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
    })
    const cage = new THREE.Mesh(cageGeo, cageMat)
    group.add(cage)

    // larger far fog shell
    const shellGeo = new THREE.IcosahedronGeometry(3.6, 1)
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    shell.scale.setScalar(1.4)
    group.add(shell)

    // particles
    const particleCount = 2200
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 1.8 + Math.random() * 8
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
      const warm = 1 - Math.random() * 0.3
      colors[i * 3] = 1
      colors[i * 3 + 1] = warm * 0.62
      colors[i * 3 + 2] = warm * 0.25
    }
    const pGeo = new THREE.BufferGeometry()
    pGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    pGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    const pMat = new THREE.PointsMaterial({
      size: 0.035,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })
    const particles = new THREE.Points(pGeo, pMat)
    group.add(particles)

    // lens light rays (thin additive spikes)
    const rayCount = 40
    const rayGroup = new THREE.Group()
    for (let i = 0; i < rayCount; i++) {
      const len = 2.5 + Math.random() * 3
      const rayGeo = new THREE.BufferGeometry()
      const verts = new Float32Array([0,0,0, len * (Math.random()-0.5)*0.4, len, len * (Math.random()-0.5)*0.4])
      rayGeo.setAttribute('position', new THREE.BufferAttribute(verts, 3))
      const rayMat = new THREE.LineBasicMaterial({ color: 0xffb42e, transparent: true, opacity: 0.12 })
      const ray = new THREE.Line(rayGeo, rayMat)
      ray.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0)
      rayGroup.add(ray)
    }
    group.add(rayGroup)

    const clock = new THREE.Clock()

    let mouseX = 0
    let mouseY = 0
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', onMouseMove)

    const onResize = () => {
      if (!mount) return
      const w = mount.clientWidth
      const h = mount.clientHeight
      camera.aspect = w / h
      camera.updateProjectionMatrix()
      renderer.setSize(w, h)
    }
    window.addEventListener('resize', onResize)

    function animate() {
      const t = clock.getElapsedTime()

      group.rotation.y += 0.0006
      core.rotation.x = t * 0.12
      core.rotation.y = t * 0.18
      ring.rotation.x = t * 0.35
      ring.rotation.y = t * 0.2
      ring2.rotation.x = t * 0.2
      ring2.rotation.z = t * 0.3
      cage.rotation.y = t * 0.05
      cage.rotation.x = t * 0.025
      shell.rotation.z = t * 0.008
      shell.rotation.y = t * 0.015
      rayGroup.rotation.y = t * 0.01

      // pulse core + halos
      const pulse = 1 + Math.sin(t * 2) * 0.04
      core.scale.setScalar(pulse)
      const intensity = 0.8 + Math.sin(t * 2) * 0.2
      key.intensity = 3 + Math.sin(t * 1.6) * 0.6

      // particles drift slowly
      particles.rotation.y = t * 0.01
      particles.rotation.z = t * 0.004

      // mouse tilt
      group.rotation.x += (mouseY * 0.16 - group.rotation.x) * 0.02
      group.rotation.z += (mouseX * 0.14 - group.rotation.z) * 0.02

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount) mount.removeChild(renderer.domElement)
      renderer.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
