import React, { useState } from "react";
import { Grid, TextField, Card, CardContent, Typography, Button } from "@mui/material";

const LeanCanvas = () => {
  const [canvas, setCanvas] = useState({
    problem: "",
    customer: "",
    value: "",
    solution: "",
    channels: "",
    revenue: "",
    cost: "",
    metrics: "",
    advantage: "",
  });

  const handleChange = (field) => (event) => {
    setCanvas({ ...canvas, [field]: event.target.value });
  };

  const handleClear = () => {
    setCanvas({
      problem: "",
      customer: "",
      value: "",
      solution: "",
      channels: "",
      revenue: "",
      cost: "",
      metrics: "",
      advantage: "",
    });
  };

  return (
    <div>

      <div style={{ display: "flex", justifyContent: "space-between",  width: "600px"}}>
        <div>
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={canvas.problem}
            onChange={handleChange("problem")}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={canvas.solution}
            onChange={handleChange("solution")}
          />
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={canvas.metrics}
            onChange={handleChange("mertrics")}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={6}
            variant="outlined"
            value={canvas.value}
            onChange={handleChange("value")}
          />
        </div>
        <div>
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={canvas.advantage}
            onChange={handleChange("advantage")}
          />
          <TextField
            multiline
            rows={3}
            variant="outlined"
            value={canvas.channels}
            onChange={handleChange("channels")}
          />
        </div>
        <div>
          <TextField
            multiline
            variant="outlined"
            value={canvas.customer}
            onChange={handleChange("customer")}
          />
        </div>
      </div>
    </div>
  );
};

export default LeanCanvas;
