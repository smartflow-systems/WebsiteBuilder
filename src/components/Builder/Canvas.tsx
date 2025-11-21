import React from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';
import { useBuilderStore } from '../../store/builderStore';
import { SortableComponent } from './SortableComponent';
import { ComponentRenderer } from './ComponentRenderer';
import { Trash2 } from 'lucide-react';

export const Canvas: React.FC = () => {
  const { project, selectedComponent, selectComponent, reorderComponents, removeComponent } = useBuilderStore();
  const [activeId, setActiveId] = React.useState<string | null>(null);
  const currentPage = project.pages[project.currentPage];

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = currentPage.components.findIndex((c) => c.id === active.id);
      const newIndex = currentPage.components.findIndex((c) => c.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        reorderComponents(oldIndex, newIndex);
      }
    }

    setActiveId(null);
  };

  const handleComponentClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    selectComponent(id);
  };

  const handleCanvasClick = () => {
    selectComponent(null);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    removeComponent(id);
  };

  return (
    <div
      className="flex-1 bg-gray-50 overflow-auto p-8"
      onClick={handleCanvasClick}
      style={{
        fontFamily: project.theme.fontFamily,
      }}
    >
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg min-h-screen">
        {currentPage.components.length === 0 ? (
          <div className="flex items-center justify-center h-96 border-4 border-dashed border-gray-300 rounded-lg m-8">
            <div className="text-center text-gray-500">
              <p className="text-xl font-semibold mb-2">Start Building Your Website</p>
              <p className="text-sm">Drag components from the library to get started</p>
            </div>
          </div>
        ) : (
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={currentPage.components.map((c) => c.id)}
              strategy={verticalListSortingStrategy}
            >
              {currentPage.components.map((component) => (
                <SortableComponent key={component.id} id={component.id}>
                  <div
                    className={`relative group ${
                      selectedComponent === component.id
                        ? 'ring-4 ring-blue-500 ring-opacity-50'
                        : 'hover:ring-2 hover:ring-blue-300'
                    }`}
                    onClick={(e) => handleComponentClick(component.id, e)}
                  >
                    <ComponentRenderer component={component} theme={project.theme} />

                    {/* Component Controls */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
                      <button
                        onClick={(e) => handleDelete(component.id, e)}
                        className="bg-red-500 hover:bg-red-600 text-white p-2 rounded shadow-lg"
                        title="Delete component"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Component Label */}
                    <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded shadow-lg">
                        {component.type}
                      </span>
                    </div>
                  </div>
                </SortableComponent>
              ))}
            </SortableContext>

            <DragOverlay>
              {activeId ? (
                <div className="opacity-50">
                  <ComponentRenderer
                    component={currentPage.components.find((c) => c.id === activeId)!}
                    theme={project.theme}
                  />
                </div>
              ) : null}
            </DragOverlay>
          </DndContext>
        )}
      </div>
    </div>
  );
};
