import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import ProjectCard from './ProjectCard';
import { Project } from '../types/techport';

const project: Project = {
  id: 'id',
  title: 'title',
  status: 'active',
  lastUpdated: '2021-01-02',
  startDate: '2021-01-01',
  description: 'Description!'
}

test('Displays Project Information', () => {
  const onDelete = (deleted: Project) => {}

  render(<ProjectCard project={project} onDelete={onDelete} />);
  expect(screen.getByText(/title/i)).toBeInTheDocument()
  expect(screen.getByText(/active/i)).toBeInTheDocument()
  expect(screen.getByText(/2021-01-01/i)).toBeInTheDocument()
  expect(screen.getByText(/2021-01-02/i)).toBeInTheDocument()
  expect(screen.getByText(/Description!/i)).toBeInTheDocument()
});

test('Handles delete properly', async () => {
  let deletedProject: Project | null = null
  const onDelete = (deleted: Project) => { deletedProject = deleted }

  const {container} = render(<ProjectCard project={project} onDelete={onDelete} />);
  const deleteBtn = container.querySelector('button.btn.remove-btn')
  if (deleteBtn) {
    fireEvent.click(deleteBtn)
  }
  await waitFor(() => {
    expect(deletedProject).toEqual(project)
  })
})

test('It expands when you click expand', async () => {
  const onDelete = (deleted: Project) => {}

  const {container} = render(<ProjectCard project={project} onDelete={onDelete} />);
  const expandBtn = container.querySelector('.expand-btn')
  expect(container.querySelector('.is-collapsed')).toBeInTheDocument()
  if (expandBtn) {
    fireEvent.click(expandBtn)
  }
  await waitFor(() => {
    expect(container.querySelector('.is-collapsed')).not.toBeInTheDocument()
  })
})
