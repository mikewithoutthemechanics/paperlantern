import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const PARTICLE_COUNT = 4500

function getShapePoints() {
  // sample a glowing lantern-ish shape: icosahedron core + ring + top/bottom points
  const points = []

  // icosahedron surface (approx) — denser points
  const pts = new THREE.IcosahedronGeometry(1.6, 4)
  const pos = pts.attributes.position
  for (let i = 0; i < pos.count; i++) {
    points.push(new THREE.Vector3(pos.getX(i), pos.getY(i), pos.getZ(i)))
  }

  // vertical beams / rays
  for (let i = 0; i < 120; i++) {
    const t = i / 120
    const angle = t * Math.PI * 2
    const r = 0.3 + Math.sin(t * 8) * 0.1
    points.push(new THREE.Vector3(Math.sin(angle) * r, 1.8 + Math.sin(t * 9) * 1.2, Math.cos(angle) * r))
  }

  // orbitting ring
  for (let i = 0; i < 200; i++) {
    const t = i / 200
    const a = t * Math.PI * 2
    points.push(new THREE.Vector3(Math.cos(a) * 2.3, Math.sin(a * 7) * 0.25, Math.sin(a) * 2.3))
  }

  // outer halo static points
  for (let i = 0; i < 300; i++) {
    const theta = Math.random() * Math.PI * 2
    const phi = Math.acos(2 * Math.random() - 1)
    const r = 1.5 + Math.random() * 0.8
    points.push(new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi)))
  }

  return points
}

export default function ParticleLantern() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, mount.clientWidth / mount.clientHeight, 0.1, 50)
    camera.position.z = 5.5

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    mount.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const shapePoints = getShapePoints()

    // Build particle data: chaos positions + target shape positions
    const positions = new Float32Array(PARTICLE_COUNT * 3)
    const targets = new Float32Array(PARTICLE_COUNT * 3)
    const colors = new Float32Array(PARTICLE_COUNT * 3)

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // target = pick one shape point (with some scaling variance)
      const sp = shapePoints[Math.floor(Math.random() * shapePoints.length)]
      const s = 0.9 + Math.random() * 0.25
      targets[i * 3] = sp.x * s
      targets[i * 3 + 1] = sp.y * s
      targets[i * 3 + 2] = sp.z * s

      // chaos = random sphere shell
      const r = 1.5 + Math.random() * 4.5
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)

      const t = Math.random()
      colors[i * 3] = 1
      colors[i * 3 + 1] = 0.55 + t * 0.35
      colors[i * 3 + 2] = 0.2 + t * 0.25
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geo.setAttribute('target', new THREE.BufferAttribute(targets, 3))

    const mat = new THREE.PointsMaterial({
      size: 0.028,
      vertexColors: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    const points = new THREE.Points(geo, mat)
    group.add(points)

    // a faint wireframe shell to suggest structure
    const shellGeo = new THREE.IcosahedronGeometry(2.1, 1)
    const shellMat = new THREE.MeshBasicMaterial({ color: 0xffb42e, wireframe: true, transparent: true, opacity: 0.06 })
    const shell = new THREE.Mesh(shellGeo, shellMat)
    group.add(shell)

    // faint orbiting rings
    const ringGeo = new THREE.TorusGeometry(3.0, 0.006, 8, 120)
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffb42e, transparent: true, opacity: 0.14 })
    const ring = new THREE.Mesh(ringGeo, ringMat)
    group.add(ring)
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(2.7, 0.004, 8, 120), new THREE.MeshBasicMaterial({ color: 0xff4d2c, transparent: true, opacity: 0.08 }))
    ring2.rotation.x = Math.PI / 2.3
    group.add(ring2)

    const clock = new THREE.Clock()
    let scrollY = 0
    let mouseX = 0
    let mouseY = 0

    const onScroll = () => {
      scrollY = window.scrollY
    }
    const onMouseMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1
      mouseY = (e.clientY / window.innerHeight) * 2 - 1
    }
    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('scroll', onScroll)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    // Animate particles between chaos and shape
    function animate() {
      const t = clock.getElapsedTime()
      const arr = geo.attributes.position.array
      const tgt = geo.attributes.target.array

      // base organization = scroll progress through hero (0-1 by hero height)
      const hero = mount.closest('section')
      const heroH = hero ? hero.offsetHeight : window.innerHeight
      const progress = Math.min(1, Math.max(0, scrollY / (heroH * 0.75)))
      // mouse proximity adds a gentle impulse
      const mouseInfluence = Math.min(1, 0.25 + (mouseX * mouseX + mouseY * mouseY) * 0.3)
      const mix = Math.min(1, progress * 0.9 + mouseInfluence * 0.12)
      const ease = 0.05 + mix * 0.06

      for (let i = 0; i < arr.length; i++) {
        // pull toward target
        arr[i] += (tgt[i] - arr[i]) * ease
        // add gentle organic drift always
        arr[i] += Math.sin(t * 0.6 + i * 0.07) * 0.004
      }
      geo.attributes.position.needsUpdate = true

      group.rotation.y = t * 0.12
      ring.rotation.x = t * 0.3
      ring2.rotation.z = t * 0.2
      shell.rotation.y = t * 0.03

      group.rotation.x += (mouseY * 0.12 - group.rotation.x) * 0.02
      group.rotation.z += (mouseX * 0.1 - group.rotation.z) * 0.02

      renderer.render(scene, camera)
      requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      if (mount) mount.removeChild(renderer.domElement)
      renderer.dispose()
      geo.dispose()
      mat.dispose()
      shellGeo.dispose()
      shellMat.dispose()
      ringGeo.dispose()
      ringMat.dispose()
    }
  }, [])

  return <div ref={mountRef} style={{ width: '100%', height: '100%' }} />
}
