import { create } from 'zustand';

export interface ComponentData {
  id: string;
  type: string;
  props: Record<string, any>;
  children?: ComponentData[];
}

export interface PageData {
  components: ComponentData[];
  styles: Record<string, any>;
}

export interface ProjectData {
  id?: string;
  name: string;
  pages: Record<string, PageData>;
  currentPage: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    fontFamily: string;
  };
  createdAt?: string;
  updatedAt?: string;
}

interface BuilderState {
  project: ProjectData;
  selectedComponent: string | null;
  history: ProjectData[];
  historyIndex: number;

  // Actions
  setProject: (project: ProjectData) => void;
  addComponent: (component: ComponentData, index?: number) => void;
  updateComponent: (id: string, props: Record<string, any>) => void;
  removeComponent: (id: string) => void;
  reorderComponents: (oldIndex: number, newIndex: number) => void;
  selectComponent: (id: string | null) => void;
  updateTheme: (theme: Partial<ProjectData['theme']>) => void;
  undo: () => void;
  redo: () => void;
  resetProject: () => void;
}

const defaultProject: ProjectData = {
  name: 'New Website',
  pages: {
    home: {
      components: [],
      styles: {},
    },
  },
  currentPage: 'home',
  theme: {
    primaryColor: '#8B4513',
    secondaryColor: '#DAA520',
    fontFamily: 'Inter, system-ui, sans-serif',
  },
};

export const useBuilderStore = create<BuilderState>((set, get) => ({
  project: defaultProject,
  selectedComponent: null,
  history: [defaultProject],
  historyIndex: 0,

  setProject: (project) => {
    set({
      project,
      history: [project],
      historyIndex: 0,
    });
  },

  addComponent: (component, index) => {
    const state = get();
    const currentPage = state.project.pages[state.project.currentPage];
    const newComponents = [...currentPage.components];

    if (index !== undefined) {
      newComponents.splice(index, 0, component);
    } else {
      newComponents.push(component);
    }

    const newProject = {
      ...state.project,
      pages: {
        ...state.project.pages,
        [state.project.currentPage]: {
          ...currentPage,
          components: newComponents,
        },
      },
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newProject);

    set({
      project: newProject,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  updateComponent: (id, props) => {
    const state = get();
    const currentPage = state.project.pages[state.project.currentPage];

    const updateComponentRecursive = (components: ComponentData[]): ComponentData[] => {
      return components.map(comp => {
        if (comp.id === id) {
          return { ...comp, props: { ...comp.props, ...props } };
        }
        if (comp.children) {
          return { ...comp, children: updateComponentRecursive(comp.children) };
        }
        return comp;
      });
    };

    const newComponents = updateComponentRecursive(currentPage.components);
    const newProject = {
      ...state.project,
      pages: {
        ...state.project.pages,
        [state.project.currentPage]: {
          ...currentPage,
          components: newComponents,
        },
      },
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newProject);

    set({
      project: newProject,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  removeComponent: (id) => {
    const state = get();
    const currentPage = state.project.pages[state.project.currentPage];

    const removeComponentRecursive = (components: ComponentData[]): ComponentData[] => {
      return components
        .filter(comp => comp.id !== id)
        .map(comp => {
          if (comp.children) {
            return { ...comp, children: removeComponentRecursive(comp.children) };
          }
          return comp;
        });
    };

    const newComponents = removeComponentRecursive(currentPage.components);
    const newProject = {
      ...state.project,
      pages: {
        ...state.project.pages,
        [state.project.currentPage]: {
          ...currentPage,
          components: newComponents,
        },
      },
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newProject);

    set({
      project: newProject,
      selectedComponent: state.selectedComponent === id ? null : state.selectedComponent,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  reorderComponents: (oldIndex, newIndex) => {
    const state = get();
    const currentPage = state.project.pages[state.project.currentPage];
    const newComponents = [...currentPage.components];
    const [removed] = newComponents.splice(oldIndex, 1);
    newComponents.splice(newIndex, 0, removed);

    const newProject = {
      ...state.project,
      pages: {
        ...state.project.pages,
        [state.project.currentPage]: {
          ...currentPage,
          components: newComponents,
        },
      },
    };

    const newHistory = state.history.slice(0, state.historyIndex + 1);
    newHistory.push(newProject);

    set({
      project: newProject,
      history: newHistory,
      historyIndex: newHistory.length - 1,
    });
  },

  selectComponent: (id) => {
    set({ selectedComponent: id });
  },

  updateTheme: (theme) => {
    const state = get();
    const newProject = {
      ...state.project,
      theme: { ...state.project.theme, ...theme },
    };

    set({ project: newProject });
  },

  undo: () => {
    const state = get();
    if (state.historyIndex > 0) {
      const newIndex = state.historyIndex - 1;
      set({
        project: state.history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  redo: () => {
    const state = get();
    if (state.historyIndex < state.history.length - 1) {
      const newIndex = state.historyIndex + 1;
      set({
        project: state.history[newIndex],
        historyIndex: newIndex,
      });
    }
  },

  resetProject: () => {
    set({
      project: defaultProject,
      selectedComponent: null,
      history: [defaultProject],
      historyIndex: 0,
    });
  },
}));
