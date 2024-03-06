import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

interface ISearchTextFieldProps {
  onSearchQueryChange: (query: string) => void;
  validateQuery?: (query: string) => boolean;
  placeholder?: string;
}

export const SearchTextField = React.memo<ISearchTextFieldProps>(
  function SearchTextField({
    onSearchQueryChange,
    validateQuery,
    placeholder,
  }) {
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
      if (typeof validateQuery !== "function" || validateQuery(searchTerm)) {
        onSearchQueryChange(searchTerm);
      }
    }, [searchTerm, validateQuery, onSearchQueryChange]);

    return (
      <TextField
        sx={{
          "& .MuiOutlinedInput-root": {
            background: "#ffffff",
          },
        }}
        variant="outlined"
        placeholder={placeholder || "חיפוש"}
        fullWidth
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    );
  }
);
