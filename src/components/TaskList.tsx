import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../store';
import TaskItem from './TaskItem';
import {
  DragDropContext,
  Droppable,
  Draggable,
  type DropResult,
  type DroppableProvided,
  type DraggableProvided
} from '@hello-pangea/dnd';
import { reorderTasks } from '../store/taskSlice';

const TaskList: React.FC = React.memo(() => {
  const { tasks, filter } = useSelector((state: RootState) => state.task);
  const dispatch = useDispatch();

  const filtered = useMemo(() =>
    tasks.filter(task =>
      filter === 'All' ? true : filter === 'Completed' ? task.completed : !task.completed
    ), [tasks, filter]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const updatedTasks = Array.from(tasks);
    const [moved] = updatedTasks.splice(result.source.index, 1);
    updatedTasks.splice(result.destination.index, 0, moved);

    dispatch(reorderTasks(updatedTasks));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="tasks">
        {(provided: DroppableProvided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {filtered.map((task, index) => (
              <Draggable key={task.id} draggableId={task.id} index={index}>
                {(provided: DraggableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="mb-3"
                    style={{
                      ...provided.draggableProps.style,
                      transition: 'transform 0.2s ease',
                    }}
                  >
                    <TaskItem task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
});

export default TaskList;
