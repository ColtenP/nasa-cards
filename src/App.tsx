import React, { useEffect, useState } from 'react'
import Loader from './components/Loader'
import Paginator from './components/Paginator'
import './assets/style/App.scss'
import { ProjectOverview, Project } from './types/techport'
import { getProject, getProjects } from './utils/techport'
import ProjectCardContainer from './components/ProjectCardContainer'

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [items, setItems] = useState<ProjectOverview[]>([])
  const [visibleItems, setVisibleItems] = useState<ProjectOverview[]>([])
  const [loadedItems, setLoadedItems] = useState<Project[]>([])

  async function fetchAllItems () {
    try {
      setIsLoading(true)
      const res = await getProjects()
      setItems(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  async function fetchVisibleItems () {
    if (visibleItems.length === 0) { return }

    try {
      setIsLoading(true)
      const res = await Promise.all(visibleItems.map(item => getProject(item.id)))
      setLoadedItems(res)
    } catch (e) {
      console.error(e)
    } finally {
      setIsLoading(false)
    }
  }

  function onDeleteProject (project: Project) {
    setItems(items.filter(i => i.id !== project.id))
  }

  useEffect(() => { fetchAllItems() }, [])

  useEffect(() => { fetchVisibleItems() }, [visibleItems])

  return <div className="container">
    { isLoading && <Loader/> }
    <Paginator items={items} onChange={setVisibleItems} />
    <ProjectCardContainer projects={loadedItems} onDelete={onDeleteProject}/>
  </div>
}

export default App;
