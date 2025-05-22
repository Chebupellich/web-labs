import Select, {
    ActionMeta,
    GroupBase,
    SingleValue,
    StylesConfig,
} from 'react-select';
// @ts-ignore
import { Categories, categoryOptions } from '@types/event.ts';

interface Props {
    category: Categories;
    onSelect: (newCategory: Categories) => void;
}

const borderRadius = '1rem';
const customStyles: StylesConfig<
    { value: string; label: Categories },
    false,
    GroupBase<{ value: string; label: Categories }>
> = {
    control: (base, state) => ({
        ...base,
        backgroundColor: '#282828',
        borderColor: state.isFocused ? '#76a399' : '#3c3835',
        borderWidth: '1px',
        borderRadius: borderRadius,
        fontSize: '2rem',
        fontWeight: 900,
        color: '#b8ab8d',
        boxShadow: 'none',
        outline: 'none',
        '&:hover': {
            borderColor: '#76a399',
        },
    }),
    option: (base, state) => ({
        ...base,
        backgroundColor: state.isSelected
            ? '#4a4643'
            : state.isFocused
              ? '#3c3835'
              : '#1d2021',
        color: state.isSelected ? '#76a399' : '#b8ab8d',
        fontSize: '1.2rem',
        fontWeight: 700,
        cursor: 'pointer',
        borderRadius: 0, // убрано скругление
    }),
    singleValue: (base) => ({
        ...base,
        color: '#76a399',
        fontSize: '1.5rem',
        fontWeight: 700,
        margin: '0 0.5rem 0 1rem',
    }),
    menu: (base) => ({
        ...base,
        border: '1px solid #3c3835',
        borderRadius: borderRadius,
        backgroundColor: '#1d2021',
        overflow: 'hidden', // ключ
        zIndex: 10,
    }),
    menuList: (base) => ({
        ...base,
        backgroundColor: '#1d2021',
        paddingTop: 0,
        paddingBottom: 0,
    }),
    clearIndicator: (base) => ({
        ...base,
        color: 'transparent',
        cursor: 'pointer',
    }),
    indicatorSeparator: (base) => ({
        ...base,
        backgroundColor: '#76a399',
        width: '1px',
        margin: 'auto 0.25rem',
        height: '40%',
    }),
    dropdownIndicator: (base) => ({
        ...base,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#76a399',

        padding: '0.25rem',
        margin: '0 1rem 0 0.5rem',
        borderRadius: '0.5rem',
        '&:hover': {
            color: '#e5894d',
            backgroundColor: '#4a4643',
        },
        transition: 'color 0.2s ease, backgroundColor 0.2s ease',
        svg: { width: '2rem', height: '2rem' },
    }),
};

const CategorySelect = ({ category, onSelect }: Props) => {
    const handleChange = (
        newValue: SingleValue<{ value: string; label: Categories }>,
        actionMeta: ActionMeta<{ value: string; label: Categories }>
    ) => {
        if (newValue) {
            onSelect(newValue.label);
        }
    };

    return (
        <Select
            styles={customStyles}
            options={categoryOptions}
            value={categoryOptions.find((option) => option.label === category)}
            onChange={handleChange}
            isSearchable={false}
            isMulti={false}
        />
    );
};

export default CategorySelect;
