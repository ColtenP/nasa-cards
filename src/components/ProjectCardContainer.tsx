import React from 'react'
import { Project } from '../types/techport'
import { splitArrayIntoChunks } from '../utils/arrays'
import ProjectCard from './ProjectCard'

export type ProjectCardContainerProps = {
  projects: Project[]
  onDelete: (project: Project) => void
}

export default function ProjectCardContainer (props: ProjectCardContainerProps) {
  return <div className="cards">
    {
    splitArrayIntoChunks(props.projects, 2)
      .map((chunk, index) =>
        <div key={index} className="card-column">
          {chunk.map(project => <ProjectCard key={project.id} project={project} onDelete={props.onDelete} />)}
        </div>
      )
  }
  </div>
}
