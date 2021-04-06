import React, { useState } from 'react'
import { Project } from "../types/techport";

export type ProjectCardProps = {
  project: Project
  onDelete: (project: Project) => void
}

export default function ProjectCard (props: ProjectCardProps) {
  const [isCollapsed, setIsCollapsed] = useState(true)

  async function copyJson () {
    const canUseClipboard = await navigator.permissions.query({ name: 'clipboard-write' })
    if (canUseClipboard.state === 'granted' || canUseClipboard.state === 'prompt') {
      try {
        await navigator.clipboard.writeText(JSON.stringify(props.project, null, 2))
      } catch (e) {
        console.error(e)
      }
    }
  }

  return <div className={['project-card', isCollapsed ? 'is-collapsed' : null].join(' ')}>
    <div className="title-status">
      <div className="title">{props.project.title}</div>
      <div className="status" data-status={props.project.status}>{props.project.status}</div>
    </div>
    <div className="subtitle">Start Date: {props.project.startDate}</div>
    <div className="subtitle">Last Updated: {props.project.lastUpdated}</div>
    <div className="description" dangerouslySetInnerHTML={{__html: props.project.description}}></div>
    <div className="card-actions">
      <button className="btn mr-auto remove-btn" onClick={e => props.onDelete(props.project)}>Remove</button>
      <button className="btn" onClick={e => copyJson()}>Copy JSON Data</button>
      <button className="btn expand-btn" onClick={e => setIsCollapsed(!isCollapsed)}>
        {isCollapsed ? 'Expand' : 'Collapse'}
      </button>
    </div>
  </div>
}
