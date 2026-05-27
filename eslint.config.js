import szumTechConfig from "@szum-tech/eslint-config";

export default [
  ...szumTechConfig,
  {
    // Zakaz importu z barrela `~/components` wewnątrz samych komponentów.
    // Barrel robi `export *` z całej biblioteki, więc taki import wciąga do entry
    // komponentu cały graf (Select, Combobox, sonner...) i blokuje tree-shaking
    // u konsumenta. Wewnątrz komponentu używaj importu względnego, a dla symboli
    // z innego komponentu — subpath `~/components/<nazwa>`.
    files: ["src/components/**/*.{ts,tsx}"],
    ignores: ["src/components/index.tsx", "src/components/**/*.stories.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: [
            {
              name: "~/components",
              message:
                "Nie importuj z barrela `~/components` wewnątrz src/components — użyj importu względnego lub subpath `~/components/<nazwa>`, aby zachować tree-shaking."
            },
            {
              name: "~/components/index",
              message:
                "Nie importuj z barrela `~/components` wewnątrz src/components — użyj importu względnego lub subpath `~/components/<nazwa>`, aby zachować tree-shaking."
            }
          ]
        }
      ]
    }
  }
];
