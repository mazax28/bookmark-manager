import { create } from 'zustand';

const useSelectionStore = create((set, get) => ({
  // State
  isEditMode: false,
  selectedIds: [],
  
  // Actions
  toggleEditMode: () => set((state) => ({ 
    isEditMode: !state.isEditMode,
    selectedIds: [] // Clear selections when toggling edit mode
  })),
  
  toggleSelection: (id) => set((state) => {
    const isSelected = state.selectedIds.includes(id);
    return {
      selectedIds: isSelected 
        ? state.selectedIds.filter(itemId => itemId !== id) 
        : [...state.selectedIds, id]
    };
  }),
  
  clearSelection: () => set({ selectedIds: [] }),
  
  // Simple helpers
  isSelected: (id) => get().selectedIds.includes(id),
  
  getSelectedCount: () => get().selectedIds.length,
}));

export default useSelectionStore;