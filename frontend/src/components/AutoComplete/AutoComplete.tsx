import { Autocomplete, TextField } from "@mui/material";
import { IBand } from "../../interfaces/bands/band.interface";

interface AutoCompleteProps {
  placeholder?: string;
  label?: string;
  options: IBand[];
  onSelectionChange?: (selectedIds: number[]) => void;
}

const AutoComplete: React.FC<AutoCompleteProps> = ({
  placeholder,
  label,
  options,
  onSelectionChange,
}) => {
  const handleSelectionChange = (_event: unknown, value: IBand[]) => {
    const selectedIds = value.map((option) => option.id);
    if (onSelectionChange) {
      onSelectionChange(selectedIds);
    }
  };

  return (
    <Autocomplete
      multiple
      id="tags-standard"
      options={options}
      getOptionLabel={(option) => option.name}
      defaultValue={[]}
      onChange={handleSelectionChange}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label={label}
          placeholder={placeholder}
        />
      )}
    />
  );
};

export default AutoComplete;
