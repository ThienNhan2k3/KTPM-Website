import "./styles.css"
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

export default function CustomDropdown({title, items, handleChange}) {
    return (
        <DropdownButton id="game-selector" className="custom-dropdown selector" title={title}>
            {items.map(item => (
                <Dropdown.Item  onClick={() => handleChange(item)}>{item}</Dropdown.Item>
            ))}
        </DropdownButton>
    )
}
