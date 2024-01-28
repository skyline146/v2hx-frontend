import { TextInput, CloseButton } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState, useEffect } from "react";

interface ISearchInputProps {
  v?: string;
  onChange: (value: string) => void;
  w: string | number;
}

export const SearchInput = ({ v, onChange, w = 300 }: ISearchInputProps) => {
  const [value, setValue] = useState(v ?? "");
  const [debouncedSearch] = useDebouncedValue(value, 500);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch, onChange]);

  return (
    <TextInput
      w={w}
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value)}
      rightSection={<CloseButton onClick={() => setValue("")} />}
    />
  );
};
