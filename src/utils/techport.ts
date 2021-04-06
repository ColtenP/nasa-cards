import axios from 'axios'
import { GetProjectResponse, ListProjectsResponse } from '../types/techport'

// Make an interceptor that will add the api_key params whenever the request is
// made to the nasa api
axios.interceptors.request.use(
  config => {
    if (config.url?.startsWith('https://api.nasa.gov')) {
      config.params = {
        api_key: 'Ko42nPrr4mOmGhhijoGZdMGXKpjqODSkqa2z3xJz'
      }
    }

    return config
  },
  error => Promise.reject(error)
)

/**
 * Gets all of the project overviews for NASA's Techport API
 *
 * @returns Array of ProjectOverview (limited to 500 for performance)
 */
export async function getProjects () {
  return (await axios.get<ListProjectsResponse>('https://api.nasa.gov/techport/api/projects')).data.projects.projects.slice(0, 500)
}

/**
 * Gets a project with all attributes for NASA's Techport API
 *
 * @param id The id of the project to fetch
 * @returns Full Project object, if id exists
 */
export async function getProject (id: string) {
  return (await axios.get<GetProjectResponse>(`https://api.nasa.gov/techport/api/projects/${id}.json`)).data.project
}
