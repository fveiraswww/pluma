/* eslint-disable react/function-component-definition */
import {useState, useEffect} from "react";
import Select, {MultiValue, ActionMeta, StylesConfig} from "react-select";
import {motion, AnimatePresence} from "framer-motion";
import {Check, X} from "lucide-react";

interface Option {
  id: number;
  label: string;
}

export interface MultiSelectProps {
  options: Option[];
  onChange: (selected: number[]) => void; // Cambiado a number[]
  value: number[]; // Cambiado a number[]
}

const MultiSelect: React.FC<MultiSelectProps> = ({options, onChange, value}: MultiSelectProps) => {
  const [selected, setSelected] = useState<number[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const handleChange = (newValue: MultiValue<Option>, actionMeta: ActionMeta<Option>) => {
    const updatedValue = newValue.map((option) => option.id); // Extraer IDs

    setSelected(updatedValue);
    onChange(updatedValue);
  };

  const handleRemove = (idToRemove: number) => {
    const updatedValue = selected.filter((id) => id !== idToRemove);

    setSelected(updatedValue);
    onChange(updatedValue);
  };

  const customStyles: StylesConfig<Option, true> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid hsl(var(--input))",
      borderRadius: "var(--radius)",
      "&:hover": {
        borderColor: "hsl(var(--input-hover))",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "hsl(var(--background))",
      border: "1px solid hsl(var(--border))",
      borderRadius: "var(--radius)",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "hsl(var(--primary))"
        : state.isFocused
          ? "hsl(var(--accent))"
          : "transparent",
      color: state.isSelected ? "hsl(var(--primary-foreground))" : "hsl(var(--foreground))",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "hsl(var(--foreground))",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "hsl(var(--foreground))",
      ":hover": {
        backgroundColor: "hsl(var(--destructive))",
        color: "hsl(var(--destructive-foreground))",
      },
    }),
  };

  const selectedOptions = options.filter((option) => selected.includes(option.id));

  // Asegurarse de que las opciones seleccionadas estén disponibles para react-select
  const mappedOptions = options.map((option) => ({
    ...option,
    value: option.id,
    label: option.label,
  }));

  const selectedMappedOptions = mappedOptions.filter((option) => selected.includes(option.id));

  return (
    <div className="space-y-2">
      <Select
        isMulti
        className="react-select-container"
        classNamePrefix="react-select"
        noOptionsMessage={() => "Sin opciones disponibles"} // Personalizar mensaje
        options={mappedOptions} // Usar las opciones mapeadas
        placeholder="Select categories..."
        styles={customStyles}
        value={selectedMappedOptions} // Vincular seleccionados con las opciones
        onChange={handleChange}
      />
      <AnimatePresence>
        {selected.length > 0 && (
          <motion.div
            animate={{opacity: 1, y: 0}}
            className="flex flex-wrap gap-2"
            exit={{opacity: 0, y: -10}}
            initial={{opacity: 0, y: -10}}
          >
            {selectedOptions.map((option) => (
              <motion.span
                key={option.id}
                layout
                animate={{opacity: 1, scale: 1}}
                className="inline-flex items-center rounded-full bg-primary px-2 py-1 text-sm text-primary-foreground"
                exit={{opacity: 0, scale: 0.8}}
                initial={{opacity: 0, scale: 0.8}}
              >
                <Check className="mr-1 h-4 w-4" />
                {option.label}
                <button
                  className="ml-1 rounded-full p-1 transition-colors"
                  type="button"
                  onClick={() => handleRemove(option.id)} // Usar ID en lugar de opción completa
                >
                  <X className="h-3 w-3" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MultiSelect;
