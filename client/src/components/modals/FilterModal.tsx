import { Popover } from '@headlessui/react';
import popupStyles from './styles/popupModal.module.scss';
import filterStyles from './styles/filterStyles.module.scss';

const FilterModal = () => {
    return (
        <>
            <Popover.Panel className={filterStyles.filterWrap}>
                <div className={popupStyles.popoverBody}>
                    <p className={popupStyles.popupHeader}>Filters</p>
                </div>
            </Popover.Panel>
        </>
    );
};

export default FilterModal;
