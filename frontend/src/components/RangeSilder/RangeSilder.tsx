import { Typography, useMediaQuery, useTheme } from "@mui/material";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useState } from "react";

interface RangeSliderProps {
  onChange: (event: Event, newValue: number[]) => void;
  min: number;
  max: number;
}

const RangeSlider: React.FC<RangeSliderProps> = ({ onChange, min, max }) => {
  const [value, setValue] = useState<number[]>([min, max]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleChange = (event: Event, newValue: number | number[]) => {
    setValue(newValue as number[]);
    onChange(event, newValue as number[]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        width: isMobile ? "90%" : "200px",
      }}
    >
      <Typography sx={{ mr: 2 }}>Sort By Year:</Typography>
      <Slider
        getAriaLabel={() => "Slider range"}
        value={value}
        min={min}
        max={max}
        onChange={handleChange}
        valueLabelDisplay="auto"
      />
    </Box>
  );
};

export default RangeSlider;
