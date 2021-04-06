import React, { useEffect } from 'react'
import loaderSvg from '../assets/img/loader.svg'
import '../assets/style/Loader.scss'

/**
 * Loader Component, displays a simple overlay with an svg spinner along
 * with text underneath that says "Loading". Also toggles a class on the
 * body element to disable scrolling while loading.
 *
 * @returns LoaderComponent
 */
export default function Loader() {
  // Toggle the has-loader on mount and then on unmount to disable scrolling
  useEffect(() => {
    document.documentElement.classList.add('has-loader')

    return () => document.documentElement.classList.remove('has-loader')
  }, [])

  return <div className="loader-overlay">
    <img src={loaderSvg} alt="Spinning Loader" />
    <div className="text">Loading</div>
  </div>
}
