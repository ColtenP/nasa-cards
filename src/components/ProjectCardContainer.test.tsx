import React from 'react';
import { render, waitFor, act, fireEvent } from '@testing-library/react';
import ProjectCardContainer from './ProjectCardContainer';
import { Project } from '../types/techport';

const project: Project = {
  id: 'id',
  title: 'title',
  status: 'active',
  lastUpdated: '2021-01-02',
  startDate: '2021-01-01',
  description: 'Description!'
}

test('Displays two columns, but one card', () => {
  const onDelete = (deleted: Project) => {}

  const {container} = render(<ProjectCardContainer projects={[project]} onDelete={onDelete} />);
  expect(container.querySelectorAll('.card-column').length).toBe(2)
  expect(container.querySelectorAll('.project-card').length).toBe(1)
});

test('Handles delete properly', async () => {
  let deletedProject: Project | null = null
  const onDelete = (deleted: Project) => { deletedProject = deleted }

  const {container} = render(<ProjectCardContainer projects={[project]} onDelete={onDelete} />);
  const deleteBtn = container.querySelector('button.btn.remove-btn')
  if (deleteBtn) {
    act(() => {
      fireEvent.click(deleteBtn)
    })
  }
  await waitFor(() => {
    expect(deletedProject).toEqual(project)
  })
})
