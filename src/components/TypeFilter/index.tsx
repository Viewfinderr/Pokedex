"use client"
import React, { useState, useEffect } from 'react';

interface TypeFilterProps {
  types: string[];
  onFilterChange: (type: string | null) => void;
}

const TypeFilter: React.FC<TypeFilterProps> = ({ types, onFilterChange }) => {
  return (
    <div>
      <label>Select Pokemon Type:</label>
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="">All</option>
        {types.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TypeFilter;
