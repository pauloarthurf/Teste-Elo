import { FormControl, FormLabel, Input as ChakraInput } from "@chakra-ui/react";

interface InputProps {
  name: string;
  label: string;
}

export function Input({ name, label }: InputProps) {
  return (
    <FormControl>
      <FormLabel>{label}*</FormLabel>
      <ChakraInput
        name={name}
        type={name}
        focusBorderColor="red.500"
        background="gray.900"
        variant="filled"
        _hover={{
          bg: "gray.900",
        }}
        size="lg"
      />
    </FormControl>
  );
}
