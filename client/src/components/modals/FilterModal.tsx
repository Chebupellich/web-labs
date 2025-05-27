import { Popover } from '@headlessui/react';
import popupStyles from './styles/popupModal.module.scss';
import filterStyles from './styles/filterStyles.module.scss';
import { useEventFilter } from '@contexts/hooks/useEventFilter';
import { Categories, categoryIcons } from '@myTypes/event';

const FilterModal = () => {
    const { activeCategories, toggleCategory, resetCategories } =
        useEventFilter();

    return (
        <Popover.Panel className={filterStyles.filterWrap}>
            <div className={popupStyles.popoverBody}>
                <div
                    className={`${popupStyles.popupHeader} ${filterStyles.headerWrap}`}
                >
                    <p className={popupStyles.header}>Filters</p>
                    <svg
                        className={filterStyles.resetIcon}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        onClick={resetCategories}
                    >
                        <path d="M13,3A9,9 0 0,0 4,12H1L4.89,15.89L4.96,16.03L9,12H6A7,7 0 0,1 13,5A7,7 0 0,1 20,12A7,7 0 0,1 13,19C11.07,19 9.32,18.21 8.06,16.94L6.64,18.36C8.27,20 10.5,21 13,21A9,9 0 0,0 22,12A9,9 0 0,0 13,3Z" />
                    </svg>
                </div>
                <div className={filterStyles.buttonWrap}>
                    {Object.values(Categories).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => toggleCategory(cat)}
                            className={`${filterStyles.filterButton} ${
                                activeCategories.has(cat)
                                    ? filterStyles.active
                                    : ''
                            }`}
                        >
                            {cat}
                            {categoryIcons[cat] && (
                                <img
                                    src={categoryIcons[cat]}
                                    alt=""
                                    className={filterStyles.icon}
                                />
                            )}
                        </button>
                    ))}
                </div>
            </div>
        </Popover.Panel>
    );
};

export default FilterModal;
