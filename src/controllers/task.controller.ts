import { Request, Response } from 'express'
import Task from '../models/Task'

// Obtener todas las tareas
export const getAllTasks = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const tasks = await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ message: 'Error al obtener tareas' })
  }
}

// Crear una nueva tarea
export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { description, status } = req.body
    const newTask = new Task({ description, status })
    const savedTask = await newTask.save()
    res.status(201).json(savedTask)
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).json({ message: 'Error al crear tarea' })
  }
}

// Actualizar una tarea por ID
export const updateTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const updates = req.body
    const updatedTask = await Task.findByIdAndUpdate(id, updates, { new: true })
    if (!updatedTask) {
      res.status(404).json({ message: 'Tarea no encontrada' })
      return
    }
    res.status(200).json(updatedTask)
  } catch (error) {
    console.error('Error updating task:', error)
    res.status(500).json({ message: 'Error al actualizar tarea' })
  }
}

// Eliminar una tarea por ID
export const deleteTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params
    const deleted = await Task.findByIdAndDelete(id)
    if (!deleted) {
      res.status(404).json({ message: 'Tarea no encontrada' })
      return
    }
    res.status(204).send()
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).json({ message: 'Error al eliminar tarea' })
  }
}
