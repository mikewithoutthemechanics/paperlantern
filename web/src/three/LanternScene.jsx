import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function LanternScene() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(50, mount.clientWidth / mount.clientHeight, 0.1, 100)
    camera.position.z = 6

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    // group that holds everything so we can tilt it with mouse
    const group = new THREE.Group()
    scene.add(group)

    // soft ambient + warm point light
    const ambient = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambient)
    const point = new THREE.PointLight(0xffc93c, 2.2, 20)
    point.position.set(2, 0.5, 3)
    scene.add(point)

    // central glowing orb (lantern core)
    const geo = new THREE.SphereGeometry(1.1, 48, 48)
    const mat = new THREE.MeshStandardMaterial({
      color: 0xffb02e,
      emissive: 0xff9d2e,
      emissiveIntensity: 0.85,
      roughness: 0.3,
      metalness: 0.1,
    })
    const orb = new THREE.Mesh(geo, mat)
    group.add(orb)

    // transparent warm halo
    const haloGeo = new THREE.SphereGeometry(1.7, 32, 32)
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0xffc93c,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    })
    const halo = new THREE.Mesh(haloGeo, haloMat)
    group.add(halo)

    // outside wireframe cage — engineered, lantern-like
    const cageGeo = new THREE.IcosahedronGeometry(2.1, 1)
    const cageMat = new THREE.MeshBasicMaterial({
      color: 0xffc93c,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    })
    const cage = new THREE.Mesh(cageGeo, cageMat)
    group.add(cage)

    // small orbital particles
    const particleCount = 900
    const positions = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) {
      const r = 2.2 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const particleGeo = new THREE.BufferGeometry()
    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particleMat = new THREE.PointsMaterial({
      color: 0xffc93c,
      size: 0.025,
      transparent: true,
      opacity: 0.65,
    })
    const particles = new THREE.Points(particleGeo, particleMat)
    group.add(particles)

    // ambient slow rotation
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

      group.rotation.y += 0.0008
      orb.rotation.y = t * 0.08
      halo.scale.setScalar(1 + Math.sin(t * 1.4) * 0.08)
      particles.rotation.y = t * 0.015

      // subtle interactive tilt
      group.rotation.x += (mouseY * 0.12 - group.rotation.x) * 0.03
      group.rotation.z += (mouseX * 0.1 - group.rotation.z) * 0.03

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount) {
        mount.removeChild(renderer.domElement)
      }
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      haloGeo.dispose()
      haloMat.dispose()
      cageGeo.dispose()
      cageMat.dispose()
      particleGeo.dispose()
      particleMat.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
