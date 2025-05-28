import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Theme } from '@myTypes/ui.ts';
import { Categories } from '@/types/event.ts';

interface UIState {
    showUsersMenu: boolean;
    theme: Theme;
    activeCategories: Categories[];
}

const initialState: UIState = {
    showUsersMenu: false,
    theme: 'dark',
    activeCategories: [],
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleUserMenu(state) {
            state.showUsersMenu = !state.showUsersMenu;
        },
        toggleTheme(state) {
            state.theme = state.theme == 'dark' ? 'light' : 'dark';
        },
        toggleCategory(state, action: PayloadAction<Categories>) {
            const category = action.payload;
            const set = new Set(state.activeCategories);
            if (set.has(category)) {
                set.delete(category);
            } else {
                set.add(category);
            }
            state.activeCategories = Array.from(set);
        },
        resetCategories(state) {
            state.activeCategories = [];
        },
    },
});

export const { toggleUserMenu, toggleTheme, toggleCategory, resetCategories } =
    uiSlice.actions;
export default uiSlice.reducer;
