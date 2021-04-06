export type ProjectOverview = {
  id: string
  lastUpdated: string
}

export type Project = {
  id: string
  title: string
  lastUpdated: string
  status: string
  startDate: string
  description: string
}

export type ListProjectsResponse = {
  projects: {
    projects: ProjectOverview[]
    totalCount: number
  }
}

export type GetProjectResponse = {
  project: Project
}
