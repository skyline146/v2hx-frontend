import { TextInput, CloseButton } from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import { useState, useEffect } from "react";

interface ISearchInputProps {
  onChange: (value: string | undefined) => void;
  w: string | number;
}

export const SearchInput = ({ onChange, w = 300 }: ISearchInputProps) => {
  const [value, setValue] = useState<string | undefined>(undefined);
  const [debouncedSearch] = useDebouncedValue<string | undefined>(value, 500);

  useEffect(() => {
    onChange(debouncedSearch);
  }, [debouncedSearch, onChange]);

  return (
    <TextInput
      w={w}
      placeholder="Search"
      value={value}
      onChange={(e) => setValue(e.currentTarget.value === "" ? undefined : e.currentTarget.value)}
      rightSection={<CloseButton onClick={() => setValue(undefined)} />}
    />
  );
};
